import React, { useState } from "react";
import userIcon from "/userIcon.jpg";

function SearchChannelResult() {
  return (
    <div className="SearchChannelResult">
      <div className="logo">
        <img src={userIcon} alt="" />
      </div>
      <div className="flex info">
        <div className="name">Chetan khulage</div>
        <span className="userName">@chetankhulage • 68 subscribers</span>
        <div className="subs">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga quae
          illum, quam mollitia quod earum! Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Repudiandae similique fugit veniam quasi
          aspernatur vitae.
        </div>
      </div>
      <button className="button subButton">Subscribe</button>
    </div>
  );
}

export default SearchChannelResult;
