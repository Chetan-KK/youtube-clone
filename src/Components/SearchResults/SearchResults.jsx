import React, { useEffect, useState } from "react";
import "./css/SearchResults.css";
import { useParams } from "react-router-dom";
import SearchVideoResult from "./SearchVideoResult";
import searchResult from "../../assets/searchResult";
function SearchResults() {
  const [results, setResults] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getResults();
  }, [id]);

  //main gatting result from api

  // const getResults = async () => {
  //   try {
  //     const fetchedData = await fetch(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${
  //         import.meta.env.VITE_API_KEY
  //       }&type=video&q=${id}&maxResults=20`
  //     );
  //     const convertedData = await fetchedData.json();

  //     console.log(convertedData);

  //     if (!convertedData.pageInfo) {
  //       throw convertedData.error.message;
  //     } else {
  //       setResults(convertedData.items);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //dummy data

  const getResults = async () => {
    const convertedData = searchResult;
    setResults(convertedData.items);
    console.log(convertedData);
  };

  return (
    <div className="SearchResults">
      {results.map((video, i) => (
        <SearchVideoResult
          key={i}
          thumbnail={video.snippet.thumbnails.high.url}
          title={video.snippet.title}
          channelName={video.snippet.channelTitle}
          description={video.snippet.description}
          publishTime={video.snippet.publishTime}
          channelId={video.snippet.channelId}
          videoId={video.id.videoId}
        />
      ))}
    </div>
  );
}

export default SearchResults;
