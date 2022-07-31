import React from "react";
import { Link } from "react-router-dom";
import "../../styles/card.scss"

export const ClinicCard = ({ title, imageURL, address ,id}) => {
  return (
    <div>
    <Link to={`/clinic/${id}`}>
       <div className="card-container">    
        <div
            style={{ backgroundImage: `url(${imageURL})`, width: "250px" }}
            className="image card-bg-image"
        ></div>
            <h3 className="title mt-3">{title}</h3>
        </div>
      </Link>
    </div>
  );
};
