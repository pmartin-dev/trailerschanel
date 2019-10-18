import React from "react";
import "./App.css";
import SearchBar from "../components/Search-bar";
import VideoList from "./Video-list"

const API_KEY = "75b8dcb9869cd838171e56b4e67ec35f";

const App = () => {
  return (
    <div>
      <SearchBar />
      <VideoList/>
    </div>
  );
};

export default App;
