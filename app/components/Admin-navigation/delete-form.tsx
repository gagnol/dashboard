'use client'

import { deleteProduct } from '@/lib/action'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

export default function DeleteForm({
  _id,
  name,
}: {
  _id: string
  name: string
}) {
  const { pending } = useFormStatus()
  return (
    <form
      action={async (formData) => {
        const res = await deleteProduct(formData)
        toast(res.message)
      }}
    >
      <input type="hidden" name="_id" value={_id} />
      <input type="hidden" name="name" value={name} />
      <button type="submit" disabled={pending} className="btn btn-error btn-outline">
        Delete
      </button>
    </form>
  )
}