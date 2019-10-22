import React,{Component} from "react";
import "./App.css";
import SearchBar from "../components/Search-bar";
import VideoList from "./Video-list"
import axios from "axios"
import VideoDetail from "../components/Video-detail"
import Video from '../components/Video'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr-FR&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=75b8dcb9869cd838171e56b4e67ec35f"

class App extends Component {

  constructor(props){
    super(props);
    this.state={movieList:{},currentMovie:{}}
  }

  UNSAFE_componentWillMount(){
    this.initMovies();
  }

  initMovies(){
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(response=>{
      this.setState({movieList:response.data.results.slice(1,6), currentMovie:response.data.results[0]}, function(){this.applyVideoToCurrentMovie()})
    });
  }

  applyVideoToCurrentMovie(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(response=>{
      const youtubeKey = response.data.videos.results[0].key;
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({currentMovie: newCurrentMovieState})
      //console.log(this.state.currentMovie.videoId)
      // console.log(youtubeKey);
    });
  }

  render(){
    const renderVideoList = () => {
      if(this.state.movieList.length >= 5){
        return <VideoList movieList={this.state.movieList}/>
      }
    }
    return (
      <div>
        <SearchBar />
        <Video videoId={this.state.currentMovie.videoId}/>
        {renderVideoList()}
        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
      </div>
    );
  }
  
};

export default App;
