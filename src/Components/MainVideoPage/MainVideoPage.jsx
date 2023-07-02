import React, { useEffect, useRef, useState } from "react";
import "./MainVideoPage.css";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import formatNumber from "../../Utils/numConvert";
// import SlideBar from "../SlideBar/SlideBar";

function MainVideoPage() {
  const [channelLogo, setChannelLogo] = useState(null);
  const [views, setViews] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [channelId, setChannelId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setVideoId(id.split(",")[0]);
    setChannelId(id.split(",")[1]);

    getChannelInfo();
    getVideoInfo();
  }, []);

  const readyFunc = (e) => {
    e.target.playVideo();
  };

  const getChannelInfo = async () => {
    try {
      const fetchedData = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=${
          import.meta.env.VITE_API_KEY
        }&id=${videoId}`
      );
      const convertedData = await fetchedData.json();
      if (!convertedData.items[0]) {
        throw convertedData;
      } else {
        setViews(formatNumber(convertedData.items[0].statistics.viewCount));
        console.log(views);
      }
    } catch (err) {
      console.log(err);
      setViews("---");
    }
  };

  const getVideoInfo = async () => {
    try {
      const fetchedData = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${
          import.meta.env.VITE_API_KEY
        }&id=${channelId}`
      );
      const convertedData = await fetchedData.json();
      console.log(convertedData);
      if (!convertedData.items[0]) {
        throw convertedData;
      } else {
        setChannelLogo(convertedData.items[0].snippet.thumbnails.default.url);
        console.log(channelLogo);
      }
    } catch (err) {
      console.log(err);
      setChannelLogo("---");
    }
  };

  return (
    <div className="MainVideoPage flex">
      <div className="player-section">
        <div className="video-container">
          <YouTube
            className="video_player"
            iframeClassName="video_player-iframe"
            videoId={videoId}
            onReady={readyFunc}
          />
        </div>
      </div>
      <div className="videos-section">{/* <SlideBar /> */}</div>
    </div>
  );
}

export default MainVideoPage;
