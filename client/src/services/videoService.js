const API_BASE_URL =
    import.meta.env.VITE_API_URL || '';


async function getCurrentHomeVideo() {

    const response =
        await fetch(
            `${API_BASE_URL}/api/videos/home`,
            {
                /*
                 * Use normal browser HTTP caching.
                 *
                 * The server allows this metadata response
                 * to stay cached for 60 seconds.
                 */
                cache: 'default'
            }
        );


    const data =
        await response
            .json()
            .catch(() => ({}));


    if (!response.ok) {

        throw new Error(
            data.message ||
            'Unable to load video information.'
        );
    }


    return {

        ...data,

        /*
         * Important:
         *
         * The actual video URL contains
         * the immutable GridFS ID.
         */
        url:
            `${API_BASE_URL}/api/videos/stream/${data.id}`
    };
}


export const videoService = {

    getCurrentHomeVideo

};