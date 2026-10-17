import { useNavigate } from "react-router-dom";

export function useCustomFetch() {
    const navigate = useNavigate();

    async function customfetch(url, contents = {}) {
        const res = await fetch(url, {
            ...contents,
            credentials: 'include',
            headers: {
                ...contents.headers,
            },
        });

        if (res.status === 401) {
            navigate('/Login');
            return;
        }

        const response = await res.json();
        return response;
    }

    return customfetch;
}