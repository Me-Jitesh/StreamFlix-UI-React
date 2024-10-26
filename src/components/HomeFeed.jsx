import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import '../App.css';
import VideoPlayer from './VideoPlayer';

function HomeFeed() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('https://streamflix-unhp.onrender.com/api/v1/videos/stream');
                const data = await response.json();
                console.log(data)
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`https://streamflix-unhp.onrender.com/api/v1/videos/stream/delete/${id}`, {
                method: 'GET',
            });
            setVideos(videos.filter((video) => video.videoId !== id));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    if (loading) {
        return <Spinner aria-label="Loading..." />;
    }

    return (
        <div className="app">
            {/* <h1 className="text-3xl font-bold text-center my-4">Video Feed</h1> */}
            <div className="video-feed grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard
                        key={video.videoId}
                        video={video}
                        onDelete={() => handleDelete(video.videoId)}
                    />
                ))}
            </div>
        </div>
    );
}

function VideoCard({ video, onDelete }) {
    return (
        <div className="max-w-sm bg-slate-950 border border-gray-500 rounded-md shadow-md">
            <VideoPlayer src={`https://streamflix-unhp.onrender.com/api/v1/videos/stream/${video.videoId}/master.m3u8`}
                poster={`https://streamflix-unhp.onrender.com/api/v1/videos/stream/thumb/${video.videoId}`}>
            </VideoPlayer>

            {/* <img src={`https://streamflix.koyeb.app/api/v1/videos/stream/thumb/${video.videoId}`} alt={video.title} className="rounded-t-lg w-full h-48 object-cover" /> */}
            <div className="p-5">
                <h5 className="text-2xl font-semibold tracking-tight text-slate-600"> {video.title}</h5>
                <p className="text-slate-300 text-sm mt-2">  &#x22B9; {video.description}</p>
                <Button
                    onClick={onDelete}
                    size='md'
                    gradientDuoTone="tealToLime"
                    className='my-4'
                    outline pill
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default HomeFeed;
