import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../customfetch';

function Dashboard({ current_change }) {
    const customfetch = useCustomFetch();
    const [user, user_change] = useState(null);
    const [blogs, blogs_change] = useState([]);
    const [loading, loading_change] = useState(true);

    useEffect(() => {
        async function user_fetch() {
            try {
                const res = await customfetch(
                    'http://localhost:5000/api/user_fetch',
                    { method: 'POST' }
                );

                if (!res) return;

                user_change(res.user);
                blogs_change(
                    Array.isArray(res.exitance) ? res.exitance : []
                );
                
            } catch (error) {
                console.error('Failed to load dashboard:', error);
            } finally {
                loading_change(false);
            }
        }

        user_fetch();
    }, [customfetch]);

    const totalPosts = blogs.length;
    const publishedPosts = blogs.filter(post => post.Status).length;
    const draftPosts = blogs.filter(post => !post.Status).length;

    const recentPosts = [...blogs]
        .sort((a, b) =>
            new Date(b.updatedAt) - new Date(a.updatedAt)
        )
        .slice(0, 5);

    if (loading) {
        return (
            <div className="min-h-full bg-slate-950 p-8 text-slate-400">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-950 px-5 py-8 text-slate-100 sm:px-8 lg:px-10">

            {/* Header */}
            <header className="mb-8">
                <p className="mb-2 text-sm font-medium text-indigo-400">
                    YOUR WORKSPACE
                </p>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Welcome back, {user?.Username || 'Writer'}!
                </h1>

                <p className="mt-2 text-slate-400">
                    Here's what's happening with your content.
                </p>
            </header>

            {/* Profile card */}
            <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-indigo-500/40 bg-slate-800">
                        {user?.Userimg ? (
                            <img
                                src={`http://localhost:5000/${user.Userimg.replace(/\\/g, '/')}`}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-bold text-indigo-400">
                                {user?.Username?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-semibold">
                            {user?.Username || 'Your profile'}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            {user?.Profession || 'Add your profession'}
                        </p>

                        {user?.Email && (
                            <p className="mt-2 break-all text-sm text-slate-500">
                                {user.Email}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => current_change('Profile')}
                        className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium transition hover:border-indigo-500 hover:bg-indigo-500/10"
                    >
                        Edit profile
                    </button>
                </div>
            </section>

            {/* Statistics */}
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <StatCard
                    label="Total posts"
                    value={totalPosts}
                    description="All your posts"
                    symbol="▤"
                />

                <StatCard
                    label="Published"
                    value={publishedPosts}
                    description="Visible to readers"
                    symbol="↗"
                />

                <StatCard
                    label="Drafts"
                    value={draftPosts}
                    description="Still in progress"
                    symbol="✎"
                />

            </section>

            {/* Recent posts */}
            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-5 sm:px-6">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Recent posts
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Your latest content
                        </p>
                    </div>

                    <button
                        onClick={() => current_change('Posts')}
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium transition hover:bg-indigo-400"
                    >
                        View all posts
                    </button>
                </div>

                {recentPosts.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="text-slate-300">
                            No posts yet.
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            Create your first post to get started.
                        </p>
                        <button
                            onClick={() => current_change('NewPost')}
                            className="mt-5 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium hover:bg-indigo-400"
                        >
                            Create a post
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {recentPosts.map(post => (
                            <div
                                key={post._id}
                                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                            >
                                <div className="min-w-0">
                                    <h3 className="truncate font-medium text-slate-100">
                                        {post.Titile}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Updated{' '}
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            post.Status
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-amber-500/10 text-amber-400'
                                        }`}
                                    >
                                        {post.Status ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function StatCard({ label, value, description, symbol }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500/40">
            <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-400">
                    {label}
                </p>

                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-lg text-indigo-400">
                    {symbol}
                </span>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight">
                {value}
            </p>

            <p className="mt-1 text-xs text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default Dashboard;