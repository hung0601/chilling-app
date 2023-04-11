import backgrounds from "../gif-bg";
import React, { useState, useEffect } from "react";
import {
  BgColorsOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import "./BackGround.css";

const items: MenuProps["items"] = [];

const BackGround = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [isFullscreen, setFullscreen] = useState(false);
  // const [bgList, setBgList] = useState(items);
  useEffect(() => {
    loadBgList();
  });
  const loadBgList = () => {
    backgrounds.forEach((bg, i) => {
      items.push({
        label: (
          <div className="select-bg">
            <img
              onClick={handleBgClick}
              alt="bg"
              className="select-bg-img"
              id={i}
              src={bg.src}
            ></img>
          </div>
        ),
        key: i,
      });
    });
    // setBgList(items);
  };
  const handleBgClick = (e) => {
    setBackgroundIndex(e.target.id);
    // setBackgroundIndex((backgroundIndex + 1) % backgrounds.length);
  };
  const handerFullscreenClick = () => {
    const elem = document.querySelector("body");

    if (isFullscreen) {
      setFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    } else {
      setFullscreen(true);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  };
  return (
    <div className="background-div">
      <img
        className="bg-img"
        src={backgrounds[backgroundIndex].src}
        alt="bg"
      ></img>
      <div className="change-bg">
        <Dropdown
          overlayClassName="drop-down-menu"
          className="drop-down"
          menu={{ items }}
        >
          <div className="change-button">
            <BgColorsOutlined />
          </div>
        </Dropdown>
        {isFullscreen ? (
          <FullscreenExitOutlined
            onClick={handerFullscreenClick}
            className="fullscreen"
          />
        ) : (
          <FullscreenOutlined
            onClick={handerFullscreenClick}
            className="fullscreen"
          />
        )}
      </div>
    </div>
  );
};
export default BackGround;
