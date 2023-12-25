'use client'

import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

function Questions(
  { questionProducts, submitQuestion, likesHandler }:any) {

    const [title, setTitle] = useState('');
    // VOTES
  const [liked, setLiked] = useState("")

  return (

    <div className='max-w-screen-2xl pb-2 ml-10'>
      <div className='flex flex-wrap justify-start'>
        <div className=''>
          <h2 className="text-[21px] pl-4 font-semibold pt-1">
            Customer questions & answers
          </h2>
           {questionProducts?.map((item:any) => (
            <ul key={item._id}>
              <li key={item.title}>
                <div className='flex flex-wrap justify-start my-5 mx-2 p-2' >
                  <div className=' w-[90px] border-r-2 border-gray-400'>
                   
                      <div className='px-8'>
                        <i onMouseEnter={() => setLiked(item._id)} onClick={likesHandler}>
                          <FaCaretUp className='text-[25px] text-[#777] hover:text-[#c45500] 
                          cursor-pointer'/>
                        </i>
                      </div>
                   
                    <div className='text-center'>
                      <span > {item.likes.length} </span>
                      <br />
                      <span>votes</span>
                    </div>
                    <div className='px-8'>
                      <i>
                        <FaCaretDown className='text-[25px] text-[#777] 
                        hover:text-[#c45500] cursor-pointer' />
                      </i>
                    </div>
                  </div>
                  <div className='block justify-start w-[50%] mx-5' >
                    <div>
                      <span className="font-bold">Question:</span>
                      <span className='text-primary '>&nbsp;{item.title}</span>
                    </div>
                    <br/>
                    <div >
                      <span className="font-bold">Answer:</span>
                      <span> &nbsp; &nbsp;
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          )).slice(0, 7)
          }
          <form className='mx-5'>
                <input
                className="border rounded p-2"
                  type='text'
                  name="questions"
                  placeholder='Don&apos;t see the answer you are looking for?'
                 />
                <button className='btn btn-outline btn-primary cursor-pointer m-2'
                  type='submit' >
                Post your Question 
                </button>
          
          </form>
        </div>
      </div>
    </div>

  )
}

export default Questions
