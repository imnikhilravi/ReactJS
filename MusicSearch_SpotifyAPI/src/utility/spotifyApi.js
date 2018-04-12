import Axios from "axios";

const spotifyInstance = Axios.create();
let token = "";

async function getAccessToken() {
  let httpRes;
  try {
    httpRes = await spotifyInstance.post('https://cs-554-spotify-proxy.herokuapp.com/api/token', { grant_type: 'client_credentials' }, {
      headers: { Authorization: 'Basic M2QxZmQ4MmNmYmUwNDZiY2ExMWQ3ZTUwMjJmY2E0MmQ6NGRjMzUwZjhmMGYxNDJhMWE5NTk2MDQ3MDU2ZmI1MzI=' }
    });
  }
  catch (error) {
    console.log(error);
  }
  if (httpRes)
    token = httpRes.data.access_token;
  return token;
}

export const trackSearch = async trackName => {
  if (!token || token.length <= 2)
    await getAccessToken();
  const url = `https://cs-554-spotify-proxy.herokuapp.com/v1/search?q=${trackName}&type=track`;
  const httpRes = await spotifyInstance.get(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log(httpRes.data.tracks.items);
  return httpRes.data.tracks.items;
};