import React, { useEffect, useRef, useState } from "react";
import "./MainVideoPage.css";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import formatNumber from "../../Utils/numConvert";
// import SlideBar from "../SlideBar/SlideBar";

function MainVideoPage() {
  //for player
  const playerRef = useRef(null);

  const [player, setPlayer] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  //for data
  const [channelLogo, setChannelLogo] = useState(null);
  const [views, setViews] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [channelId, setChannelId] = useState(null);

  const { id } = useParams();

  // Customize the player options
  const playerOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1, // Autoplay the video
      modestbranding: 1, // Hide YouTube logo
      showinfo: 0, // Hide video title
      rel: 0, // Do not show related videos at the end
    },
  };

  useEffect(() => {
    setVideoId(id.split(",")[0]);
    setChannelId(id.split(",")[1]);
  }, []);

  const readyFunc = (event) => {
    // event.target.playVideo();
    setPlayer(event.target);
    setIsVideoReady(true);
  };

  useEffect(() => {
    if (!player) return; // Exit early if player is not set yet

    const handleKeyDown = (e) => {
      if (e.key === " ") {
        if (player.getPlayerState() === 2) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }

      if (e.key === "m") {
        player.isMuted() ? player.unMute() : player.mute();
      }

      if (e.key === "ArrowRight") {
        const newTime = player.getCurrentTime() + 5;
        player.seekTo(newTime);
      }

      if (e.key === "ArrowLeft") {
        const newTime = player.getCurrentTime() - 5;
        player.seekTo(newTime < 0 ? 0 : newTime);
      }

      if (e.key === "f") {
        toggleFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  const toggleFullscreen = () => {
    const iframe = player.getIframe();
    if (iframe) {
      if (!document.fullscreenElement) {
        // Not in fullscreen, request fullscreen
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      } else {
        // Currently in fullscreen, exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  };

  return (
    <div className="MainVideoPage flex">
      <div className="player-section">
        <div className="video-container">
          {isVideoReady ? undefined : (
            <div className="placeholder">
              <div className="animated-background"></div>
            </div>
          )}
          <YouTube
            className="video_player"
            iframeClassName="video_player-iframe"
            videoId={videoId}
            onReady={readyFunc}
            ref={playerRef}
            opts={playerOptions}
          />
        </div>
      </div>
      <div className="videos-section">{/* <SlideBar /> */}</div>
    </div>
  );
}

export default MainVideoPage;
