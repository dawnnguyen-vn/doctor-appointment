import React from "react";
import { Link } from "react-router-dom";

export const SpecialtyCard = ({ title, imageURL, description }) => {
  return (
    <div className="">
      <div
        style={{ backgroundImage: `url(${imageURL})`, width: "250px" }}
        className="image card-bg-image"
      ></div>
      <Link to={`/${description}`}>
        <h3 className="mt-3">{title}</h3>
      </Link>
    </div>
  );
};
