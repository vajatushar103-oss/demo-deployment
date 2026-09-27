import {
    useEffect,
    useRef,
    useState
} from 'react';

import useVideoSource from '../../hooks/useVideoSource.js';


export default function SmartVideo({

    className = '',

    poster,

    autoPlay = true,

    muted = true,

    loop = true,

    playsInline = true,

    preload = 'metadata',

    ...videoProps

}) {

    const containerRef =
        useRef(null);


    const [
        shouldLoad,
        setShouldLoad
    ] = useState(false);


    const {
        source,
        loading,
        error
    } = useVideoSource({
        enabled: shouldLoad
    });


    /*
    |--------------------------------------------------------------------------
    | LAZY LOAD
    |--------------------------------------------------------------------------
    |
    | Don't even request the video metadata until
    | the component is close to the viewport.
    |
    */

    useEffect(() => {

        const element =
            containerRef.current;


        if (!element) {
            return undefined;
        }


        /*
         * Older browser fallback.
         */

        if (
            !(
                'IntersectionObserver'
                in window
            )
        ) {

            setShouldLoad(true);

            return undefined;
        }


        const observer =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setShouldLoad(
                            true
                        );

                        observer.disconnect();
                    }
                },

                {
                    /*
                     * Start loading slightly
                     * before the video becomes visible.
                     */
                    rootMargin:
                        '400px 0px'
                }

            );


        observer.observe(
            element
        );


        return () => {

            observer.disconnect();

        };

    }, []);


    return (

        <div
            ref={containerRef}
            className={`prime-video-shell ${className}`}
        >

            {source?.url ? (

                <video

                    /*
                     * Very important.
                     *
                     * The key is the GridFS ID.
                     *
                     * React won't unnecessarily recreate
                     * the video when the parent rerenders.
                     *
                     * If staff uploads a new video later,
                     * the ID changes and React correctly
                     * switches to the new video.
                     */
                    key={source.id}

                    className="prime-video"

                    src={source.url}

                    poster={poster}

                    autoPlay={autoPlay}

                    muted={muted}

                    loop={loop}

                    playsInline={playsInline}

                    preload={preload}

                    {...videoProps}

                />

            ) : (

                <div
                    className="prime-video-placeholder"
                    aria-hidden="true"
                >

                    {loading && (
                        <span
                            className="prime-video-loader"
                        />
                    )}

                </div>

            )}


            {error && (

                <div
                    className="prime-video-error"
                    role="status"
                >
                    Video unavailable
                </div>

            )}

        </div>
    );
}