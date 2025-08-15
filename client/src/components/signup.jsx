import React from "react";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();
  const [err, setErr] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/signup/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to signup");
      setErr(false);
      const result = await res.json();
      console.log("Signup successful:", result);

      navigate("/dashboard");
    } catch (error) {
      setErr(true);
      console.error("Error:", error);
    } finally {
      reset();
      setLoading(false);
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult && authResult.code) {
        const code = authResult.code;

        const res = await fetch(
          `http://localhost:3000/auth/google?code=${code}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Google authentication failed");
        const result = await res.json();
        navigate("/dashboard");
      } else {
        console.error("No auth code received:", authResult);
      }
    } catch (err) {
      console.error("Google auth error:", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (err) => {
      console.error("Google login failed:", err);
    },
    flow: "auth-code",
  });

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 md:p-8 sm:p-4 p-2 rounded-[30px] w-[90%] max-w-md shadow-2xl">
        <h2 className="text-3xl font-semibold text-white mb-2 text-center">
          Welcome!
        </h2>
        <p className="text-gray-300 text-center mb-6">Create an account</p>
        {err && (
          <p className="text-red-400 text-center text-xs">
            Account already exists
          </p>
        )}
        <form
          className="flex flex-col items-center justify-center gap-y-5 px-4 py-2 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", {
              required: { value: true, message: "This field is required!" },
            })}
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 w-[90%] px-4 py-2 rounded-full text-white placeholder-gray-400 outline-none"
          />
          {errors.email && (
            <span className="text-red-400 text-xs">{errors.email.message}</span>
          )}
          <input
            {...register("pass", {
              required: true,
              minLength: { value: 8, message: "Atleast 8 characters long" },
            })}
            type="password"
            placeholder="Create a password"
            className="bg-white/10 w-[90%] px-4 py-2 rounded-full text-white placeholder-gray-400 outline-none"
          />
          {errors.pass && (
            <span className="text-red-400 text-xs">{errors.pass.message}</span>
          )}
          <button
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "bg-white/50 w-[90%] px-4 py-2 rounded-full font-bold text-gray-900 placeholder-gray-400 outline-none"
                : "bg-white/90 w-[90%] px-4 py-2 rounded-full font-bold text-gray-900 placeholder-gray-400 outline-none"
            }
          >
            {isSubmitting ? "Loading..." : "Sign up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <button
          onClick={googleLogin}
          className="w-full flex items-center gap-3 justify-center bg-white/10 border border-white/20 text-white rounded-full py-2 mb-3 hover:bg-white/20 transition"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
