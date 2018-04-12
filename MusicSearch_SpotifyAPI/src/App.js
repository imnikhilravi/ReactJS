import React, { Component } from "react";
import SpotifyTrackListContainer from "./SpotifyTrackListContainer";
import SearchForm from "./SearchForm";

import "./App.css";

const divStyle = {
  left: '200px',
  margin: '80px'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackName: "",
    };
  }

  onSearch = (searchQuery) => {
    this.setState({
      trackName: searchQuery,
    });
  };

  render() {
    return (
      <div className="App" >
        <div className="container">
            <div id = "search" style = {divStyle} className="col-6">
              <SearchForm onSearch={this.onSearch} />
            </div>
            <div id = "songlist" className="col-6" >  
              <SpotifyTrackListContainer
                trackList={this.state.trackName}
              />
            </div>
        </div>
      </div>
    );}
}

export default App;
