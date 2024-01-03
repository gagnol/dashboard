"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();
  const { userInfo } = useSelector((state:any) => state.next);
console.log(userInfo)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/reset", {
        email:userInfo.email,
        password: formData.get("password"),
        
      });
      

       return router.push("/signin");
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
        <h1 className="text-4xl font-bold mb-7">Signup</h1>
     

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button className="btn btn-primary btn-outline w-full mt-5">
          Reset password
        </button>
      </form>
    </div>
  );
}

export default Signup;
