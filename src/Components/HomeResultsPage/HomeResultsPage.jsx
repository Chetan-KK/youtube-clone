import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import VideoCard from "../VideoCard/VideoCard";
import SlideBar from "../SlideBar/SlideBar";
import "./HomeResultsPage.css";

import MainDataCopy from "../../assets/data";
function HomeResultsPage() {
  let { id } = useParams();

  const location = useLocation();

  useEffect(() => {
    if (id === "All") {
      getResult("programming");
    } else {
      getResult(id);
    }
  }, [location]);

  const [results, setResults] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [pageData, setpageData] = useState({});

  const [loaded, setLoaded] = useState(false);

  //main gatting result from api

  const getResult = async (typeId) => {
    if (results.length >= 1000000) {
      setHasMore(false);
    }
    try {
      const fetchedData = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${
          import.meta.env.VITE_API_KEY
        }&type=video&q=${typeId}&maxResults=20&videoDuration=long`
      );
      const convertedData = await fetchedData.json();
      if (!convertedData.pageInfo) {
        throw convertedData.error.message;
      } else {
        setResults(convertedData.items);
        console.log(results);
        setLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // dummy get result
  // const getResult = async () => {
  //   if (results.length >= 1000000) {
  //     setHasMore(false);
  //   }
  //   try {
  //     const convertedData = MainDataCopy;
  //     if (!convertedData.pageInfo) {
  //       throw convertedData.error.message;
  //     } else {
  //       setResults(convertedData.items);
  //       console.log(results);
  //       setLoaded(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  let uniqueKey = 0;
  return (
    <div className="ResultsPage">
      <SlideBar />

      <div className="results flex">
        {results &&
          results.map((video) => (
            <VideoCard
              key={uniqueKey++}
              thumbnail={video.snippet.thumbnails.high.url}
              title={video.snippet.title}
              channelTitle={video.snippet.channelTitle}
              publishTime={video.snippet.publishTime}
              channelId={video.snippet.channelId}
              videoId={video.id.videoId}
            />
          ))}
      </div>
    </div>
  );
}

export default HomeResultsPage;
