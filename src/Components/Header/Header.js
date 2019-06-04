import React from "react";

export const TopBar = props => {
  const classname = `ham ${props.isopen ? "isopen" : ""}`;
  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-img">
          <img src="/assets/logoblue.svg" alt="" className="logo-img-dark" />
        </span>
        <span className="logo-text">
          <span className="logo-text-small">Powered By</span>
          <span className="logo-text-big">SBA Labs</span>
        </span>
      </div>
      <div
        className={classname}
        onClick={() => {
          props.toggleSideBar();
        }}
      >
        <span className="line line-top" />
        <span className="line line-mid" />
        <span className="line line-bottom" />
      </div>
    </header>
  );
};
