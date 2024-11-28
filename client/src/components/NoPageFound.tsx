import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const NoPageFound = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4 overflow-y-scroll md:p-0">
            <div className="pb-6 pt-2 text-center">
                <Logo />
                <p className='text-2xl mt-12'>404 Page Found</p>
                <p className='text-xl mt-4'>Kindly <Link className="text-sky-blue underline font-bold pl-2" to="/">
                login
                </Link> to check you tasks</p>
            </div>
        </div>
    )
}

export default NoPageFound
