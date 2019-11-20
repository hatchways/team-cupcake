import React, { useState, useEffect } from "react";
import { getRemoteData } from "../utils/MakeAPIcall";
import "./Follow.css";

const Following = () => {
  const followEndPoint =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=eb942738a2bb8b5943c88166d66d5f7d&language=en-US&region=US&page=1";
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchFollowData() {
      let response = await getRemoteData(followEndPoint);
      await setData(response.results);
      // console.log(response)
    }
    fetchFollowData();
  }, []);

  return (
    <>
      <ul className="album-img-wrapper">
        {data.map((r, i) => {
          return (
            <li key={i}>
              <img
                src={
                  "https://image.tmdb.org/t/p/w185_and_h278_bestv2" +
                  r.poster_path
                }
                alt="Smiley face"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Following;
