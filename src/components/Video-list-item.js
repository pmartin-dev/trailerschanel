import React from 'react';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const VideoListItem = (props) => {
    const {movie} = props;

    function handleOnClick(){
        props.callback(movie)
    }

    return (<li className="list-group-item" onClick={handleOnClick}>
        <div className="media">
            <div className="media-left">
                 <img className="media-object img-rounded" height="150px" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={`Film ${movie.title}`}/>
            </div>
        
            <div className="media-body">
                <h5 className="title_list_item">{movie.title}</h5>
            </div>
        </div>
        </li>)
}

export default VideoListItem;
