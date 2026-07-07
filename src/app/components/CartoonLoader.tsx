"use client";

import React from "react";
import "./CartoonLoader.css";

const CartoonLoader: React.FC = () => {
  return (
    <div className="stage">
      <div className="toon-shadow"></div>
      <div className="dust l"></div>
      <div className="dust r"></div>

      <div className="toon-bounce">
        <div className="toon-arm l"></div>
        <div className="toon-arm r"></div>

        <div className="toon-body">
          <div className="brow l"></div>
          <div className="brow r"></div>
          <div className="eye l">
            <span className="pupil"></span>
            <span className="glint"></span>
          </div>
          <div className="eye r">
            <span className="pupil"></span>
            <span className="glint"></span>
          </div>
          <div className="blush l"></div>
          <div className="blush r"></div>
          <div className="mouth"></div>
        </div>

        <div className="toon-leg l"></div>
        <div className="toon-leg r"></div>
      </div>
    </div>
  );
};

export default CartoonLoader;