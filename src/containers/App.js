import React,{Component} from "react";
import "./App.css";
import SearchBar from "../components/Search-bar";
import VideoList from "./Video-list"
import axios from "axios"

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr-FR&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=75b8dcb9869cd838171e56b4e67ec35f"

class App extends Component {

  constructor(props){
    super(props);
    this.state={movieList:{},currentMovie:{}}
  }

  UNSAFE_componentWillMount(){
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(response=>{
      this.setState({movieList:response.data.results.slice(1,6)})
      this.setState({currentMovie:response.data.results[0]})
      console.log(this.state.currentMovie)
    });
  }

  render(){
    return (
      <div>
        <SearchBar />
        <VideoList/>
      </div>
    );
  }
  
};

export default App;
