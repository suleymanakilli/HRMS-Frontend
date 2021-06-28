import React, { useState, useEffect } from "react";
import "./UserResumes.css";
import CandidateCoverLetterService from "../../services/candidateCoverLetterService";
import ResumeService from "../../services/resumeService";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Dropdown from "../../helpers/dropdown/dropdown";
import DropdownItem from "../../helpers/dropdown/dropdown";
import CloseIcon from "@material-ui/icons/Close";
export default function UserResumes() {
  const [coverLetters, setcoverLetters] = useState([]);
  const [resumes, setresumes] = useState([]);
  const [number, setnumber] = useState(0)
  const userInfos = useSelector(state => state.user)
  useEffect(() => {
    let coverLetterService = new CandidateCoverLetterService();
    coverLetterService
      .getByCandidateId(userInfos.userInfos.id)
      .then((result) => setcoverLetters(result.data.data));
    let resumeService = new ResumeService();
    resumeService
      .getShortResumesByCandidateId(userInfos.userInfos.id)
      .then((result) => setresumes(result.data.data));
  }, [userInfos,number]);
  function showPopUp(){
    document.getElementsByClassName("add-user-resume-pop-up-container")[0].style.display="block"
    document.getElementsByClassName("blur")[0].style.display="block"
    
  }
  function hidePopUp(){
    document.getElementsByClassName("add-user-resume-pop-up-container")[0].style.display="none"
    document.getElementsByClassName("blur")[0].style.display="none"
    setTimeout(() => {
      setnumber(number+1)
      
    }, 50);
    
  }
  return (
    <div className="user-resumes-container">
      <div className="blur"></div>
      <div className="user-resumes container">
        <div className="user-resumes-header header">
          <span>Özgeçmişler</span>
          <button onClick={()=>showPopUp()}>Yeni özgeçmiş oluştur</button>
        </div>
        <div className="add-user-resume-pop-up-container">
          <div className="add-user-resume-pop-up">
            <Formik
              enableReinitialize={true}
              initialValues={{
                candidate: {
                  id: userInfos.userInfos.id,
                },
                resumeName: "",
              }}
              validationSchema={Yup.object({
                resumeName: Yup.string().required("Bu alan boş olamaz"),
              })}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                let resumeService = new ResumeService();
                resumeService.add(values);
                
                //let authService=new AuthService()
                //authService.login(values).then(response=>(handleResult(response))).catch(error=>handleErrorResult(error))
                //resetForm()
              }}
            >
              {({
                values,
                touched,
                errors,
                handleSubmit,
                handleReset,
                handleChange,
              }) => (
                <form className="add-resume-form" onSubmit={handleSubmit}>
                  <div className="add-resume-poup-form">
                    <div className="header">
                      <div>Özgeçmiş oluştur</div>
                      <div onClick={()=>hidePopUp()} style={{cursor:"pointer"}}>
                        <CloseIcon />
                      </div>
                    </div>
                    <div className="content">
                      <label htmlFor="resumeName"></label>
                      <input
                        type="text"
                        id="resumeName"
                        placeholder={values.resumeName}
                        value={values.resumeName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="button-container">
                    <button className="accept" type="submit" onClick={()=>hidePopUp()}>
                      Kaydet
                    </button>
                    <button className="cancel" type="button" onClick={()=>{handleReset();hidePopUp()}}>
                      Vazgeç
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div className="user-resumes-content content">
          {resumes.map((resume) => (
            <div className="short-resume-card" key={resume.id}>
              <Link to={`/resumedetails/${resume.id}`}>
                <div className="first-part">
                  <img src={resume.imagePath} alt="" />
                </div>
              </Link>

              <div className="second-part">
                <Link
                  to={`/resumedetails/${resume.id}`}
                  style={{ width: "73%" }}
                >
                  <span className="header">{resume.resumeName}</span>
                </Link>

                <div className="right-part">
                  <Link to={`/resumedetails/${resume.id}`}>
                    <div className="last-update">
                      <span className="last-update-text">
                        Son güncelleme tarihi :{" "}
                      </span>
                      <span>{resume.lastUpdateDate}</span>
                    </div>
                  </Link>

                  <div className="dropdown-icon">
                    <Dropdown customHtml="<MoreVert/>">
                      <DropdownItem itemName="Düzenle" />
                      <DropdownItem itemName="Sil" />
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cover-letter container">
        <div className="cover-letter-header header">
          <span>Önyazılar</span>
          <button>Yeni önyazı ekle</button>
        </div>
        <div className="cover-letter-content content">
          {coverLetters.map((coverLetter) => (
            <div className="cover-letter-card card" key={coverLetter.id}>
              <div className="first-part">
                <span className="title">{coverLetter.title}</span>
                <span className="text">{coverLetter.text}</span>
              </div>

              <div className="second-part">
                <div className="dropdown-icon">
                  <Dropdown customHtml="<MoreVert/>">
                    <DropdownItem itemName="Düzenle" />
                    <DropdownItem itemName="Sil" />
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
