import React, { useEffect, useState } from "react";
import ResumeService from "../../services/resumeService";
import "./ResumeDetails.css";
import UpdateContactInformation from "../UpdateResume/UpdateContactInformation/UpdateContactInformation";
import UpdateSummaryInformation from "../UpdateResume/UpdateSummaryInformation/UpdateSummaryInformation";
import UpdateEducationInformation from "../UpdateResume/UpdateEducationInformation/UpdateEducationInformation";
import UpdateWorkExperienceInformation from "../UpdateResume/UpdateWorkExperienceInformation/UpdateWorkExperienceInformation";
import UpdateLanguageInformation from "../UpdateResume/UpdateLanguageInformation/UpdateLanguageInformation";
import UpdateSkillInformation from "../UpdateResume/UpdateSkillInformation/UpdateSkillInformation";
import Add from "@material-ui/icons/Add";
import StarBorder from "@material-ui/icons/StarBorder";
import WorkOutline from "@material-ui/icons/WorkOutline";
import LanguageIcon from "@material-ui/icons/Language";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
//import {Link} from 'react-router-dom'

export default function ResumeDetails(props) {
  const [resumeDetails, setResumeDetails] = useState({});
  const [educationInformation, seteducationInformation] = useState({});
  const [workExperienceInformation, setworkExperienceInformation] = useState({});
  const [isSkillButtonClicked, setisSkillButtonClicked] = useState(false)
  const [isWorkExperienceButtonClicked, setisWorkExperienceButtonClicked] = useState(false)
  const [isEducatioInformationButtonClicked, setisEducatioInformationButtonClicked] = useState(false)
  const [isLanguageInformationButtonClicked, setisLanguageInformationButtonClicked] = useState(false)
  const [isSummaryInformationButtonClicked, setisSummaryInformationButtonClicked] = useState(false)
  const [number, setnumber] = useState(0)
  const [skills, setskills] = useState("");
  const [languageInformation, setlanguageInformation] = useState({});
  console.log(resumeDetails)
  useEffect(() => {
    let resumeService = new ResumeService();
    let isMounted = true;
    if (isMounted) {
      resumeService
        .getResumeDetailsByResumeId(props.match.params.id)
        .then((result) => setResumeDetails(result.data.data));
    }
    return () => {
      isMounted = false;
    };
  }, [props.match.params.id,number,educationInformation]);

  function difference(date1, date2) {  
    date1=new Date(date1)
    if(date2){
      date2=new Date(date2)
    }
    else{
      date2=new Date()
    }
    
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      let day = 1000*60*60*24;
    let subtractedDate=(date2utc - date1utc)/day
    let year,month;
    if(subtractedDate>365){
      year=Math.floor(subtractedDate/365)
      subtractedDate=subtractedDate%365
    }
    if(subtractedDate>30){
      month=Math.floor(subtractedDate/30)
      subtractedDate=subtractedDate%30
    }

    if(year&&month){
      return `${year} yıl ${month} ay`
    }
    else if(month){
      return `${month} ay`
    }
    else{
      return `${subtractedDate} gün`
    }
  }
  function makeStars(level) {
    let content = [];
    for (let i = 0; i < level; i++) {
      content.push(
        <img src={`${window.location.origin}/star-active.png`} alt="" key={i} />
      );
    }
    for (let j = 0; j < 5 - level; j++) {
      content.push(
        <img
          src={`${window.location.origin}/star-inactive.png`}
          alt=""
          key={5 - j}
        />
      );
    }
    return content;
  }
  function showUpdateContactInformation() {
    let elemToHide = document.getElementsByClassName("contact-info-content")[0];
    let elemToShow = document.getElementsByClassName(
      "update-contact-information"
    )[0];
    elemToShow.style.display = "block";
    elemToHide.style.display = "none";
  }
  function handleUpdateContactInformation() {
    setnumber(number+1)
    let elemToHide = document.getElementsByClassName(
      "update-contact-information"
    )[0];
    let elemToShow = document.getElementsByClassName("contact-info-content")[0];
    elemToShow.style.display = "flex";
    elemToHide.style.display = "none";
  }
  function showUpdateSummaryInformation() {
    setisSummaryInformationButtonClicked(true)
    setTimeout(() => {
      let elemToHide = document.getElementsByClassName("summary-content")[0];
    let elemToShow = document.getElementsByClassName(
      "update-summary-information"
    )[0];
    elemToShow.style.display = "flex";
    elemToHide.style.display = "none";
    }, 0);
    
  }
  function handleUpdateSummaryInformation() {
      setnumber(number+1)
      setisSummaryInformationButtonClicked(false)
    let elemToHide = document.getElementsByClassName(
      "update-summary-information"
    )[0];
    let elemToShow = document.getElementsByClassName("summary-content")[0];
    if(elemToShow&&elemToHide){
      elemToShow.style.display = "flex";
      elemToHide.style.display = "none";
    }
    
  }
  function showUpdateEducationInformation(educationInformation) {
    if(educationInformation){
      seteducationInformation(educationInformation);
    }
    else{
      let educationInformation={departmentId:0,educationEndDate: "",educationStartDate: "",schoolId: "",id:undefined}
      seteducationInformation(educationInformation);
    }

    setisEducatioInformationButtonClicked(true)
    
    console.log(educationInformation)
    setTimeout(() => {
      let elemToHide = document.getElementById(
        `education-information-content-container`
      );
      let elemToShow = document.getElementsByClassName(
        "update-education-information"
      )[0];
      if (elemToHide !== null && elemToShow !== undefined) {
        elemToShow.style.display = "flex";
        
        elemToHide.style.display = "none";
        console.log(educationInformation)
      }
    }, 0);
    
  }
  function handleUpdateEducationInformation() {
    seteducationInformation(null)
      setnumber(number+1)
      setisEducatioInformationButtonClicked(false)
    let elemToHide = document.getElementsByClassName(
      "update-education-information"
    )[0];
    let elemToShow = document.getElementById(
      `education-information-content-container`
    );
    if(elemToShow&&elemToHide){
      elemToShow.style.flexDirection = "column";
    elemToShow.style.display = "flex";
    elemToHide.style.display = "none";
    }
    
  }

  function showUpdateWorkExperienceInformation(workExperienceInformation) {
    if(workExperienceInformation){
      setworkExperienceInformation(workExperienceInformation);
    }
    else{
      let workExperienceInformation={positionId:0,workExperienceEndDate: "",workExperienceStartDate: "",workplaceName: "",id:undefined}
      setworkExperienceInformation(workExperienceInformation);
    }
    
    setisWorkExperienceButtonClicked(true)
    setTimeout(() => {
      let elemToHide = document.getElementById(
        `work-experience-content-container`
      );
      let elemToShow = document.getElementsByClassName(
        "update-work-experience-information"
      )[0];
      if (elemToHide !== null && elemToShow !== undefined) {
        elemToShow.style.display = "flex";
        elemToHide.style.display = "none";
        
      }
    }, 0);
    
  }
  function handleUpdateWorkExperienceInformation() {
    setworkExperienceInformation(null)
      setisWorkExperienceButtonClicked(false)
      setnumber(number+1)
    let elemToHide = document.getElementsByClassName(
      "update-work-experience-information"
    )[0];
    let elemToShow = document.getElementById(
      `work-experience-content-container`
    );
    if(elemToShow&&elemToHide){
      elemToShow.style.display = "flex";
    elemToShow.style.flexDirection = "column";
    elemToHide.style.display = "none";
    }
    
  }
  function showUpdateLanguageInformation(languageInformation) {
    if(languageInformation){
      setlanguageInformation(languageInformation);
    }
    else{
      let languageInformation={level: 0,languageName: "",id:undefined}
      setlanguageInformation(languageInformation);
    }
    setisLanguageInformationButtonClicked(true)
    setTimeout(() => {
      let elemToHide = document.getElementById(`languages-content-container`);
    let elemToShow = document.getElementsByClassName(
      "update-language-information"
    )[0];
    if (elemToHide !== null && elemToShow !== undefined) {
      elemToShow.style.display = "flex";
      elemToHide.style.display = "none";
      //setlanguageInformation(languageInformation);
    }
    }, 0);
    
  }
  function handleUpdateLanguageInformation() {
      setnumber(number+1)
      setisLanguageInformationButtonClicked(false)
      setlanguageInformation(null)
    let elemToHide = document.getElementsByClassName(
      "update-language-information"
    )[0];
    let elemToShow = document.getElementById(`languages-content-container`);
    if(elemToShow&&elemToHide){
      elemToShow.style.flexDirection = "column";
    elemToShow.style.display = "flex";
    elemToHide.style.display = "none";
    }
    
  }
  function showUpdateSkillInformation() {
      setisSkillButtonClicked(true)
    
    setTimeout(() => {
      let elemToHide = document.getElementById(`skills-content-container`);
    let elemToShow = document.getElementsByClassName(
      "update-skill-information"
    )[0];
    if (elemToHide !== null && elemToShow !== undefined) {
      elemToShow.style.display = "flex";
      elemToHide.style.display = "none";
      let skillText = "";
      resumeDetails.skills?.map(
        (skill) => (skillText += `${skill.skillName} `)
      );
      setskills(skillText);
    }
    }, 0);
    
  }
  function handleUpdateSkillInformation() {
    
      setnumber(number+1)
      setisSkillButtonClicked(false)
    
    let elemToHide = document.getElementsByClassName(
      "update-skill-information"
    )[0];
    let elemToShow = document.getElementById(`skills-content-container`);
    if(elemToShow&&elemToHide){
      elemToShow.style.display = "flex";
    elemToHide.style.display = "none";
    }
    
  }

  return (
    <div>
      <div className="resume-detail-for-user-container">
        <div className="side-bar">
          <div className="fields-on-resume">
            <div className="header">Özgeçmişimdeki alanlar</div>
            {resumeDetails.educationInformations !== null ? (
              <div className="education-information item">
                <SchoolOutlinedIcon style={{ color: "#929292" }} />
                <span className="text">Eğitim bilgileri</span>
              </div>
            ) : null}

            {resumeDetails.skills !== null ? (
              <div className="skill-information item">
                <StarBorder style={{ color: "#929292" }} />
                <span className="text">Yetenekler</span>
              </div>
            ) : null}

            {resumeDetails.workExperiences !== null ? (
              <div className="work-experience-information item">
                <WorkOutline style={{ color: "#929292" }} />
                <span className="text">İş deneyimleri</span>
              </div>
            ) : null}

            {resumeDetails.languages !== null ? (
              <div className="language-information item">
                <LanguageIcon style={{ color: "#929292" }} />
                <span className="text">Yabancı dil</span>
              </div>
            ) : null}

            {resumeDetails.summaryInformation !== null ? (
              <div className="summary-information item">
                <EventNoteIcon style={{ color: "#929292" }} />
                <span className="text">Özet bilgi</span>
              </div>
            ) : null}
          </div>
          <div className="fields-can-be-added">
            <div className="header">Ekleyebileceğim alanlar</div>

            {resumeDetails.educationInformations === null ? (
              <div className="education-information item" onClick={() => showUpdateEducationInformation()}>
                <Add style={{ color: "#929292" }} />
                <span className="text">Eğitim bilgileri</span>
              </div>
            ) : null}

            {resumeDetails.skills === null ? (
              <div className="skill-information item" onClick={() => showUpdateSkillInformation()}>
                <Add style={{ color: "#929292" }} />
                <span className="text">Yetenekler</span>
              </div>
            ) : null}

            {resumeDetails.workExperiences === null ? (
              <div className="work-experience-information item" onClick={() => showUpdateWorkExperienceInformation()}>
                <Add style={{ color: "#929292" }} />
                <span className="text">İş deneyimleri</span>
              </div>
            ) : null}

            {resumeDetails.languages === null ? (
              <div className="language-information item" onClick={() => showUpdateLanguageInformation()}>
                <Add style={{ color: "#929292" }} />
                <span className="text">Yabancı dil</span>
              </div>
            ) : null}

            {resumeDetails.summaryInformation === null ? (
              <div className="summary-information item" onClick={() => showUpdateSummaryInformation()}>
                <Add style={{ color: "#929292" }} />
                <span className="text">Özet bilgi</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="resume-content">
          <h1>{`${resumeDetails.candidateDto?.firstName} ${resumeDetails.candidateDto?.lastName} kullanıcısının CV bilgileri`}</h1>
          <div className="contact-information-container container contact-work-education">
            <div className="contact-information resume-item">
              <div className="contact-header header">
                <span>İletişim bilgileri</span>
              </div>
              <div
                className="contact-info-content content hover"
                onClick={() => showUpdateContactInformation()}
              >
                <div className="first-part">
                  <div className="image">
                    <img
                      src={
                        resumeDetails.candidateDto?.imagePath
                          ? `${resumeDetails.candidateDto.imagePath}`
                          : `${window.location.origin}/default-user-image.png`
                      }
                      alt=""
                    />
                  </div>
                </div>

                <div className="second-part">
                  <div className="name">
                    <span>{`${resumeDetails.candidateDto?.firstName} ${resumeDetails.candidateDto?.lastName}`}</span>
                  </div>
                  <div className="other-infos infos">
                    <div className="e-mail-info info-item">
                      <span className="e-mail-placeholder placeholder">
                        Email
                      </span>
                      <span className="e-mail info">
                        {resumeDetails.candidateDto?.email}
                      </span>
                    </div>
                    <div className="birth-year-info info-item">
                      <span className="birth-year-placeholder placeholder">
                        Doğum yılı
                      </span>
                      <span className="birth-year info">
                        {resumeDetails.candidateDto?.birthYear}
                      </span>
                    </div>
                    {resumeDetails.candidateDto?.phoneNumber ? (
                      <div className="phone-number-info info-item">
                        <span className="phone-number-placeholder placeholder">
                          Telefon
                        </span>
                        <span className="phone-number info">
                          {resumeDetails.candidateDto?.phoneNumber}
                        </span>
                      </div>
                    ) : null}
                    {resumeDetails.candidateDto?.githubLink ? (
                      <div className="github-link-info info-item">
                        <span className="github-link-placeholder placeholder">
                          Github linki
                        </span>
                        <span className="github-link info">
                          
                            <span>{resumeDetails.candidateDto?.githubLink}</span>
                            
                        </span>
                      </div>
                    ) : null}
                    {resumeDetails.candidateDto?.linkedinLink ? (
                      <div className="linkedin-link-info info-item">
                        <span className="linkedin-link-placeholder placeholder">
                          Linkedin linki
                        </span>
                        <span className="linkedin-link info">
                            <span>{resumeDetails.candidateDto?.linkedinLink}</span>
                            
                        </span>
                      </div>
                    ) : null}
                    {resumeDetails.candidateDto?.personalWebsite ? (
                      <div className="personal-web-site-link-info info-item">
                        <span className="personal-website-link-placeholder placeholder">
                          Kişisel web sitesi
                        </span>
                        <span className="personal-website-link info">

                            <span>{resumeDetails.candidateDto?.personalWebsite}</span>
                            
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="edit-icon-candidate-info edit-icon">
                  <CreateOutlinedIcon />
                </div>
              </div>
              <div
                style={{ display: "none" }}
                className="update-contact-information"
              >
                <UpdateContactInformation
                  candidateInformations={resumeDetails.candidateDto}
                  updateCandidate={handleUpdateContactInformation}
                />
              </div>
            </div>
          </div>
          {resumeDetails.summaryInformation || isSummaryInformationButtonClicked ? (
            <div className="summary-information-container container ">
              <div className="summary-information resume-item">
                <div className="summary-header header">
                  <span>Özet bilgi</span>
                </div>
                <div className="summary-content content hover">
                {!isSummaryInformationButtonClicked?<div
                  
                  style={{ display: "flex", justifyContent: "space-between", width:"-webkit-fill-available" }}
                  onClick={() => showUpdateSummaryInformation()}
                >
                  <span style={{ marginRight: "30px" }}>
                    {resumeDetails.summaryInformation}
                  </span>
                  <div className="edit-icon-summary-info edit-icon">
                    <CreateOutlinedIcon />
                  </div>
                </div>:null}
                </div >
                
                
              </div>
              <div
                style={{ display: "none" }}
                className="update-summary-information"
              >
                <UpdateSummaryInformation
                  candidateId={resumeDetails.candidateDto.candidateId}
                  resumeId={resumeDetails.resumeId}
                  summaryInformation={resumeDetails.summaryInformation}
                  updateSummary={handleUpdateSummaryInformation}
                />
              </div>
            </div>
          ) : null}

          {resumeDetails.workExperiences || isWorkExperienceButtonClicked ? (
            <div className="work-experience-container container contact-work-education">
              <div className="work-experience resume-item">
                <div className="work-experience-header header">
                  <span>İş deneyimleri</span>
                  <button style={{ marginLeft: "30px" }} onClick={() =>
                        showUpdateWorkExperienceInformation()
                      }>
                    Yeni iş deneyimi ekle
                  </button>
                </div>
                <div id="work-experience-content-container">
                {!isWorkExperienceButtonClicked?<div >
                  {resumeDetails.workExperiences.map((workExperience) => (
                    <div
                      className="work-experience-content content hover"
                      id={`work-experience-information-content-${workExperience.id}`}
                      key={workExperience.id}
                      onClick={() =>
                        showUpdateWorkExperienceInformation(workExperience)
                      }
                    >
                      <div className="first-part">
                        <div className="image">
                          <img
                            src={`${window.location.origin}/business-place.svg`}
                            alt=""
                          />
                          {workExperience.workExperienceEndDate ?
                          <div style={{textAlign:"center"}} title="Deneyim süresi">
                            {difference(workExperience.workExperienceStartDate,workExperience.workExperienceEndDate)}
                            </div>
                          :<div>{difference(workExperience.workExperienceStartDate,workExperience.workExperienceEndDate)} (Devam ediyor)</div>}
                          
                        </div>
                      </div>
                      <div className="second-part">
                        <div className="infos">
                          <div className="company-info info-item">
                            <span className="company-placeholder placeholder">
                              Firma adı
                            </span>
                            <span className="company info">
                              {workExperience.workplaceName}
                            </span>
                          </div>
                          <div className="position-info info-item">
                            <span className="position-placeholder placeholder">
                              Pozisyon
                            </span>
                            <span className="position info">
                              {workExperience.position}
                            </span>
                          </div>
                          <div className="start-date-info info-item">
                            <span className="start-date-placeholder placeholder">
                              Başlama tarihi
                            </span>
                            <span className="start-date info">
                              {workExperience.workExperienceStartDate}
                            </span>
                          </div>
                          {workExperience.workExperienceEndDate ? (
                            <div className="end-date-info info-item">
                              <span className="end-date-placeholder placeholder">
                                Bitiş tarihi
                              </span>
                              <span className="end-date info">
                                {workExperience.workExperienceEndDate}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <div className="edit-icon-work-experience-info edit-icon">
                          <CreateOutlinedIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>:null}
                </div >
                
                
                <div
                  style={{ display: "none" }}
                  className="update-work-experience-information"
                >
                  <UpdateWorkExperienceInformation
                    workExperienceInformation={workExperienceInformation}
                    resumeId={resumeDetails.resumeId}
                    updateWorkExperience={handleUpdateWorkExperienceInformation}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {resumeDetails.educationInformations || isEducatioInformationButtonClicked ? (
            <div className="education-information-container container contact-work-education">
              <div className="education-information resume-item">
                <div className="education-information-header header">
                  <span>Eğitim bilgileri</span>
                  <button style={{ marginLeft: "30px" }} onClick={() =>
                          showUpdateEducationInformation()
                        }>
                    Yeni eğitim bilgisi ekle
                  </button>
                </div>
                <div id="education-information-content-container">
                {!isEducatioInformationButtonClicked?<div >
                  {resumeDetails.educationInformations.map(
                    (educationInformation) => (
                      <div
                        className="education-information-content content hover"
                        id={`education-information-content-${educationInformation.id}`}
                        key={educationInformation.id}
                        onClick={() =>
                          showUpdateEducationInformation(educationInformation)
                        }
                      >
                        <div className="first-part">
                          <div className="image">
                            <img
                              src={`${window.location.origin}/school_default.svg`}
                              alt=""
                            />
                            {!educationInformation.educationEndDate?<div style={{textAlign:"center"}}>Devam ediyor</div>:null}
                            
                          </div>
                        </div>
                        <div className="second-part">
                          <div className="infos">
                            <div className="college-info info-item">
                              <span className="college-info-placeholder placeholder">
                                Üniversite adı
                              </span>
                              <span className="college-info info">
                                {educationInformation.schoolName}
                              </span>
                            </div>
                            <div className="department-info info-item">
                              <span className="department-placeholder placeholder">
                                Bölüm
                              </span>
                              <span className="department info">
                                {educationInformation.departmentName}
                              </span>
                            </div>
                            <div className="start-date-info info-item">
                              <span className="start-date-placeholder placeholder">
                                Başlama tarihi
                              </span>
                              <span className="start-date info">
                                {educationInformation.educationStartDate}
                              </span>
                            </div>
                            {educationInformation.educationEndDate ? (
                              <div className="end-date-info info-item">
                                <span className="end-date-placeholder placeholder">
                                  Mezuniyet tarihi
                                </span>
                                <span className="end-date info">
                                  {educationInformation.educationEndDate}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="edit-icon-education-info edit-icon">
                          <CreateOutlinedIcon />
                        </div>
                      </div>
                    )
                  )}
                </div>:null}
                </div >
                
                
              </div>
              <div
                style={{ display: "none" }}
                className="update-education-information"
              >
                <UpdateEducationInformation
                  educationInformation={educationInformation}
                  resumeId={resumeDetails.resumeId}
                  updateEducation={handleUpdateEducationInformation}
                />
              </div>
            </div>
          ) : null}

          {resumeDetails.languages ||isLanguageInformationButtonClicked ? (
            <div className="languages-container container">
              <div className="languages resume-item">
                <div className="languages-header header">
                  <span>Yabancı dil</span>
                  <button style={{ marginLeft: "30px" }} onClick={() => showUpdateLanguageInformation()}>
                    Yeni dil bilgisi ekle
                  </button>
                </div>
                <div
                  className="languages-content-container"
                  id="languages-content-container"
                >
                  <div className="language-content-headers">
                    <span className="language">Dil</span>
                    <span className="level">Seviye</span>
                  </div>
                  {!isLanguageInformationButtonClicked?<div>
                    {resumeDetails.languages.map((language) => (
                      <div
                        className="languages-content content hover"
                        key={language.id}
                        onClick={() => showUpdateLanguageInformation(language)}
                      >
                        <span className="content-language">
                          {language.languageName}
                        </span>
                        <div className="stars">
                          {makeStars(`${language.level}`)}
                        </div>
                      </div>
                    ))}
                  </div>:null}
                  
                </div>
              </div>
              <div
                style={{ display: "none" }}
                className="update-language-information"
              >
                <UpdateLanguageInformation
                  languageInformation={languageInformation}
                  resumeId={resumeDetails.resumeId}
                  updateLanguage={handleUpdateLanguageInformation}
                />
              </div>
            </div>
          ) : null}

          {resumeDetails.skills || isSkillButtonClicked ? (
            <div className="skills-container container ">
              <div className="skills resume-item">
                <div className="skills-header header">
                  <span>Yetenekler</span>
                </div>
                <div
                  className="hover skills-content-containerr"
                  id="skills-content-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                  onClick={() => showUpdateSkillInformation()}
                >
                  {!isSkillButtonClicked?<div className="skills-content-container">
                    {resumeDetails.skills.map((skill) => (
                      <div className="skills-content content" key={skill.id}>
                        <span>{skill.skillName}</span>
                      </div>
                    ))}
                  </div>:null}
                  
                  <div className="edit-icon-skill-info edit-icon">
                    <CreateOutlinedIcon />
                  </div>
                </div>
              </div>
              <div
                style={{ display: "none" }}
                className="update-skill-information"
              >
                <UpdateSkillInformation
                  skillInformation={resumeDetails.skills}
                  skills={skills}
                  resumeId={resumeDetails.resumeId}
                  updateSkill={handleUpdateSkillInformation}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
