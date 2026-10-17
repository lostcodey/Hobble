
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Profile from './Profile';

function App() {
    const [current,current_change] = useState();
    return (
        <div className="flex h-screen flex-col overflow-scroll bg-slate-950">
            {/* Fixed-height top navbar: 64px */}
            <Navbar />

            {/* Remaining height */}
            <div className="flex min-h-0 flex-1">
                {/* Sidebar fills the available height */}
                <Sidebar current_change={current_change} />

                {/* Main content fills the remaining width */}
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-slate-950">
                    {current === 'Profile' && <Profile />}
                </main>
            </div>

            {/* <Profile></Profile> */}
        </div>
    );
}

export default App;
