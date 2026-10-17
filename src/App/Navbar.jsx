
import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../customfetch';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const [data, setData] = useState();
    const customfetch = useCustomFetch();
    const navigate = useNavigate();
    useEffect(() => {
        async function checkAuth() {
            const res = await customfetch(
                'http://localhost:5000/api/authenticate',
                { method: 'POST' }
            );

            // console.log(res.Name);
            setData(res.Name);
        }

        checkAuth();
    }, []);

    const logout_clicked = async()=>{
        console.log('lOGOUT CLICKED')
        const res = await customfetch('http://localhost:5000/api/logout',{ method: 'POST' })
        navigate('/Login')
    }

    return (
        <nav className="h-16 w-full border-b border-slate-700 bg-slate-900 px-6">
            <div className="flex h-full items-center justify-between">

                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                        H
                    </div>

                    <span className="text-lg font-semibold text-slate-100">
                        Hobble
                    </span>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-5">

                    {/* Search */}
                    <div className="hidden md:block">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-64 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500"
                        />
                    </div>

                    {/* User */}
                    <div className="flex items-center gap-3">
                        {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-medium text-white">
                            {data?.charAt(0)?.toUpperCase() || '?'}
                        </div> */}

                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-slate-100">
                                {data || 'Loading...'}
                            </p>
                            {/* <p className="text-xs text-slate-400">
                                Author
                            </p> */}
                        </div>

                        <button
                            className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
                            onClick={logout_clicked}
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
