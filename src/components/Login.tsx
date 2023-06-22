import { Input } from "./ui/Input";
import logo from "../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { useToast } from "../hooks/Toast";
import { EFieldTypes } from "../store/type/field.type";

export const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    setEmail("");
    setIsLoading(false);
    if (error) {
      return showToast("Something failed!", error?.message);
    }
    showToast(
      "Magic link sent!",
      "Please check your mail for your magic link."
    );
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    document.title = "Sign in to FormEasy";
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <img src={logo} alt="logo" />
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email address to sign in.
          </p>
        </div>
        <form
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
          onSubmit={handleLogin}
        >
          <div>
            <label htmlFor="email" className="block text-xs text-gray-600">
              EMAIL ADDRESS
            </label>
            <Input
              type={EFieldTypes.EMAIL}
              placeholder="example@email.com"
              id="email"
              name="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <Button
            text="Send magic link"
            isLoading={isLoading}
            loadingText={isLoading ? "Sending..." : ""}
          />
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>{" "}
            for free.
          </p>
        </form>
      </div>
    </div>
  );
};
