import React, { useState, useEffect } from 'react';
import { useCustomFetch } from '../customfetch';
import { useNavigate } from 'react-router-dom';
function Profile({current_change}) {
    const customfetch = useCustomFetch();
    

    const [profile, setProfile] = useState({
        username: '',
        age: '',
        profession: '',
        achievements: '',
        skills: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    useEffect(() => {
        async function checkAuth() {
            const res = await customfetch(
                'http://localhost:5000/api/profile_check',
                { method: 'POST' }
            );

            console.log(res)
            if (res) {
                if (res?.Userimg) {
                    setImagePreview(
                        `http://localhost:5000/${res.Userimg.replace(/\\/g, '/')}`
                    );
                }
                setProfile({
                    username: res.Username ?? '',
                    age: res.Age ?? '',
                    profession: res.Profession ?? '',
                    achievements: Array.isArray(res.Achievements)
                        ? res.Achievements.join('\n')
                        : res.Achievements ?? '',
                    skills: Array.isArray(res.Skills)
                        ? res.Skills.join(', ')
                        : res.Skills ?? ''
                })
            }

        }

        checkAuth();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        setProfileImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const body = new FormData();

            if (profileImage) {
                body.append('image', profileImage);
            }

            for (const key in profile) {
                body.append(key, profile[key]);
            }

            const res = await customfetch(
                'http://localhost:5000/api/profile',
                {
                    method: 'POST',
                    body
                }
            );

            if (res) {
                console.log('Profile saved:', res);
            }
            current_change('Dashboard')
        } catch (error) {
            console.error('Failed to save profile:', error);
        }

    };

    const inputStyle =
        "w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

    const labelStyle =
        "mb-2 block text-sm font-medium text-slate-300";

    return (
        <div className="min-h-full bg-slate-950 p-5 text-slate-100 sm:p-8">

            <div className="mx-auto max-w-4xl">

                {/* Page heading */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-indigo-400">
                        ACCOUNT SETTINGS
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Your Profile
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Manage your personal information and developer identity.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Profile header */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">

                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-indigo-400">
                                        {profile.username
                                            ? profile.username.charAt(0).toUpperCase()
                                            : '?'}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-slate-100">
                                    Profile Information
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                    Upload a photo to personalize your profile.
                                </p>

                                <label
                                    htmlFor="profileImage"
                                    className="mt-3 inline-flex cursor-pointer items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800"
                                >
                                    Choose Image
                                </label>

                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                {profileImage && (
                                    <p className="mt-2 text-xs text-slate-400">
                                        {profileImage.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Personal information */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">

                        <div className="mb-6">
                            <h2 className="text-base font-semibold">
                                Personal Details
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Basic information about you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label htmlFor="username" className={labelStyle}>
                                    Username
                                </label>

                                <input
                                    id="username"
                                    name="username"
                                    value={profile.username}
                                    onChange={handleChange}
                                    placeholder="e.g. codewitharyan"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="age" className={labelStyle}>
                                    Age
                                </label>

                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={profile.age}
                                    onChange={handleChange}
                                    placeholder="Your age"
                                    className={inputStyle}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="profession" className={labelStyle}>
                                    Profession
                                </label>

                                <input
                                    id="profession"
                                    name="profession"
                                    value={profile.profession}
                                    onChange={handleChange}
                                    placeholder="e.g. Full-stack Developer, Student"
                                    className={inputStyle}
                                />
                            </div>

                        </div>
                    </section>

                    {/* Achievements */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">

                        <div className="mb-5">
                            <h2 className="text-base font-semibold">
                                Achievements
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Highlight milestones, awards, and projects you're proud of.
                            </p>
                        </div>

                        <label htmlFor="achievements" className={labelStyle}>
                            Your Achievements
                        </label>

                        <textarea
                            id="achievements"
                            name="achievements"
                            value={profile.achievements}
                            onChange={handleChange}
                            rows={4}
                            placeholder={"e.g.\n• Built a full-stack application\n• Completed a machine learning project\n• Won a hackathon"}
                            className={`${inputStyle} resize-y`}
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            You can add multiple achievements, one per line.
                        </p>
                    </section>

                    {/* Skills */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">

                        <div className="mb-5">
                            <h2 className="text-base font-semibold">
                                Skills
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                List your technical skills and areas of expertise.
                            </p>
                        </div>

                        <label htmlFor="skills" className={labelStyle}>
                            Technical Skills
                        </label>

                        <textarea
                            id="skills"
                            name="skills"
                            value={profile.skills}
                            onChange={handleChange}
                            rows={3}
                            placeholder="React, Node.js, MongoDB, Python, Machine Learning"
                            className={`${inputStyle} resize-y`}
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Separate skills with commas.
                        </p>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() => setProfile({
                                username: '',
                                age: '',
                                profession: '',
                                achievements: '',
                                skills: ''
                            })}
                            className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"

                            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default Profile;
