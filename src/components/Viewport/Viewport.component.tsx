// import "./Viewport.component.scss";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.component";
import { classNames } from "../../utils/index.utils";
import React, { useState } from "react";
import { Viewport as ViewportEnum } from "../../enums/viewport.enums";

const Viewport = () => {
  const [viewport, setViewport] = useState<ViewportEnum>();
  return (
    <div
      className={classNames({
        "app-viewport__container": true,
      })}
    >
      <Navbar />
      <div
        className={classNames({
          "app-viewport__container-viewport": true,
        })}
      >
        <div className={
          classNames({
            "app-viewport__container-viewport-content": true,
            [ViewportEnum.disable]: viewport === ViewportEnum.disable
          })
        }>
          <Outlet
            context={
              setViewport as React.Dispatch<React.SetStateAction<ViewportEnum>>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Viewport;
