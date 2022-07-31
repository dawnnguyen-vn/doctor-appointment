import React from "react";
import "../../styles/admin/add_specialty.scss";
import { useState } from "react";
import {manageAdminService} from "../../services/ManageAdminService"
import swal from "sweetalert";

export default function AddInfoClinic() {
  let [state, setState] = useState({
      id:0,
      name: "",
      image: "",
      description: "",
      clinicId:1
  });
 
  return (
    <div
      className="modal fade"
      id="addClinic2"
      tabIndex={-1}
      aria-labelledby="addClinic2"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div  className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNewsModalTitle">
              Thêm chuyên khoa
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <h2>add markdown</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
