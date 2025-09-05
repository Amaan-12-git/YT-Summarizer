import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();
  const [err, setErr] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
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
        const res = await fetch(
          `http://localhost:3000/auth/google?code=${authResult.code}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Google authentication failed");
        await res.json();
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
    onError: (err) => console.error("Google login failed:", err),
    flow: "auth-code",
  });

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[30px] w-[90%] max-w-md shadow-2xl">
        <h2 className="text-3xl font-semibold text-gray-200 mb-2 text-center">
          Welcome!
        </h2>
        <p className="text-gray-400 text-center mb-6">Create an account</p>
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
            className="bg-white/10 w-[90%] px-4 py-2 rounded-full text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-400 text-xs">{errors.email.message}</span>
          )}

          <input
            {...register("pass", {
              required: true,
              minLength: { value: 8, message: "At least 8 characters long" },
            })}
            type="password"
            placeholder="Create a password"
            className="bg-white/10 w-[90%] px-4 py-2 rounded-full text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pass && (
            <span className="text-red-400 text-xs">{errors.pass.message}</span>
          )}

          <button
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "bg-white/30 w-[90%] px-4 py-2 rounded-full font-bold text-gray-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 w-[90%] px-4 py-2 rounded-full font-bold text-white transition duration-300"
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
          className="w-full flex items-center gap-3 justify-center bg-white/10 border border-white/20 text-gray-200 rounded-full py-2 mb-3 hover:bg-white/20 transition"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
