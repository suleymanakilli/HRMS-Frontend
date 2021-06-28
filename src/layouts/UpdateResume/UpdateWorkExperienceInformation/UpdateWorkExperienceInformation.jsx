

import React, { useState, useEffect, useRef } from "react";
import './UpdateWorkExperienceInformation.css'
import { Formik } from "formik";
import * as Yup from "yup";
import JobTitleService from "../../../services/jobTitleService";
import WorkExperienceService from "../../../services/workExperienceService";
export default function UpdateWorkExperienceInformation(props) {
  const [workExperienceInformation, setworkExperienceInformation] = useState({});
  const [jobTitles, setjobTitles] = useState([]);
  const inputRef=useRef(null)
  useEffect(() => {
    if(props.workExperienceInformation){
      setworkExperienceInformation(props.workExperienceInformation);
    }
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    let jobTitleService = new JobTitleService();
    jobTitleService.getAll().then((result) => setjobTitles(result.data.data));
  }, [props]);

  function handleUpdateWorkExperienceInformation() {
    //setTimeout(() => {
      props.updateWorkExperience();
    //}, 2000);
    
  }

  return workExperienceInformation ||props.workExperienceInformation===undefined||
  ((props.workExperienceInformation!==undefined&&props.workExperienceInformation!==null)?Object.keys(props.workExperienceInformation).length===0:null )? (
    <div className="update-work-experience-information-container">
      <Formik
      enableReinitialize ={true}
        initialValues={{
          jobTitle: {
            id: workExperienceInformation.positionId?workExperienceInformation.positionId:0,
          },
          candidateResume: {
            id: props.resumeId,
          },
          [workExperienceInformation.id?'id':undefined]: workExperienceInformation.id,
          startDate: workExperienceInformation.workExperienceStartDate?workExperienceInformation.workExperienceStartDate:"",
          endDate: workExperienceInformation.workExperienceEndDate?workExperienceInformation.workExperienceEndDate:"",
          workplaceName:workExperienceInformation.workplaceName?workExperienceInformation.workplaceName:""
        }}
        validationSchema={Yup.object({
          jobTitle: Yup.object({
            id: Yup.number().min(1, "Pozisyon alanı boş olamaz"),
          }),
          startDate: Yup.date().required("Başlama tarihi boş olamaz"),
          endDate: Yup.date(),
          workplaceName:Yup.string().required("Firma ismi boş olamaz")
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let workExperienceService=new WorkExperienceService()
          workExperienceService.add(values).then(()=>handleUpdateWorkExperienceInformation())
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
          <form className="update-work-experience-form" onSubmit={handleSubmit}>
            <div className="job-title-workplace-name display-flex">
              <div className="job-title-container container">
                <div className="label">
                  <label htmlFor="jobTitle">Pozisyon</label>
                </div>
                <div className="select">
                  <select
                    id="jobTitle.id"
                    onChange={handleChange}
                    value={values.jobTitle.id}
                    ref={inputRef}
                  >
                    <option value={0} label="Pozisyon seç.." />
                    {jobTitles.map((jobTitle) => (
                      <option
                        value={jobTitle?.id}
                        key={jobTitle?.id}
                        label={jobTitle?.title}
                      />
                    ))}
                  </select>
                  {errors.jobTitle?.id && touched.jobTitle?.id && (
                    <div className="input-feedback">{errors.jobTitle?.id}</div>
                  )}
                </div>
              </div>
              <div className="workplace-name-container container">
                <div className="label">
                  <label htmlFor="workplaceName">Firma ismi</label>
                </div>
                <div className="input">
                <input id="workplaceName"
                        type="text"
                        placeholder="Firma ismi"
                        value={values.workplaceName||""}
                        onChange={handleChange} />
                  {errors.workplaceName && touched.workplaceName && (
                    <div className="input-feedback">{errors.workplaceName}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="date-container display-flex">
              <div className="start-date-container container">
                <div className="label"><label htmlFor="startDate">Başlama tarihi</label></div>
                <div className="input">
                  <input id="startDate"
                        type="date"
                        placeholder="Başlama tarihi"
                        value={props?.workExperienceInformation?.workExperienceStartDate?
                          props.workExperienceInformation.workExperienceStartDate:
                          values.startDate||""}
                        onChange={handleChange} />
                </div>
              </div>
              <div className="end-date-container container">
                <div className="label"><div className="label"><label htmlFor="endDate">Bitiş tarihi</label></div></div>
                <div className="input"><input id="endDate"
                        type="date"
                        placeholder="Bitiş tarihi"
                        value={values.endDate||""}
                        onChange={handleChange} /></div>
              </div>
            </div>

            <div className="button-container">
              <button
                className="accept"
                
                type="submit"
              >
                Kaydet
              </button>
              <button
                className="cancel"
                onClick={()=>{handleReset();handleUpdateWorkExperienceInformation()}}
                type="button"
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
}

