import React from "react";
import { Link } from "react-router-dom";

export const SpecialtyCard = ({ title, imageURL, description, id }) => {
  return (
    <div>
      <Link to={`/specialty/${id}`}>
        <div className="card-container">
          <div
            style={{ backgroundImage: `url(${imageURL})`, width: "250px" }}
            className="image card-bg-image"
          ></div>
          <h3 className="mt-3 title">{title}</h3>
        </div>
      </Link>
    </div>
  );
};
