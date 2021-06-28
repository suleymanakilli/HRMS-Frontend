import React, { useState, useEffect, useRef } from "react";
import "./UpdateEducationInformation.css";
import { Formik } from "formik";
import * as Yup from "yup";
import SchoolService from "../../../services/schoolService";
import DepartmentService from "../../../services/departmentService";
import EducationInformationService from "../../../services/educationInformationService";
export default function UpdateEducationInformation(props) {
  const [educationInformation, seteducationInformation] = useState({});
  const [schools, setschools] = useState([]);
  const [departments, setdepartments] = useState([]);
  const inputRef=useRef(null)
  console.log(props.educationInformation)
  useEffect(() => {
    if(props.educationInformation){
      seteducationInformation(props.educationInformation);
    }
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    let schoolService = new SchoolService();
    schoolService.getAll().then((result) => setschools(result.data.data));
    let departmentService = new DepartmentService();
    departmentService
      .getAll()
      .then((result) => setdepartments(result.data.data));
      
  }, [props.educationInformation]);

  function handleUpdateEducationInformation() {
    props.updateEducation();
  }

  return educationInformation.educationStartDate || props.educationInformation===undefined||props.educationInformation?.id===undefined ? (
    <div className="update-education-information-container">
      <Formik
        enableReinitialize ={true}
        initialValues={{
          school: {
            id: educationInformation.schoolId?educationInformation.schoolId:0,
          },
          department: {
            id: educationInformation.departmentId?educationInformation.departmentId:0,
          },
          candidateResume: {
            id: props.resumeId,
          },
          [educationInformation.id?'id':undefined]: educationInformation.id,
          startDate: educationInformation.educationStartDate?educationInformation.educationStartDate:"",
          endDate: educationInformation.educationEndDate?educationInformation.educationEndDate:"",
        }}
        
        validationSchema={Yup.object({
          school: Yup.object({
            id: Yup.number().min(1, "Okul alanı boş olamaz"),
          }),
          department: Yup.object({
            id: Yup.number().min(1, "Bölüm alanı boş olamaz"),
          }),
          startDate: Yup.date().required("Başlama tarihi boş olamaz"),
          endDate: Yup.date(),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let educationInformationService=new EducationInformationService()
          educationInformationService.add(values).then(()=>handleUpdateEducationInformation())
          
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
          <form className="update-education-form" id="myform" onSubmit={handleSubmit}>
            <div className="school-department-container display-flex">
              <div className="school-container container">
                <div className="label">
                  <label htmlFor="school">Üniversite</label>
                </div>
                <div className="select">
                  <select
                    id="school.id"
                    onChange={handleChange}
                    value={values.school.id}
                    ref={inputRef}
                  >
                    <option value={0} label="Üniversite seç.." />
                    {schools.map((school) => (
                      <option
                        value={school?.id}
                        key={school?.id}
                        label={school?.schoolName}
                      />
                    ))}
                  </select>
                  {errors.school?.id && touched.school?.id && (
                    <div className="input-feedback">{errors.school?.id}</div>
                  )}
                </div>
              </div>
              <div className="department-container container">
                <div className="label">
                  <label htmlFor="department">Bölüm</label>
                </div>
                <div className="select">
                  <select
                    id="department.id"
                    onChange={handleChange}
                    value={values.department.id}
                  >
                    <option value={0} label="Üniversite seç.." />
                    {departments.map((department) => (
                      <option
                        value={department?.id}
                        key={department?.id}
                        label={department?.departmentName}
                      />
                    ))}
                  </select>
                  {errors.department?.id && touched.department?.id && (
                    <div className="input-feedback">{errors.department?.id}</div>
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
                        value={values.startDate}
                        onChange={handleChange} />
                </div>
              </div>
              <div className="end-date-container container">
                <div className="label"><div className="label"><label htmlFor="endDate">Mezuniyet tarihi</label></div></div>
                <div className="input"><input id="endDate"
                        type="date"
                        placeholder="Mezuniyet tarihi"
                        value={values.endDate}
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
                onClick={() => handleUpdateEducationInformation()}
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
