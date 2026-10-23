import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../customfetch';

function Posts({ current_change, view_change, edit_change }) {
  const customfetch = useCustomFetch();

  const [posts, posts_change] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function post_fetch() {
      try {
        const res = await customfetch(
          'http://localhost:5000/api/all_posts',
          { method: 'POST' }
        );

        if (!res) return;

        if (!Array.isArray(res)) {
          throw new Error('Unexpected response from server');
        }

        posts_change(res);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Unable to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    post_fetch();
  }, []);


  const read_post = async (id) => {
    console.log(id)
    view_change(id);
    current_change('ViewBlog');
  }


  const edit_post = async (id) => {
    edit_change(id)
    current_change('EditBlog');
  }

  return (
    <div className="min-h-full bg-slate-950 px-5 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">


        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <button
            type="button"
            onClick={() => current_change('NewPost')}
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-indigo-400"
          >
            <span aria-hidden="true">←</span>
            Create a Blog
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="mb-4 h-4 w-24 rounded bg-slate-800" />
                <div className="mb-3 h-6 w-3/4 rounded bg-slate-800" />
                <div className="mb-2 h-3 w-full rounded bg-slate-800" />
                <div className="h-3 w-2/3 rounded bg-slate-800" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="text-red-300">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400">
              ✎
            </div>

            <h2 className="text-xl font-semibold">
              Nothing published yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Published posts will appear here.
            </p>

            <button
              type="button"
              onClick={() => current_change('NewPost')}
              className="mt-6 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Create your first post
            </button>
          </div>
        )}

        {/* Posts grid */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Latest posts
              </h2>

              <span className="text-sm text-slate-500">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group flex min-h-64 flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-900"
                >


                  {/* Title */}
                  <h3 className="text-xl font-semibold leading-snug text-slate-100 transition group-hover:text-indigo-300">
                    {post.Titile || 'Untitled post'}
                  </h3>

                  {/* Content preview */}
                  <p className="mt-3 line-clamp-3 flex-1 break-words text-sm leading-6 text-slate-400">
                    Open this post to read the full article.
                  </p>

                  {/* Action */}
                  <div className='flex flex-row gap-4'>
                    <button
                      type="button"
                      onClick={() => { read_post(post._id) }}
                      className="mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
                    >
                      Read article
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { edit_post(post._id) }}
                      className="mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
                    >
                      Edit article
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>

                  </div>

                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Posts;
