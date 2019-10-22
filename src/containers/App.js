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
const SEARCH_URL = "search/movie?language=fr&include_adult=false"

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
    });
  }

  onClickListItem(movie){
    this.setState({currentMovie:movie}, function(){
      this.applyVideoToCurrentMovie();
    })
  }

  onClickSearch(searchText){
    if(searchText){
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(response=>{
        if(response.data && response.data.results[0] && response.data.results[0].id !== this.state.currentMovie.id){
          this.setState({currentMovie: response.data.results[0]}, () => {
            this.applyVideoToCurrentMovie();
          })
        }
      });
   }

    
    console.log(searchText)
  }


  render(){
    const renderVideoList = () => {
      if(this.state.movieList.length >= 5){
        return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
      }
    }
    return (
      <div className="container">
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)}/>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId}/>
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>

      </div>
    );
  }
  
};

export default App;
