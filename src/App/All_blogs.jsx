import React, { useEffect, useState } from 'react'
import { useCustomFetch } from '../customfetch';

function All_blogs({current_change}) {
    const customfetch = useCustomFetch();
    const [posts, post_change] = useState(null);

    useEffect(() => {
        async function post_fetch() {
            const res = await customfetch('http://localhost:5000/api/all_blogs', {
                method: 'POST'
            })
            post_change(res)
            console.log(res.length)
            console.log(res)
        }
        post_fetch();
    }, []);

    return (
        <div className="min-h-full bg-slate-950 p-6 text-slate-100 md:p-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            All Posts
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Explore and manage your published content.
                        </p>
                    </div>

                    <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                        {posts ? posts.length : 0} published posts
                    </span>
                </div>

                {/* Loading state */}
                {!posts && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
                        <p className="text-sm text-slate-400">
                            Loading posts...
                        </p>
                    </div>
                )}

                {/* Empty state */}
                {posts && posts.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
                            <span className="text-2xl">📝</span>
                        </div>
                        <h2 className="text-lg font-semibold">
                            No published posts yet
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Your published posts will appear here.
                        </p>
                    </div>
                )}

                {/* Posts grid */}
                {posts && posts.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-200 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-950/20"
                            >
                                {/* Card top accent */}
                                <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 opacity-70 transition group-hover:opacity-100" />

                                <div className="flex flex-1 flex-col p-5">
                                    {/* Author */}
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800">
                                            {post.Auther?.Userimg ? (
                                                <img
                                                    src={`http://localhost:5000/${post.Auther.Userimg.replace(/\\/g, '/')}`}
                                                    alt={post.Auther.Username || 'Author'}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="font-semibold text-indigo-300">
                                                    {(post.Auther?.Username || 'U').charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-200">
                                                {post.Auther?.Username || 'Unknown author'}
                                            </p>
                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {post.createdAt
                                                    ? new Date(post.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                                    : 'Recently published'}
                                            </p>
                                        </div>

                                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                            Published
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug text-white transition group-hover:text-indigo-300">
                                        {post.Titile || 'Untitled post'}
                                    </h2>

                                    {/* Content placeholder */}
                                    <p className="mb-6 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
                                        Open this post to read the full article and its rich-text formatting.
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                                        <span className="text-xs text-slate-500">
                                            Updated {post.updatedAt
                                                ? new Date(post.updatedAt).toLocaleDateString('en-IN')
                                                : 'recently'}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => console.log('Selected post:', post)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/10 px-3 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-600 hover:text-white"
                                        >
                                            View post
                                            <span aria-hidden="true">→</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default All_blogs