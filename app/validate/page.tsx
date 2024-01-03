"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const tokenResponse = await axios.post("/api/auth/validate", {
        token: formData.get("token"),
      
      });
      console.log(tokenResponse);
      

      return router.push("/reset");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7">OTP</h1>

        <label className="text-slate-300">OTP</label>
        <input
          type="text"
          placeholder="OTP"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="token"
        />

        <button className="btn btn-primary btn-outline w-full mt-5">
       Continue
        </button>
      </form>
    </div>
  );
}

export default Signup;
