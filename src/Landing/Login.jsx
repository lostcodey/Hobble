import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [Email_holder,Email_change] = useState('');
    const [Password_holder,Password_change] = useState('');

    const Email_changed =(e)=>{
        Email_change(e.target.value);
    }

    const Password_changed =(e) =>{
        Password_change(e.target.value);
    }

    const registerclicked = (e) =>{
        navigate('/Register');
    }

    const form_submitted = async(e)=>{
        e.preventDefault()
        
        const body = JSON.stringify({
            'Email':Email_holder,
            'Password':Password_holder
        })

        const res = await fetch('http://localhost:5000/api/login',{
            method:'POST',
            credentials: "include",
            headers:{
                'content-type':'application/json'
            },
            body:body
        })
        
        
        if (res.status == 200) {
            console.log('Hello')
            navigate('/Blog')

        }
    }
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <form
                action=""
                onSubmit={form_submitted}
                className="
                    flex flex-col
                    w-full max-w-md
                    gap-5
                    p-8
                    bg-slate-900
                    border border-slate-800
                    rounded-xl
                    shadow-xl
                "
            >

                
                <div className="mb-3">
                    <h1 className="text-3xl font-bold text-slate-100">
                        Happy to see you back!
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Login to your Hobble account
                    </p>
                </div>


                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-300"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        minLength="3"
                        maxLength="50"
                        onChange={Email_changed}
                        value={Email_holder}
                        required
                        className="
                            w-full
                            px-4 py-3
                            bg-slate-800
                            border border-slate-700
                            rounded-lg
                            text-slate-100
                            placeholder:text-slate-500
                            outline-none
                            focus:border-indigo-500
                            focus:ring-2
                            focus:ring-indigo-500/20
                        "
                    />
                </div>


            
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-300"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={Password_changed}
                        value={Password_holder}
                        required
                        className="
                            w-full
                            px-4 py-3
                            bg-slate-800
                            border border-slate-700
                            rounded-lg
                            text-slate-100
                            placeholder:text-slate-500
                            outline-none
                            focus:border-indigo-500
                            focus:ring-2
                            focus:ring-indigo-500/20
                        "
                    />
                </div>



                <div className="flex items-center justify-between mt-2">

                    <button
                        type="submit"
                        className="
                            px-5 py-2.5
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
                        type="button"
                        onClick={registerclicked}
                        className="
                            text-sm
                            text-slate-400
                            hover:text-indigo-400
                            transition-colors
                            duration-200
                        "
                    >
                        Forgot Password?
                    </button>

                </div>

            </form>

        </div>
    )
}

export default Login