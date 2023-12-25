"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';

export default function Signin() {
    const { data: session } = useSession();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const router = useRouter();
   
      
    useEffect(() => {
        if (session?.user) {
            router.push('/');
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitHandler = async ({ email, password }:any) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
              });
              if (result && result.error) {
                toast.error(result.error);
              }
                const { data } = await axios.post('/api/auth/signin', {
                email,
                password,
            });
         
            router.push( '/');

        } catch (err:any) {
            toast.error(
                err,
                {
                    duration: 4000,
                    position: "top-center",
                }
            );
        }
    };

    return (
        <div className='a_page'>
           <div className='a_container'>
                <h1 className='text-[21px] font-bold pb-5'>Sign in</h1>
                <form onSubmit={handleSubmit(submitHandler)} >
                    <h5>Email</h5>
                    <input
                        className='a_input'
                        id="email"
                        type="text"
                        {...register("email", 
                        { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === 'required' && <p className='a_error'> Email is required</p>}
                    {errors.email?.type === 'pattern' && <p className='a_error'> Invalid email format</p>}

                    <h5>Password</h5>
                    <input
                        className='a_input'
                        id="password"
                        type="password"
                        {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === 'required' && <p className='a_error'> Password is required.</p>}
                    {errors.password?.type === 'minLength' && <p className='a_error'> Passwords must be at least 6 characters.</p>}
                    {errors.password?.type === 'maxLength' && <p className='a_error'> Passwords must be up to 20 characters.</p>}

                    <br /><br />
                    <button className='a_signBtn' type='submit' >Continue</button>
                </form>

                <div className='a_label'>By continuing, you agree to Amazon&apos;s
                    <a className='text-[#0066c0]'> Conditions of Use </a>
                    and<a className='text-[#0066c0]'> Privacy Notice</a>
                </div>
                <br />
                <div className='a_flabel'>
                    <Link href="/forgot" >
                        <p className='text-[#0066c0] font-semibold mb-2 hover:text-[#c45500] cursor-pointer' >
                        Forgot your password?
                        </p>
                    </Link>
                </div>
                <div className='a_divider'>__________ New to Amazon? __________</div>   
                <Link href="/register" >
                <button className='a_regbtn'>Create your Amazon account </button>
                </Link>
            </div>

        </div>
    )
}
