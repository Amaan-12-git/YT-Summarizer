from dotenv import load_dotenv
load_dotenv()

import os
import re
from urllib.parse import urlparse, parse_qs
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi

genai.configure(api_key=os.getenv("GOOGLE_API"))

prompt = """
You are an expert transcript summarizer. If the TRANSCRIPT below is not English, translate it internally to English and then summarize from the translated text. DO NOT include or echo the translated transcript — output only the summary sections.

Output in Markdown only:

## ONE-LINE GIST
- one clear sentence

## KEY POINTS
- 10-25 concise numbered bullets (each 2 short sentences maximum), in the order they appear

## ACTIONABLE TAKEAWAYS
- up to 8-15 short, practical items (only if present)

## KEYWORDS
- 5-10 one-word tags, comma-separated

Strict rules:
• Only summarize what appears in the transcript. Do NOT invent or add facts.  
• Preserve all numbers, dates, names, and exact phrases.  
• Do not include timestamps unless they exist in the transcript.  
• Tone: neutral, factual.  
• Prefer clarity and brevity — avoid long paragraphs.

"""

lang = [
    "af","ak","sq","am","ar","hy","as","ay","az","bn","eu","be","bho","bs","bg","my",
    "ca","ceb","zh","zh-HK","zh-CN","zh-SG","zh-TW","zh-Hans","zh-Hant","hak-TW","nan-TW",
    "co","hr","cs","da","dv","nl", "en", "en-US","eo","et","ee","fil","fi","fr","gl","lg",
    "ka","de","el","gn","gu","ht","ha","haw","iw","hi","hmn","hu","is","ig","id","ga",
    "it","ja","jv","kn","kk","km","rw","ko","kri","ku","ky","lo","la","lv","ln","lt","lb",
    "mk","mg","ms","ml","mt","mi","mr","mn","ne","nso","no","ny","or","om","ps","fa","pl",
    "pt","pa","qu","ro","ru","sm","sa","gd","sr","sn","sd","si","sk","sl","so","st","es",
    "su","sw","sv","tg","ta","tt","te","th","ti","ts","tr","tk","uk","ur","ug","uz","vi",
    "cy","fy","xh","yi","yo","zu"
]

def get_video_id(youtube_url):
    # Case 1: Full YouTube link with watch?v=
    if "youtube.com/watch" in youtube_url:
        query = urlparse(youtube_url).query
        return parse_qs(query).get("v", [None])[0]
    
    # Case 2: youtu.be short link (with or without extra params)
    if "youtu.be" in youtube_url:
        path = urlparse(youtube_url).path
        return path.strip("/")
    
    # Case 3: shorts link
    if "youtube.com/shorts" in youtube_url:
        path = urlparse(youtube_url).path
        return path.split("/")[-1]
    
    # Case 4: Direct video ID (11 characters)
    if re.match(r"^[a-zA-Z0-9_-]{11}$", youtube_url):
        return youtube_url
    
    raise ValueError("Invalid YouTube link or ID")

def extract_transcript_details(youtube_video_url):
    try:
        video_id = get_video_id(youtube_video_url)
        print(video_id)
        transcript = YouTubeTranscriptApi().fetch(video_id, languages=lang)
        transcript_joined = " ".join(snippet.text for snippet in transcript)
        return transcript_joined
    except Exception as e:
        raise RuntimeError(f"Could not fetch transcript. Reason: {str(e)}")

def generate_gemini_content(transcript_text,prompt = prompt):
    try:
        model=genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
        response = model.generate_content(f"{prompt}\n\ntext = {transcript_text}")
        return response.text
    except Exception as e:
        raise RuntimeError(f"Could not summarize transcript. Reason: You exceeded your transcript text limit.")
    
if __name__ == "__main__" :
    link = input("Enter YouTube Video Link or ID: ").strip()

    transcript_fetch =  extract_transcript_details(link)
    if transcript_fetch:
        print(generate_gemini_content(transcript_fetch, prompt))
    else:
        print("No transcript available for this video.")
