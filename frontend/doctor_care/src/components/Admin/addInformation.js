import React, { useEffect, useState } from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Paper } from '@material-ui/core';
import "../../styles/admin/markdown.scss";
import Select from 'react-select'
import { manageService } from '../../services/ManageService';

export const AddInformation = () => {

  const [markdown, setMarkdown] = useState({
    id:0,
    contentHTML:"",
    contentMarkdown:"",
    description:"",
    doctorId:0,
  });
  const [options, setOptions] = useState([]);
  const [doctorSelected,setDoctorSelected] = useState();
  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  console.log(doctorSelected);

  useEffect(() => {
    manageService
        .getDoctors()
        .then((result) =>{
          console.log(result);
          let data = result.data.map((e)=>{
            return {
              value:e,
              label:`Bác sĩ   ${e.lastName}  ${e.firstName}`
            }
          })
          setMarkdown({...markdown,["doctorId"]:result.data[0].id})
          setDoctorSelected(result.data[0]);
          setOptions(data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    return () => {
    };
  }, []);


  // Finish!
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
    setMarkdown({...markdown,["contentHTML"]:html,["contentMarkdown"]:text});
  }

  const handleSubmit = ()=>{
    console.log(markdown);
  }

  const handleTextAreaChange = (e)=>{
    setMarkdown({...markdown,["description"]:e.target.value})
  }

  const handleSelectChange = (selectedOption)=>{
      console.log("select ",selectedOption);
      setDoctorSelected(selectedOption.value);
      setMarkdown({...markdown,["doctorId"]:selectedOption.value.id});
  }


  return (
    <Paper
    className='markdown'
    style={{ }}
    > 
      <h2 className='text-center '>Add information</h2>
      <div className="row">
        <div className="more-info col-6">
            <Select 
              className="doctor-select"
              name=""
              id=""
              options={options}
              onChange={handleSelectChange} />
            {doctorSelected&&(
              <div className="doctor-info">
              <img className='doctor-arvartar' src={doctorSelected.image} alt="" />
              <div className="doctor-title">
              <h4>{doctorSelected.positon}</h4>
              <h4>Bác sĩ {doctorSelected.lastName} {doctorSelected.firstName} </h4>
              </div>
            </div>
            )}
        </div>
        <div className="more-info col-6">
            <textarea onChange={(e)=>handleTextAreaChange(e)}/>
            <div className="placeholder">Mô tả</div>
        </div>
      </div>
      <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
      <button onClick={handleSubmit} className='markdown-btn-save'>Lưu thông tin</button>
    </Paper>
  )
}
