from flask import Flask, request, jsonify
from app import extract_transcript_details, generate_gemini_content, prompt

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the YouTube Video Summarizer API! Use the /summarize endpoint to get video summaries."

@app.route("/summarize", methods=["POST"])
def summarize_video():
    try:
        data = request.get_json()
        if not data or "link" not in data:
            return jsonify({"error": "Missing 'link' in request body"}), 400
        
        link = data["link"].strip()
        transcript = extract_transcript_details(link)
        
        if not transcript:
            return jsonify({"error": "Transcript not available"}), 404
        summary = generate_gemini_content(transcript, prompt)
        
        if not summary:
            return jsonify({"error": "Could not generate summary"}), 500
        return jsonify({
            "video_link": link,
            "summary": summary
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
