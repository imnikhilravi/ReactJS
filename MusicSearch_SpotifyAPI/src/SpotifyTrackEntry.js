import React from "react";


function SpotifyTrackEntry({ track }) {

  return <div class = "card text-white bg-dark mb-3" > <li><div>
    {track.name}
    <br></br>
    <img src={track.album.images[1].url} width={track.album.images[1].width} height={track.album.images[1].height} alt={track.album.name} />
    <br></br>
    <audio controls>
      <source src={track.preview_url} type="audio/mp3" />
    </audio>
    <br></br>
    <a href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a> 
    <br></br>
    <a href={track.album.external_urls.spotify} >{track.album.name}</a>
    <br></br>
    <br></br>
  </div></li> 
  </div>
}

export default SpotifyTrackEntry;