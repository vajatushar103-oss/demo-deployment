import {
    useEffect,
    useState
} from 'react';

import {
    videoService
} from '../services/videoService.js';


export default function useVideoSource({
    enabled = true
} = {}) {

    const [
        source,
        setSource
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(enabled);


    const [
        error,
        setError
    ] = useState(null);


    useEffect(() => {

        if (!enabled) {

            setLoading(false);

            return undefined;
        }


        let cancelled = false;


        setLoading(true);

        setError(null);


        videoService
            .getCurrentHomeVideo()

            .then((video) => {

                if (cancelled) {
                    return;
                }

                setSource(video);

            })

            .catch((requestError) => {

                if (cancelled) {
                    return;
                }

                console.error(
                    '[Video] Could not load video metadata:',
                    requestError
                );

                setError(
                    requestError
                );

            })

            .finally(() => {

                if (!cancelled) {
                    setLoading(false);
                }

            });


        return () => {

            cancelled = true;

        };

    }, [enabled]);


    return {
        source,
        loading,
        error
    };
}