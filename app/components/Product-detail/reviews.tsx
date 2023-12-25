import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import Rating from '../rating';

function Reviews({ item }:any) {

  return (
    <div key={item._id} className=" w-[70%] mx-5 my-3">
    <ul key={item._id}>
      <li className='flex'>
       {item.avatar?
        <>
         <Image src={item.avatar} alt="" width={100} height={100} 
          className="w-11 h-11 rounded-full object-cover"/> 
        </>
       :
       <>
       <FaUserCircle fontSize={25} color='#666' />
       </>
       }
        
        <h4 className='my-1'>&nbsp;{item.name}</h4>
      </li>
      <li className='flex'>
        <Rating value={item.rating} />
        <h4><b>&nbsp; {item.subject}</b></h4>
      </li>
      <li >
        <h4 className="text-primary" >Reviewed in the United States on
          &nbsp;
          {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )};
        </h4>
      </li>
      <li>
        {item.comment}
      </li>
    </ul>
  </div>
  )
}

export default Reviews
