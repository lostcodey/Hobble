
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Blog_add from './Blog_add';
import All_blogs from './All_blogs';
import Draft_blogs from './Draft_blogs';
import Edit_blog from './Edit_blog';
import View_blog from './View_Blog';
import Posts from './Posts';
import Dashboard from './Dashboard';

function App() {
    const [current,current_change] = useState('Dashboard');
    const [edit,edit_change] = useState();
    const [view,view_change] = useState();
    return (
        <div className="flex h-screen flex-col overflow-scroll bg-slate-950">
            
            <Navbar />
            <div className="flex min-h-0 flex-1">
                
                <Sidebar current_change={current_change} />

                
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-slate-950">

                    {current === 'Dashboard' && <Dashboard current_change={current_change} />}
                    {current === 'Profile' && <Profile current_change={current_change} />}
                    {current === 'NewPost' && <Blog_add current_change={current_change}/>}
                    {current === 'AllPost' && <All_blogs current_change={current_change} view_change={view_change}/>}
                    {current === 'Drafts' && <Draft_blogs current_change={current_change} edit_change={edit_change} />}
                    {current === 'EditBlog' && <Edit_blog current_change={current_change} edit= {edit}/>}
                    {current === 'ViewBlog' && < View_blog current_change={current_change} view={view} />}
                    {current === 'Posts' && < Posts current_change={current_change} view_change={view_change} edit_change={edit_change}/>}
                </main>
            </div>

            {/* <Profile></Profile> */}
        </div>
    );
}

export default App;
