'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createUser } from '@/lib/user-action'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export default function CreateForm() {
  const [state, formAction] = useFormState(createUser, {
    message: '',
  })
  const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (state.message.indexOf('User created successfully') === 0) {

      ref.current?.reset()
      toast(state.message)
    } else if (state.message) {
      toast(state.message)
    }
  }, [state.message])

  return (
    <div className='a_page'>
      <div className='a_container'>
        <h1 className='text-[21px] font-bold pb-5'>Create account</h1>
        <form ref={ref} action={formAction}>
          <h5>Your name</h5>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full max-w-xs"
            required
            autoComplete='false'
          />
          <h5>Email</h5>
          <input
            type="text"
            id="email"
            name="email"
            className="input input-bordered w-full max-w-xs"
            required
            autoComplete='false'
          />

          <h5>Password</h5>
          <input
            type="password"
            id="password"
            name="password"
            className="input input-bordered w-full max-w-xs"
            required
            autoComplete='false'
          />
          <h5>Re-enter password</h5>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            className="input input-bordered w-full max-w-xs"
            required
            autoComplete='false'
          />
          <button
            className="btn btn-primary mr-3"
            type="submit"
            disabled={pending}
          >
            Register
          </button>

        </form>
      </div>

    </div>
  )
}