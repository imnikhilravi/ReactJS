import React, { Component } from "react";
import { trackSearch } from "./utility/spotifyApi";
import SpotifyTrackList from "./SpotifyTrackList";

class SpotifyTrackListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfMatchingTracks: []
    };
  }

  componentDidMount = async props => {
    if (this.props.trackList) {
      const matches = await trackSearch(this.props.trackList);
      this.setState({
        listOfMatchingTracks: matches
      });
    }
  };

  componentWillReceiveProps = async newProps => {
    if (newProps.trackList && newProps.trackList !== this.props.trackList) {
      const matches = await trackSearch(newProps.trackList);

      this.setState({
        listOfMatchingTracks: matches
      });
    }
  };

  render() {
    if (!this.props.trackList) {
      return  <div id = "search">
                 
               </div>
    }
    const tracks = [...this.state.listOfMatchingTracks];
    return <SpotifyTrackList trackList={tracks} />;
  }
}

export default SpotifyTrackListContainer;
