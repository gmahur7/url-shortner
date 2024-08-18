'use client'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full bg-slate-700 flex justify-between items-center px-10 md:px-20 py-5'>
        <div className=''>
            <h2 className='font-bold text-rose-400 text-lg md:text-xl'>URL SHORTER</h2>
        </div>
        <div className='flex gap-4 md:gap-12 text-white'>
            <Link href='/'>Home</Link>
            <Link href='/analytics'>Analytics</Link>
        </div>
    </div>
  )
}

export default NavBar