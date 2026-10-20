
import React from 'react';

function Sidebar({current_change}) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-700 bg-slate-900 p-5 text-slate-300">

      {/* Brand */}


      {/* Main navigation */}
      <div className="space-y-2">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        <button className="flex w-full items-center gap-3 rounded-lg bg-indigo-600/15 px-3 py-2.5 text-left text-sm font-medium text-indigo-400 transition hover:bg-indigo-600/20" onClick={()=>{current_change('Dashboard')}}>
          <span>▦</span>
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-slate-800 hover:text-white" onClick={()=>{current_change('Posts')}}>
          <span>▤</span>
          Posts
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-slate-800 hover:text-white" onClick={()=>{current_change('Drafts')}}>
          <span>◷</span>
          Drafts
        </button>
      </div>

      {/* Content management */}
      <div className="mt-8 space-y-2">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500" onClick={()=>{current_change('Content')}}>
          Content
        </p>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-slate-800 hover:text-white" onClick={()=>{current_change('AllPost')}} >
          <span>▣</span>
          All Posts
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="mt-auto shrink-0 space-y-2 border-t border-slate-800 pt-5">
        <button className="flex w-full items-center gap-3 rounded-lg bg-indigo-600 px-3 py-2.5 text-left text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500" onClick={()=>{current_change('NewPost')}}>
          <span>＋</span>
          New Post
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-slate-800 hover:text-white" onClick={()=>{current_change('Profile')}}>
          <span>⚙</span>
          Profile
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
