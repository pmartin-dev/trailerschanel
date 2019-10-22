import React from 'react';
import VideoListItem from '../components/Video-list-item';

const VideoList = (props) => {

    const {movieList} = props;

    function receiveCallBack(movie){
        props.callback(movie);
    }

    return (
        <div>
            <ul>
                {
                    movieList.map((movie) => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                    })
                }
            </ul>
        </div>
    )
}

export default VideoList;