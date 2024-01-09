'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createProduct } from '@/lib/action'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface StringArrayInputProps { }


export default function CreateForm() {
  const [state, formAction] = useFormState(createProduct, {
    message: '',
  })




  const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (state.message.indexOf('Created product') === 0) {
      ; (document.getElementById('my_modal_3') as any)!.close()
      ref.current?.reset()
      toast(state.message)
    } else if (state.message) {
      toast(state.message)
    }
  }, [state.message])

  return (
    <div>
      <button
        className="btn btn-primary btn-outline"
        onClick={() =>
          (document.getElementById('my_modal_3')! as any).showModal()
        }
      >
        Create Product
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h2 className="tex-2xl font-bold pm-4">Create Product</h2>
          <form ref={ref} action={formAction}>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="a_input"
                required
                autoComplete='false'
              />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="a_input"
                required
                autoComplete='false'
              />

              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="a_input"
                required
                autoComplete='false'
              />
              <label htmlFor="subcategory">Subcategory</label>
              <input
                type="text"
                id="subcategoty"
                name="subcategory"
                className="a_input"
                required
                autoComplete='false'
              />
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="a_input"
                required
                autoComplete='false'
              />
              <div className="flex ">
                <label htmlFor="discount" className='m-2'>Discount</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  className="a_input"
                  required
                />
                <label htmlFor="countInStock" className='m-2'>Stock</label>
                <input
                  type="number"
                  id="countInStock"
                  name="countInStock"
                  className="a_input"
                  required
                />
              </div>
              <div className="flex ">
                <label htmlFor="rating" className='m-2'>Rating&nbsp;</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  className="a_input"
                  required
                />
                <label htmlFor="slug" className='m-2'>Slug</label>
                <input
                  type="number"
                  id="slug"
                  name="slug"
                  className="a_input"
                  required
                />
              </div>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                className="a_input"
                required
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="a_input"
                required
                defaultValue="1"
              />
               <label htmlFor="video">Video</label>
              <input
                type="text"
                id="video"
                name="video"
                className="a_input"
               
              />
             
            </div>
            <button
              className="btn btn-primary btn-outline mr-3"
              type="submit"
              disabled={pending}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-primary btn-outline"
              onClick={() =>
                (document.getElementById('my_modal_3') as any).close()
              }
            >
              Back
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}