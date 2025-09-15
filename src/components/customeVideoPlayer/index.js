"use client";
import React, { useRef, useEffect, useState } from 'react';
import styles from './customeVideoPlayer.module.scss';
import Watermark from '../waterMark';
import Playicon from '../../../public/assets/icons/playicon';
import Pauseicon from '../../../public/assets/icons/pauseicon';
import Audiofullicon from '../../../public/assets/icons/audiofullicon';
import Audiomuteicon from '../../../public/assets/icons/audiomuteicon';
import Fullscreenicon from '../../../public/assets/icons/fullscreenicon';
import Minimizedicon from '../../../public/assets/icons/minimizedicon';

const CustomVideoPlayer = React.memo(({ src, userId, className = '', ...props }) => {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const volumeSliderRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!src) {
            console.error('No video source provided');
            return;
        }

        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.playsInline = true;
        video.muted = true;

        const renderFrame = () => {
            if (!video || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (video.readyState >= video.HAVE_CURRENT_DATA) {
                const videoAspectRatio = video.videoWidth / video.videoHeight;
                const canvasAspectRatio = canvas.width / canvas.height;

                let renderWidth, renderHeight, offsetX, offsetY;

                if (videoAspectRatio > canvasAspectRatio) {
                    renderHeight = canvas.height;
                    renderWidth = renderHeight * videoAspectRatio;
                    offsetX = (canvas.width - renderWidth) / 2;
                    offsetY = 0;
                } else {
                    renderWidth = canvas.width;
                    renderHeight = renderWidth / videoAspectRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - renderHeight) / 2;
                }

                ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, offsetX, offsetY, renderWidth, renderHeight);
                drawWatermark(ctx, canvas);
            }

            if (!video.paused && !video.ended) {
                animationFrameRef.current = requestAnimationFrame(renderFrame);
            }
        };

        const drawWatermark = (ctx, canvas) => {
            if (!userId) return;

            const text = `User: ${userId}`;
            const fontSize = Math.max(12, canvas.width * 0.02);
            const padding = 10;

            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.textBaseline = 'middle';

            const textMetrics = ctx.measureText(text);
            const textWidth = textMetrics.width;
            const textHeight = fontSize * 1.2;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(
                padding,
                canvas.height - textHeight - padding * 2,
                textWidth + padding * 2,
                textHeight + padding
            );

            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText(
                text,
                padding * 2,
                canvas.height - textHeight / 2 - padding
            );
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration || 0);
            resizeCanvas();
            renderFrame();
        };

        const handleCanPlay = () => {
            video.play().catch(error => {
                console.warn('Autoplay failed:', error);
            });
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            setProgress(video.duration > 0 ? (video.currentTime / video.duration) * 100 : 0);
        };

        const handlePlay = () => {
            setIsPlaying(true);
            renderFrame();
        };

        const handlePause = () => {
            setIsPlaying(false);
            cancelAnimationFrame(animationFrameRef.current);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            cancelAnimationFrame(animationFrameRef.current);
        };

        const handleError = (e) => {
            console.error('Video error:', e);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);

        videoRef.current = video;

        return () => {
            video.pause();
            video.removeAttribute('src');
            video.load();
            video.remove();
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [src]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        resizeCanvas();
    }, [isFullscreen]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(err => console.error('Play failed:', err));
        }
    };

    const toggleMute = () => setIsMuted(!isMuted);

    const handleVolumeSliderChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            if (isMuted && newVolume > 0) {
                setIsMuted(false);
            }
        }
    };

    const handleProgressClick = (e) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * videoRef.current.duration;
    };

    const toggleFullscreen = () => {
        setIsFullscreen(prev => !prev); // Don't use native fullscreen API
    };

    const resizeCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.videoContainer} ${className} ${isFullscreen ? styles.fullscreen : ''}`}
        >
            <canvas
                ref={canvasRef}
                className={styles.videoCanvas}
                onClick={togglePlay}
            />

            <div className={styles.controls}>
                <div className={styles.timelineflx}>
                    <div className={styles.timer}>
                        <span>{formatTime(currentTime)}</span>
                    </div>
                    <div className={styles.timelinerelative} onClick={handleProgressClick}>
                        <div className={styles.loadprogress}></div>
                        <div className={styles.progressmain} style={{ width: `${progress}%` }}>
                            <div className={styles.progress}>
                                <div className={styles.progressdotmain}>
                                    <div className={styles.progressdot}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.timer}>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className={styles.videcontrolsflx}>
                    <div className={styles.videcontrolsflxleft}>
                        <div className={styles.icons} onClick={togglePlay}>
                            {isPlaying ? <Pauseicon /> : <Playicon />}
                        </div>
                        <div className={styles.volumeContainer}>
                            <div className={styles.icons} onClick={toggleMute}>
                                {isMuted || volume === 0 ? <Audiomuteicon /> : <Audiofullicon />}
                            </div>
                            {showVolumeSlider && (
                                <div className={styles.volumeSliderContainer}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeSliderChange}
                                        className={styles.volumeSlider}
                                        ref={volumeSliderRef}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.videcontrolsflxright}>
                        <div className={styles.icons} onClick={toggleFullscreen}>
                            {isFullscreen ? <Minimizedicon /> : <Fullscreenicon />}
                        </div>
                    </div>
                </div>
            </div>

            <Watermark />
        </div>
    );
});

export default CustomVideoPlayer;
