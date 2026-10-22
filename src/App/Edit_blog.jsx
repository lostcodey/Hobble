import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../customfetch';
import Editor from '../Editor/Editor';

function Edit_blog({ current_change }) {
    const customfetch = useCustomFetch();

    const [blog, blog_change] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function post_fetch() {
            try {
                const item = localStorage.getItem('Draft');

                if (!item) {
                    current_change('Drafts');
                    return;
                }

                const res = await customfetch(
                    'http://localhost:5000/api/edit_fetch',
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ id: item }),
                    }
                );

                if (!res) {
                    current_change('Drafts');
                    return;
                }

                blog_change(res);
                setTitle(res.Titile ?? '');
                setContent(res.Content ?? null);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
                current_change('Drafts');
            }
        }

        post_fetch();
    }, []);

    async function handleSave(status) {
        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }

        const updatedContent = content ?? blog?.Content;

        if (!updatedContent) {
            alert('Please add some content to your post.');
            return;
        }

        const body = JSON.stringify({
            id: blog._id,
            title,
            content: updatedContent,
            status:status, // false = draft, true = published
        });

        const res = await customfetch('http://localhost:5000/api/edit_blogs', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: body,
        })

       
    }

    if (!blog) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
                    <p className="text-sm text-slate-400">Loading your post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">

                {/* Page header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <button
                            type="button"
                            onClick={() => current_change('Drafts')}
                            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-indigo-400"
                        >
                            <span aria-hidden="true">←</span>
                            Back to drafts
                        </button>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Edit your post
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            Refine your ideas and share them when you're ready.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-300">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        {blog.Status ? 'Published' : 'Draft'}
                    </div>
                </div>

                {/* Editor form */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/10">

                    {/* Title */}
                    <div className="border-b border-slate-800 p-5 sm:p-7">
                        <label
                            htmlFor="post-title"
                            className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                        >
                            Post title
                        </label>

                        <input
                            id="post-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Give your post a compelling title..."
                            className="w-full bg-transparent text-2xl font-semibold tracking-tight text-white outline-none placeholder:text-slate-600 sm:text-3xl"
                        />

                        <p className="mt-3 text-xs text-slate-500">
                            A clear title helps readers understand what your post is about.
                        </p>
                    </div>

                    {/* Writing area */}
                    <div className="p-3 sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-200">
                                Content
                            </h2>
                            <span className="text-xs text-slate-500">
                                Rich text editor
                            </span>
                        </div>

                        <Editor
                            init_content={blog.Content}
                            onChange={setContent}
                        />
                    </div>

                    {/* Footer actions */}
                    <div className="flex flex-col gap-4 border-t border-slate-800 bg-slate-950/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
                        <p className="text-xs text-slate-500">
                            Save your progress or publish when it's ready.
                        </p>

                        <div className="flex flex-col-reverse gap-3 sm:flex-row">
                            <button
                                type="button"
                                disabled={saving}
                                onClick={() => handleSave(false)}
                                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Save Draft
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() => handleSave(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>Publish Post</span>
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-slate-600">
                    Take your time. Good writing is worth the effort.
                </p>
            </div>
        </div>
    );
}

export default Edit_blog;
