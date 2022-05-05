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


export const MarkdownSpecialty = () => {
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
    const [specialtySelected, setSpecialtySelected] = useState();
    // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);
  
    console.log(options);
  
    useEffect(  () => {
      async function fetchData(){
         manageService
        .getListOfSpecialty()
        .then( async (result) =>  {
          console.log(result.data.data[0]);
          let data = result.data.data.map((e) => {
            return {
              value: e,
              label: e.name,
            };
          });
          setSpecialtySelected(result.data.data[0]);
          setOptions(data);
          await manageService
            .getSpecialtyMarkdown(result.data.data[0].id)
            .then((result) => {
              setExist(true);
              setMarkdown(result.data);
            })
            .catch((err) =>
              setMarkdown({ ...markdown, ["specialtyId"]: result.data[0].id })
            );
          
        })
        .catch((err) => {
          console.log(err.response);
        });
      }

      fetchData();
      return () => {};
    }, []);
    console.log("specialty select",markdown);

  
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
        .updateSpecialtyMarkdown(specialtySelected.id, markdown)
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
        .addSpecialtyMarkdown(markdown)
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
  
    const handleSelectChange = (selectedOption) => {
      console.log("select ", selectedOption);
      setSpecialtySelected(selectedOption.value);
      manageService
        .getSpecialtyMarkdown(selectedOption.value.id)
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
              doctorId: 0,
              specialtyId: selectedOption.value.id,
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
        {specialtySelected ? (
          <>
          <h2>{specialtySelected.name}</h2>
            <div className="row">
              <div className="more-info col-6">
                <div className="">
                <Select
                  className="doctor-select"
                  name=""
                  defaultValue={{ label: specialtySelected.name, value: specialtySelected }}
                  id=""
                  options={options}
                  onChange={handleSelectChange}
                />
                </div>
              </div>
              <div className="more-info col-6">
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
}
