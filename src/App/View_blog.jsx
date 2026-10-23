import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../customfetch';
import View from '../Editor/View';
function View_blog({ current_change, view }) {
    const customfetch = useCustomFetch();
    const [blog, blog_change] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function post_fetch() {
            if (!view) {
                current_change('AllPost');
                return;
            }

            setLoading(true);

            try {
                const res = await customfetch(
                    'http://localhost:5000/api/view_fetch',
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ id: view }),
                    }
                );

                if (!res) {
                    current_change('AllPost');
                    return;
                }

                blog_change(res);
                console.log(res);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
                current_change('AllPost');
            } finally {
                setLoading(false);
            }
        }

        post_fetch();
    }, []);

    if (loading) {
        return <div className="p-6 text-slate-400">Loading blog...</div>;
    }

    if (!blog) {
        return <div className="p-6 text-slate-400">Blog not found.</div>;
    }

    return (
        <div className="min-h-full bg-slate-950 px-6 py-8 text-slate-100">
            <button
                onClick={() => current_change('AllPost')}
                className="mb-6 text-sm text-indigo-400 hover:text-indigo-300"
            >
                ← Back to posts
            </button>

            <article className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold">
                    {blog.Titile}
                </h1>

                <View  content = {blog.Content}></View>
            </article>
        </div>
    );
}

export default View_blog;
