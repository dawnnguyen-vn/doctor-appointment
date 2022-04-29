import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Paper } from "@material-ui/core";
import "../../styles/admin/markdown.scss";
import swal from "sweetalert";
import Select from "react-select";
import { manageService } from "../../services/ManageService";
import { ErrorNoData } from "../no_data";

export const AddInformation = () => {
  const [exist, setExist] = useState(false);
  const [markdown, setMarkdown] = useState({
    id: 0,
    contentHTML: "",
    contentMarkdown: "",
    description: "",
    doctorId: 0,
    specialtyId: 0,
    clinicId: 0,
  });
  const [options, setOptions] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState();
  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  console.log(exist);
  useEffect(() => {
    manageService
      .getDoctors()
      .then((result) => {
        console.log(result);
        let data = result.data.map((e) => {
          return {
            value: e,
            label: `Bác sĩ   ${e.lastName}  ${e.firstName}`,
          };
        });
        manageService
          .getDoctorMarkdown(result.data[0].id)
          .then((result) => {
            setExist(true);
            setMarkdown(result.data);
          })
          .catch((err) =>
            setMarkdown({ ...markdown, ["doctorId"]: result.data[0].id })
          );
        setDoctorSelected(result.data[0]);
        setOptions(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    return () => {};
  }, []);

  // Finish!
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
    setMarkdown({
      ...markdown,
      ["contentHTML"]: html,
      ["contentMarkdown"]: text,
    });
  }

  const handleSubmit = () => {
    if(exist){
      manageService
      .updateDoctorMarkdown(doctorSelected.id, markdown)
      .then((result) => {
        swal({
          title: "Thêm tin thành công",
          icon: "success",
          button: "OK",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }else{
      manageService
      .addDoctorMarkdown(markdown)
      .then((result) => {
        swal({
          title: "Thêm tin thành công",
          icon: "success",
          button: "OK",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }
  };

  const handleTextAreaChange = (e) => {
    setMarkdown({ ...markdown, ["description"]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    console.log("select ", selectedOption);
    setDoctorSelected(selectedOption.value);
    manageService
      .getDoctorMarkdown(selectedOption.value.id)
      .then((result) => {
        console.log(">>>>>result", result);
        if (result.data !== "") {
          setMarkdown(result.data);
          setExist(true);
        } else {
          setMarkdown({
            id: 0,
            contentHTML: "",
            contentMarkdown: "",
            description: "",
            doctorId: selectedOption.value.id,
            specialtyId: 0,
            clinicId: 0,
          });
          setExist(false);
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <Paper className="markdown" style={{}}>
      <h2 className="text-center ">Thêm thông tin chi tiết</h2>
      {options && options.length > 0 ? (
        <>
          <div className="row">
            <div className="more-info col-6">
              <Select
                className="doctor-select"
                name=""
                id=""
                options={options}
                onChange={handleSelectChange}
              />
              {doctorSelected && (
                <div className="doctor-info">
                  <img
                    className="doctor-arvartar"
                    src={doctorSelected.image}
                    alt=""
                  />
                  <div className="doctor-title">
                    <h4>{doctorSelected.positon}</h4>
                    <h4>
                      Bác sĩ {doctorSelected.lastName}{" "}
                      {doctorSelected.firstName}{" "}
                    </h4>
                  </div>
                </div>
              )}
            </div>
            <div className="more-info col-6">
              <textarea
                value={markdown.description}
                onChange={(e) => handleTextAreaChange(e)}
              />
              <div className="placeholder">Mô tả</div>
            </div>
          </div>
          <MdEditor
            style={{ height: "500px" }}
            value={markdown.contentMarkdown}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
          <button onClick={handleSubmit} className="markdown-btn-save">
            Lưu thông tin
          </button>
        </>
      ) : (
        <ErrorNoData/>
      )}
    </Paper>
  );
};
