"use client"
import React, { useState } from 'react'

const ColorPicker = ({product}:any) => {
    const [colorname, setColorname] = useState("");
    const [colorpiker, setColorpiker] = useState("")
  
    return (
    <>
      {product.colors?(
                  <>
                  <div className="flex text-center">
                    <h4 className="text-[14px] font-bold mr-5">Color</h4>
                    <h5 className="text-[14px] font-normal" >&nbsp;{colorname}</h5>
                  </div>
                  </> 
                  ):(
                 <></>
        )
                }
                <div className='flex'>
                  {product.colors?.map((item:any, i:number) => (
                    <div className="inline-flex justify-between border-transparent border-[3px]
                    hover:border-[#c45500] cursor-pointer'" key={i}>
                      <div className={colorpiker === item.color ? "colorPiked" : "colorBox"}
                        style={{ backgroundColor: item.color }}
                        onMouseEnter={() => setColorname(item.name)}
                        onClick={() => setColorpiker(item.color)}
                      >
                      </div>
                    </div>
                  ))}
                </div>
    </>
  )
}

export default ColorPicker
