import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Preloader() {
  return (
    <div className="flex flex-col h-screen items-center bg-blue-300 justify-center gap-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <DotLottieReact
         src="https://lottie.host/725df53c-11cb-4f15-a502-830b070fa68e/RWOUzxhR87.lottie"
         loop
          autoplay
          className=' object-cover'
        />
      </div>
    </div>
  )
}

export default Preloader