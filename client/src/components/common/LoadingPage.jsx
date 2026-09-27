import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, LoaderCircle } from 'lucide-react';

const MINIMUM_DISPLAY_TIME = 2250;
const FADE_OUT_TIME = 750;

export default function LoadingPage({ loading, onFinished }) {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    const mountedAt = useRef(Date.now());
    const finishTimer = useRef(null);
    const exitTimer = useRef(null);

    /*
     * Fade IN after component mounts.
     */
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []); 

    /*
     * When authentication finishes:
     *
     * 1. Check how long loading page has already been visible.
     * 2. If less than 1 second, wait for the remaining time.
     * 3. Start fade-out.
     * 4. After fade-out completes, tell Protected component
     *    that the loading screen can be removed.
     */
    useEffect(() => {
        if (loading) {
            return;
        }

        const elapsed = Date.now() - mountedAt.current;

        const remainingTime = Math.max(
            0,
            MINIMUM_DISPLAY_TIME - elapsed
        );

        finishTimer.current = setTimeout(() => {
            setExiting(true);

            exitTimer.current = setTimeout(() => {
                onFinished?.();
            }, FADE_OUT_TIME);
        }, remainingTime);

        return () => {
            clearTimeout(finishTimer.current);
            clearTimeout(exitTimer.current);
        };
    }, [loading, onFinished]);

    return (
        <main
            className={`
                loading-page
                ${visible ? 'loading-page-visible' : ''}
                ${exiting ? 'loading-page-exiting' : ''}
            `}
        >
            {/* Background grid */}
            <div className="loading-grid" />

            {/* Background glow */}
            <div className="loading-glow loading-glow-one" />
            <div className="loading-glow loading-glow-two" />

            {/* Rotating decorative rings */}
            <div className="loading-orbit loading-orbit-one" />
            <div className="loading-orbit loading-orbit-two" />
            <div className="loading-orbit loading-orbit-three" />

            <section className="loading-content">

                {/* Logo / mark */}
                <div className="loading-logo-wrapper">

                    <div className="loading-logo-ring loading-ring-one" />
                    <div className="loading-logo-ring loading-ring-two" />

                    <div className="loading-logo">
                        <ShieldCheck size={34} strokeWidth={1.7} />
                    </div>

                </div>

                {/* Brand */}
                <div className="loading-brand">
                    <span className="loading-brand-main">
                        PRIME
                    </span>

                    <span className="loading-brand-sub">
                        MACHINES
                    </span>
                </div>

                {/* Status */}
                <div className="loading-status">

                    <span className="loading-status-dot">
                        <span />
                    </span>

                    <span>
                        Securing workspace
                    </span>

                </div>

                {/* Loader */}
                <div className="loading-spinner-wrapper">

                    <LoaderCircle
                        className="loading-spinner"
                        size={18}
                        strokeWidth={1.8}
                    />

                    <span>
                        Verifying access
                    </span>

                </div>

                {/* Progress line */}
                <div className="loading-progress">
                    <div className="loading-progress-bar" />
                </div>

                <p className="loading-security-text">
                    AUTHENTICATED WORKSPACE
                    <span>•</span>
                    SECURE CONNECTION
                </p>

            </section>

            {/* Bottom status */}
            <div className="loading-bottom-status">
                <span>PRIME CONTROL SYSTEM</span>
                <span className="loading-bottom-line" />
                <span>ACCESS CHECK</span>
            </div>

        </main>
    );
}