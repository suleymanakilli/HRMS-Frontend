import React, { useState, useEffect } from "react";
import "./UpdateContactInformation.css";
import { Formik } from "formik";
import * as Yup from "yup";
import CandidateService from "../../../services/candidateService";

export default function UpdateContactInformation(props) {
  const [candidateInformations, setcandidateInformations] = useState([]);
  useEffect(() => {
    setcandidateInformations(props.candidateInformations)
    
  }, [props]);

  function handleUpdateContact() {
    document.getElementsByClassName("register-form")[0].reset()
    props.updateCandidate();
  }
  return candidateInformations ? (
    <div className="update-contact-information-container">
      <Formik
      enableReinitialize ={true}
        initialValues={{
          [candidateInformations.candidateId?'id':undefined]: candidateInformations.candidateId,
          firstName: `${candidateInformations.firstName}`,
          lastName: `${candidateInformations.lastName}`,
          email: `${candidateInformations.email}`,
          birthYear: `${candidateInformations.birthYear}`,
          githubLink: candidateInformations.githubLink?`${candidateInformations.githubLink}`:"",
          linkedinLink: candidateInformations.linkedinLink?`${candidateInformations.linkedinLink}`:"",
          personalWebsite: candidateInformations.personalWebsite?`${candidateInformations.personalWebsite}`:"",
          imagePath: candidateInformations.imagePath?`${candidateInformations.imagePath}`:"",
          phoneNumber: candidateInformations.phoneNumber?`${candidateInformations.phoneNumber}`:5,
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email alanını doldurunuz"),
          firstName: Yup.string().required("İsim alanı zorunludur"),
          lastName: Yup.string().required("Soyadınızı giriniz"),
          githubLink: Yup.string(),
          linkedinLink: Yup.string(),
          personalWebSite: Yup.string(),
          imagePath: Yup.string(),
          birthYear: Yup.number()
            .required()
            .min(1950, "Geçerli bir tarih giriniz")
            .max(2005, "Geçerli bir tarih giriniz"),
          phoneNumber: Yup.string(),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          console.log("values",values.id);
          let candidateService=new CandidateService()
          if(values.id){
            candidateService.update(values).then((result)=>console.log("result",result)).catch(error=>console.log("error",error))
          }
          else{
            if(values.phoneNumber.length<1){
              console.log("çalıştı")
              values.phoneNumber=null
            }
            candidateService.update(values).then(()=>handleUpdateContact()).catch(error=>console.log("error",error))
          }
          
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
            <div className="contact-info-content content ">
              <div className="first-part">
                <div className="image">
                  <img
                    src={
                      candidateInformations.imagePath
                        ? `${candidateInformations.imagePath}`
                        : `${window.location.origin}/default-user-image.png`
                    }
                    alt=""
                  />
                </div>
              </div>

              <div className="second-part">
                <div className="name display-flex">
                  <div className="first-name-container container">
                    <div className="first-name-label label">
                      <label htmlFor="firstName">İsim</label>
                    </div>
                    <div className="first-name-input input">
                      <input
                        type="text"
                        id="firstName"
                        placeholder={values.firstName}
                        value={values.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="input-feedback">{errors.firstName}</div>
                      )}
                    </div>
                  </div>
                  <div className="last-name-container container">
                    <div className="last-name-label label">
                      <label htmlFor="lastName">Soyisim</label>
                    </div>
                    <div className="last-name-input input">
                      <input
                        type="text"
                        id="lastName"
                        placeholder={values.lastName}
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="e-mail-birth-year display-flex">
                    <div className="e-mail-container container">
                      <div className="e-mail-label label">
                        <label htmlFor="email">Email</label>
                      </div>
                      <div className="e-mail-input input">
                        <input
                          type="text"
                          id="email"
                          placeholder={values.email}
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="birth-year-container container">
                      <div className="birth-year-label label">
                        <label htmlFor="birthYear">Doğum yılı</label>
                      </div>
                      <div className="birth-year-input input">
                        <input
                          type="number"
                          id="birthYear"
                          placeholder={values.birthYear}
                          value={values.birthYear}
                          onChange={handleChange}
                        />
                        {errors.birthYear && touched.birthYear && (
                          <div className="input-feedback">
                            {errors.birthYear}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="phone-number-personal-web-site display-flex">
                    <div className="phone-number-container container">
                      <div className="phone-number-label label">
                        <label htmlFor="phoneNumber">Telefon numarası</label>
                      </div>
                      <div className="phone-number-input input">
                        <input
                          type="text"
                          id="phoneNumber"
                          placeholder={values.phoneNumber}
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                          <div className="input-feedback">{errors.phoneNumber}</div>
                        )}
                      </div>
                    </div>
                    <div className="personal-website-container container">
                      <div className="personal-website-label label">
                        <label htmlFor="personalWebsite">Kişisel web sitesi</label>
                      </div>
                      <div className="personal-website-input input">
                        <input
                          type="text"
                          id="personalWebsite"
                          placeholder={values.personalWebsite}
                          value={values.personalWebsite}
                          onChange={handleChange}
                        />
                        {errors.personalWebsite && touched.personalWebsite && (
                          <div className="input-feedback">
                            {errors.personalWebsite}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="github-linkedin display-flex">
                    <div className="github-link-container container">
                      <div className="github-link-label label">
                        <label htmlFor="githubLink">Github adresi</label>
                      </div>
                      <div className="github-link-input input">
                        <input
                          type="text"
                          id="githubLink"
                          placeholder={values.githubLink}
                          value={values.githubLink}
                          onChange={handleChange}
                        />
                        {errors.githubLink && touched.githubLink && (
                          <div className="input-feedback">{errors.githubLink}</div>
                        )}
                      </div>
                    </div>
                    <div className="linkedin-link-container container">
                      <div className="linkedin-link-label label">
                        <label htmlFor="linkedinLink">Linkedin adresi</label>
                      </div>
                      <div className="linkedin-link-input input">
                        <input
                          type="text"
                          id="linkedinLink"
                          placeholder={values.linkedinLink}
                          value={values.linkedinLink}
                          onChange={handleChange}
                        />
                        {errors.linkedinLink && touched.linkedinLink && (
                          <div className="input-feedback">
                            {errors.linkedinLink}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
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
                onClick={() => handleUpdateContact()}
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
