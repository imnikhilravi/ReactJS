import React, { Component } from "react";
import SpotifyTrackEntry from "./SpotifyTrackEntry";

class SpotifyTrackList extends Component {
  render() {
    return (
      <div id = "songlist" class="card">
          <div id = "results" class="card-header text-white bg-dark mb-3">
            {this.props.trackList.length} Results
          </div>
          <ul class="list-group list-group-flush">
            {this.props.trackList.map(track => {
              return <SpotifyTrackEntry track={track} key={track.id} />;
            })}
          </ul>
      </div>
    );
  }
}

export default SpotifyTrackList;