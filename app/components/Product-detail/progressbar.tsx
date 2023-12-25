"use client"
import { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

const ProgressBar = ({ value, item }: any) => {
  const progressTextRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo dispara una vez
  });

  useEffect(() => {
    let animationInstance: any;
    if (inView) {
      animationInstance = animate(parseInt(progressTextRef.current?.textContent || '0'), value, {
        duration: 2,
        onUpdate: (cv) => {
          if (progressTextRef.current) {
            progressTextRef.current.textContent = cv.toFixed(0);
          }
        },
      });
    }
  }, [value, inView]);

  return (
    <div ref={ref} className="flex flex-row items-center my-5">
      <h1 className='font-bold px-2'>{item[0]} star&nbsp;</h1>
      <div className="w-[300px] h-[25px] flex flex-row justify-start items-stretch 
            bg-light-grey overflow-hidden">
        <motion.div
        ref={ref}
          className="w-0 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b]"
          animate={{
            width:inView? `${value}%`:0,
          }}
          transition={{
            duration: 3
          }}
        />
      </div>
      <div className="flex flex-row w-[30px] ml-3 font-bold text-white">
        <p ref={progressTextRef}>0</p>
        <p>%</p>
      </div>
    </div>
  );
}

export default ProgressBar;