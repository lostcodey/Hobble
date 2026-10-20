import React, { useEffect, useState } from 'react'
import { useCustomFetch } from '../customfetch';

function All_blogs() {
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
        
        <div>All_blogs</div>
    )
}

export default All_blogs