import TimeAgo from "javascript-time-ago";
import React, { useEffect, useState } from "react";
import "./css/SearchVideoResult.css";
import formatNumber from "../../Utils/numConvert";
import { Link } from "react-router-dom";
import { getChannelInfo, getVideoInfo } from "../../Utils/getPerticularInfo";

import lightGrayBg from "/placeholders/lightGray.png";

function SearchVideoResult(props) {
  const [views, setViews] = useState(null);
  const [channelLogo, setChannelLogo] = useState(null);
  const [years, setYears] = useState(null);

  useEffect(() => {
    //format time in years and months format
    const timeAgo = new TimeAgo("en-US");
    setYears(timeAgo.format(new Date(props.publishTime)));

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
      <div className="SearchVideoResult flex">
        <div className="thumbnail_wrapper">
          <img src={props.thumbnail} alt="thumbnail" className="thumbnail" />
        </div>
        <section>
          <div className="title">{props.title}</div>
          <div className="stats">
            {views} views &#x2022; {years}
          </div>
          <div className="channel flex">
            <img src={channelLogo} alt="" className="logo" />
            {props.channelName}
          </div>
          <div className="desc">{props.description}</div>
        </section>
      </div>
    </Link>
  );
}

export default SearchVideoResult;
