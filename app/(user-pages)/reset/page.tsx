"use client";
import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Reset() {
  const [error, setError] = useState();
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.next);

/* 
  useEffect(() => {
    // Define a function to fetch OTP status
    const fetchOTPStatus = async () => {
      try {
        // Make a GET request to the /api/auth/otp endpoint
        const response = await axios.get("/api/auth/validate");
        // Check the status code
        if (response.status === 200) {
          // OTP validation successful, allow the user to reset the password
        } else {
          // OTP validation failed, redirect to a different page
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching OTP status:", error);
        
        router.push("/");
      }
    };


    fetchOTPStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/reset", {
        email: userInfo.email,
        password: formData.get("password"),
        cpassword: formData.get("cpassword"),
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
    <div className='a_page'>
      <div className='a_container'>
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
          <h1 className='text-[21px] font-bold pb-5' >Create a new password </h1>
          <div className='a_label'>
            We will ask for this password whenever you Sign-In.
          </div>
          <label className="text-slate-300">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="a_input"
            name="password"
          />
          <label className="text-slate-300">Re-enter password</label>
          <input
            type="password"
            placeholder="Password"
            className="a_input"
            name="cpassword"
          />
          <button className="btn btn-primary btn-outline w-full mt-5">
            Reset password
          </button>
        </form>
        <br />
        <h4>Secure password tips:</h4>
        <div className='a_label'>
          <ul>
            <li>Use at least 8 characters, a combination of numbers and letters is best.</li>
            <li>Do not use the same password you have used with us previously.</li>
            <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
            <li>Do not use the same password for multiple online accounts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reset;
