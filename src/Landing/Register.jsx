import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate  =  useNavigate();
    const [Username_holder, Username_change] = useState('');
    const [Email_holder, Email_change] = useState('');
    const [Password_holder, Password_change] = useState('');
    const [Password_check_holder, Password_check_change] = useState('');

    const username_changed = (e) => {
        Username_change(e.target.value);
    }

    const Email_changed = (e) => {
        Email_change(e.target.value);
    }

    const Password_changed = (e) => {
        Password_change(e.target.value);
    }

    const Password_check_changed = (e) => {
        Password_check_change(e.target.value);
    }
    const loginclicked = () =>{
        navigate('/Login')
    }

    const form_submitted = async (e) => {
        e.preventDefault()

        if (Password_check_holder == Password_holder) {
            const body = JSON.stringify({
                'Username': Username_holder,
                'Email': Email_holder,
                "Password": Password_holder
            })
            const res = await fetch('http://localhost:5000/api/register', { // Added missing opening brace '{' for options
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: body
            });
            if (res.status == 200) {
                // alert("done");
                navigate('/Login')
            }
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
                        Create an account
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Join Hobble and start sharing your knowledge
                    </p>
                </div>


                {/* Username */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium text-slate-300"
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        minLength="3"
                        maxLength="50"
                        onChange={username_changed}
                        value={Username_holder}
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


                {/* Email */}
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
                        placeholder="Enter a valid password"
                        minLength="5"
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


                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-300"
                    >
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        minLength="5"
                        onChange={Password_check_changed}
                        value={Password_check_holder}
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



                <button
                    type="submit"
                    className="
                        w-full
                        mt-2
                        px-5 py-3
                        bg-indigo-600
                        hover:bg-indigo-500
                        text-white
                        font-medium
                        rounded-lg
                        transition-colors
                        duration-200
                    "
                >
                    Create Account
                </button>


                {/* Login Link */}
                <p className="text-center text-sm text-slate-400">
                    Already have an account?
                    <span className="ml-1 text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={loginclicked}>
                        Login
                    </span>
                </p>

            </form>

        </div>
    )
}

export default Register