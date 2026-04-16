import React from 'react'
import { GradientTextDemo } from './herotext/page'
import { TypingTextDemo } from './para/page'

const HeroSection = () => {
  return <>
  <section className="flex flex-col items-center bg-white px-4 py-14 text-black sm:px-6 sm:py-16 lg:px-8 lg:py-20 dark:bg-black dark:text-white">

    <div className="mb-6 w-full max-w-6xl">
   <GradientTextDemo neon={true} />
    </div>

    <p className="mb-8 max-w-2xl px-2 text-center text-gray-700 dark:text-gray-300">
    <TypingTextDemo delay={100} holdDelay={500} loop={true} cursor={true} />
    </p>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center gap-4">
      <a href="/Sanket Khule CV for India - Copy.pdf" className="rounded-full border border-gray-400 px-6 py-3 text-black transition-colors hover:bg-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">
        Download CV →
      </a>

      <a href="tel:+917887636352" className="rounded-full border border-gray-400 px-6 py-3 text-black transition-colors hover:bg-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">
        Contact Me
      </a>
    </div>

  </section>
  </>
}
export default HeroSection