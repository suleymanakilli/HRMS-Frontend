import React,{useEffect, useRef} from "react";
import "./UpdateSummaryInformation.css";
import { Formik } from "formik";
import * as Yup from "yup";
import ResumeService from "../../../services/resumeService";
export default function UpdateSummaryInformation(props) {
  const inputRef=useRef(null)
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [])
  function handleUpdateSummary() {
    props.updateSummary();
  }
  return (
    <div className="update-summary-information-container">
      <Formik
      enableReinitialize ={true}
        initialValues={{
          candidate: {
            id: props.candidateId,
          },
          id:props.resumeId,
            summaryInformation: props.summaryInformation?props.summaryInformation:"",
        }}
        validationSchema={Yup.object({
            summaryInformation: Yup.string().required("Bu alan boş olamaz"),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let resumeService=new ResumeService()
          resumeService.add(values).then(()=>handleUpdateSummary())
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
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="text-container container">
              <div className="text-input input">
                <textarea
                  type="text"
                  id="summaryInformation"
                  style={{height:"10vw",width:"50vw"}}
                  placeholder={values.summaryInformation}
                  value={values.summaryInformation}
                  onChange={handleChange}
                  ref={inputRef}
                />
                {errors.summaryInformation && touched.summaryInformation && (
                  <div className="input-feedback">{errors.summaryInformation}</div>
                )}
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
                onClick={() => handleUpdateSummary()}
                type="button"
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
