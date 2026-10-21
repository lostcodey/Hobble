import React, { useEffect, useState } from 'react'
import { useCustomFetch } from '../customfetch';

function Draft_blogs() {
    const customfetch = useCustomFetch();
    const [drafts, drafts_change] = useState(null);

    useEffect(() => {
        async function post_fetch() {
            const res = await customfetch('http://localhost:5000/api/draft_blogs', {
                method: 'POST'
            });
            drafts_change(res);
            console.log(res.length);
            console.log(res);
        }
        post_fetch();
    }, []);

    return (
        <div className="min-h-full bg-slate-950 p-6 text-slate-100 md:p-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-amber-400">
                            <span>✎</span>
                            <span>Your workspace</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Drafts
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Pick up where you left off and finish your writing.
                        </p>
                    </div>

                    <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                        {drafts ? drafts.length : 0} saved drafts
                    </span>
                </div>

                {/* Loading */}
                {!drafts && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
                        <p className="text-sm text-slate-400">
                            Loading your drafts...
                        </p>
                    </div>
                )}

                {/* Empty state */}
                {drafts && drafts.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-3xl">
                            ✎
                        </div>
                        <h2 className="text-lg font-semibold text-white">
                            No drafts yet
                        </h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                            Posts you save without publishing will appear here.
                            You can return to them whenever you're ready.
                        </p>
                    </div>
                )}

                {/* Draft cards */}
                {drafts && drafts.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {drafts.map((post) => (
                            <article
                                key={post._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-200 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/10"
                            >
                                <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 opacity-70 transition group-hover:opacity-100" />

                                <div className="flex flex-1 flex-col p-5">
                                    {/* Status and date */}
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                                            ● Draft
                                        </span>

                                        <span className="text-xs text-slate-500">
                                            {post.updatedAt
                                                ? `Edited ${new Date(post.updatedAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}`
                                                : 'Not yet updated'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug text-white transition group-hover:text-amber-200">
                                        {post.Titile || 'Untitled draft'}
                                    </h2>

                                    <p className="mb-6 flex-1 text-sm leading-6 text-slate-400">
                                        Your writing is saved. Continue editing when you're ready to publish.
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                                        <span className="text-xs text-slate-500">
                                            Created {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short'
                                                })
                                                : 'Recently'}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => console.log('Edit draft:', post)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500 hover:text-slate-950"
                                        >
                                            Continue writing
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

export default Draft_blogs