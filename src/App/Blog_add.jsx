import React, { useState } from 'react';
import Editor from '../Editor/Editor';
import { useCustomFetch } from '../customfetch';

function Blog_add({current_change}) {
  const customfetch = useCustomFetch();
  const [title, setTitle] = useState('');
  const [content, content_change] = useState(null);


  const handle_post = async (status) => {
    const res = await customfetch('http://localhost:5000/api/blog_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        status: status,
      }),
    });
  }

  return (
    <div className="min-h-full bg-slate-950 px-5 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wider text-indigo-400">
            CONTENT WORKSPACE
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Create a Post
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Share your ideas, tutorials, and experiences with the community.
          </p>
        </div>


        <div className="space-y-6">


          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <label
              htmlFor="post-title"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              Post Title
            </label>

            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a compelling title..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-lg text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </section>


          <section>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                Post Content
              </label>

              <span className="text-xs text-slate-500">
                Rich text editor
              </span>
            </div>

            <Editor onChange={content_change} />
          </section>


          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => {
                setTitle('');
                content_change(null);
              }}
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              Clear Form
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => { handle_post(0) }}
                className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-slate-900"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={() => { handle_post(1) }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Publish Post
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Blog_add;