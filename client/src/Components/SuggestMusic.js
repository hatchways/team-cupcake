import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import debounce from "../utils/debounce";
export default function SuggestMusic(props) {
  const [value, setValue] = useState("");
  const [songs, setSongs] = useState([]);
  const inputProps = {
    placeholder: "Search and share music !",
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    }
  };
  const renderSuggestions = suggestion => {
    const getAuthors = suggestion.artists.map((artist, i) => {
      return i + 1 !== suggestion.artists.length
        ? `${artist.name} & `
        : artist.name;
    });
    return (
      <div className="suggestion-content">
        <img src={suggestion.album.images[2].url} alt="albumimage" />
        <span style={{ marginLeft: "10px" }}>
          {suggestion.name} <br /> <b>By : {getAuthors}</b>
        </span>
      </div>
    );
  };
  const getSuggestion = suggestion => {
    if (props.select) props.select(suggestion);
    if (props.open) {
      props.song(suggestion);
      props.open(true);
    }
    return "";
  };
  const clearSuggestion = () => {
    setSongs([]);
  };
  const searchSpotify = ({ value }) => {
    debounce(apiCall, 1000, value);
    async function apiCall(value) {
      const result = await fetch(
        `https://api.spotify.com/v1/search?q=${value}&type=track&limit=${props.limit}`,
        {
          headers: new Headers({
            authorization: `Bearer ${sessionStorage.getItem("spotifyToken")}`
          })
        }
      );
      const musicjson = await result.json();
      const music = musicjson;
      if (music.error) return setSongs([]);
      setSongs(music.tracks.items);
      return;
    }
  };

  return (
    <Autosuggest
      inputProps={inputProps}
      suggestions={songs}
      onSuggestionsFetchRequested={searchSpotify}
      onSuggestionsClearRequested={clearSuggestion}
      renderSuggestion={renderSuggestions}
      getSuggestionValue={getSuggestion}
    />
  );
}
