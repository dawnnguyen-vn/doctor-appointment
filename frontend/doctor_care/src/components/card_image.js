import React from "react";
import { Link } from "react-router-dom";

export const CardImage = ({ title, imageURL, description }) => {
  return (
    <div className="">
      <div
        style={{ backgroundImage: `url(${imageURL})`, width: "250px" }}
        className="image card-bg-image"
      ></div>
      <Link to={`/${description}`}>
        <h3
          style={{
            fontSize: "0.8em",
            textDecoration: "none",
            color: "black",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>
      </Link>
    </div>
  );
};
