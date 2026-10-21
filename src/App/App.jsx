
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Blog_add from './Blog_add';
import All_blogs from './All_blogs';
import Draft_blogs from './Draft_blogs';

function App() {
    const [current,current_change] = useState();
    return (
        <div className="flex h-screen flex-col overflow-scroll bg-slate-950">
            
            <Navbar />
            <div className="flex min-h-0 flex-1">
                
                <Sidebar current_change={current_change} />

                
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-slate-950">
                    {current === 'Profile' && <Profile />}
                    {current === 'NewPost' && <Blog_add/>}
                    {current === 'AllPost' && <All_blogs/>}
                    {current === 'Drafts' && <Draft_blogs/>}
                </main>
            </div>

            {/* <Profile></Profile> */}
        </div>
    );
}

export default App;
