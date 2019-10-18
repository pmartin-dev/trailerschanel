import React from 'react';
import VideoListItem from '../components/Video-list-item';

const VideoList = () => {
    return (
        <div>
            <ul>
                <VideoListItem/>
                <VideoListItem/>
                <VideoListItem/>
                <VideoListItem/>
            </ul>
        </div>
    )
}

export default VideoList;