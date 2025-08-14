"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

// Step 1: Set up state for the 4-digit code and timer
export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", ""]); // 4 digits
  const [timer, setTimer] = useState(180); // 30 seconds countdown
  const router = useRouter();
  const [error, setError] = useState("");
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "string";

  // Step 2: Handle timer countdown
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Step 3: Handle input change and auto-focus
  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow digits
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    if (value && idx < 3) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Step 4: Handle resend code
  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setCode(["", "", "", ""]);
    // TODO: Call backend to resend code
    alert("Verification code resent!");
  };

  // Step 5: Handle code submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) {
      setError("Please enter the 4-digit code.");
      return;
    }
    try {
      interface VerifyEmailResponse {
        success?: boolean;
        verified?: boolean;
        message?: string;
      }

      const res = await axios.post<VerifyEmailResponse>(
        "https://akil-backend.onrender.com/verify-email",
        {
          email,
          OTP: enteredCode,
        }
      );
      console.log("back end response :", res);
      console.log("Verification response:", res);
      if (res.status === 200 && (res.data?.success || res.data?.verified)) {
        router.push("/");
      } else {
        setError(res.data?.message || "Verification failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    }

    // TODO: Call backend to verify code
    // alert(`Code submitted: ${enteredCode}`);
  };

  // Step 6: Render the UI
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-lg shadow text-center"
      >
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
          Verify Email
        </h1>
        <p className="mb-8 text-gray-600">
          We've sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-center gap-4 mb-4">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-14 h-14 text-2xl text-center border-2 border-indigo-100 rounded-lg focus:border-indigo-400 focus:outline-none"
            />
          ))}
        </div>
        <div className="mb-6 text-sm text-gray-500">
          You can request to
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-indigo-700 font-semibold ml-1"
            >
              Resend code
            </button>
          ) : (
            <span className="ml-1">
              Resend code in{" "}
              <span className="font-bold">
                0:{timer.toString().padStart(2, "0")}
              </span>
            </span>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-900 text-white h-11 w-full rounded-full disabled:bg-indigo-300"
          disabled={code.some((digit) => digit === "")}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
