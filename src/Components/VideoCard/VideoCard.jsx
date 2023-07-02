import React, { useEffect, useState } from "react";
import "./VideoCard.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
import formatNumber from "../../Utils/numConvert";

import lightGrayBg from "/placeholders/lightGray.png";
import { getChannelInfo, getVideoInfo } from "../../Utils/getPerticularInfo";

TimeAgo.addDefaultLocale(en);

function VideoCard(props) {
  const [theme, setTheme] = useState("");
  const [channelLogo, setChannelLogo] = useState(null);
  const [views, setViews] = useState(null);

  //format time in years and months format
  const timeAgo = new TimeAgo("en-US");
  const publishDate = timeAgo.format(new Date(props.publishTime));

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    getData();
  }, []);

  async function getData() {
    const videoInfo = await getVideoInfo(props.videoId);

    setViews(videoInfo ? formatNumber(videoInfo.statistics.viewCount) : "---");

    const channelInfo = await getChannelInfo(props.channelId);
    setChannelLogo(
      channelInfo ? channelInfo.snippet.thumbnails.default.url : lightGrayBg
    );
  }

  return (
    <Link to={`/video/${props.videoId},${props.channelId}`} className="link">
      <div className="Video">
        <div className="video__thumbnail">
          {props.thumbnail ? (
            <img
              src={props.thumbnail}
              alt=""
              className="video__thumbnail__img"
            />
          ) : (
            <img src={graybg} alt="" className="video__thumbnail__img" />
          )}
        </div>
        <div className="video__description flex">
          <div className="channel_logo_side">
            <img src={channelLogo} className="channel_logo" alt="" />
          </div>
          <div className="desc_side">
            <div className="video__title">{props.title}</div>
            <div className="channel__name">{props.channelTitle}</div>
            <span className="video__views">{views}</span>
            <span className="video__publishDate">{publishDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
