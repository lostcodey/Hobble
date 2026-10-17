import React from 'react'
import { useNavigate } from 'react-router-dom'
import Register from './Register'
function Landing() {
    
    const navigate = useNavigate()
    const Loginclicked = () =>{
        navigate('/Login')

    }

    const Registerclicked = () =>{
        navigate('/Register')
    }
    
     return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

            <div className="w-full max-w-3xl text-center">

               
                <h1 className="text-5xl md:text-6xl font-bold text-slate-100 tracking-tight">
                    HOB<span className="text-indigo-500">BLE</span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                    A place for developers to share knowledge,
                    write articles, and learn from the community.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <button
                        onClick={Loginclicked}
                        className="
                            w-full sm:w-auto
                            px-7 py-3
                            bg-indigo-600
                            hover:bg-indigo-500
                            text-white
                            font-medium
                            rounded-lg
                            transition-colors
                            duration-200
                        "
                    >
                        Login
                    </button>

                    <button
                        onClick={Registerclicked}
                        className="
                            w-full sm:w-auto
                            px-7 py-3
                            bg-slate-800
                            hover:bg-slate-700
                            border border-slate-700
                            text-slate-200
                            font-medium
                            rounded-lg
                            transition-colors
                            duration-200
                        "
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Landing