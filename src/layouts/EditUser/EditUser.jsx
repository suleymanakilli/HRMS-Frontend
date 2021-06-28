import React, { useState, useEffect } from "react";
import CandidateService from "../../services/candidateService";
import "./EditUser.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateUserInfos } from "../../store/actions/updateUserActions";
import { useSelector } from "react-redux";
import EmployeeService from "../../services/employeeService";
import EmployerService from "../../services/employerService";
import alertify from "alertifyjs";

export default function EditUser() {
  const [userRole] = useState(() => localStorage.getItem("role"));

  return (
    <div>
      {userRole === "candidate" ? <EditCandidate /> : null}
      {userRole === "admin" ? <EditEmployee /> : null}
      {userRole === "employer" ? <EditEmployer /> : null}
    </div>
  );
}

function EditCandidate() {
  const userInfos = useSelector((state) => state.user);
  const [userInformations, setuserInformations] = useState({});
  console.log(userInfos);
  const dispatch = useDispatch();
  useEffect(() => {
    let candidateService = new CandidateService();
    if (userInfos?.userInfos?.id) {
      candidateService
        .getById(userInfos.userInfos.id)
        .then((result) => setuserInformations(result.data.data));
    }
  }, [userInfos]);
  function handleUpdateUserInformations(userInformations) {
    dispatch(updateUserInfos(JSON.parse(userInformations.config.data)));
  }
  return userInformations.firstName !== null ? (
    <div className="edit-candidate edit">
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: userInformations.id || 0,
          firstName: userInformations.firstName || "",
          lastName: userInformations.lastName || "",
          email: userInformations.email || "",
          birthYear: userInformations.birthYear || 0,
          githubLink: userInformations.githubLink || "",
          linkedinLink: userInformations.linkedinLink || "",
          personalWebsite: userInformations.personalWebsite || "",
          imagePath: userInformations.imagePath || "",
          phoneNumber: userInformations.phoneNumber || "",
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
          let candidateService = new CandidateService();

          candidateService
            .update(values)
            .then((result) => handleUpdateUserInformations(result))
            .catch((error) => console.log("error", error));
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
          <form
            className="edit-user-candidate-form edit-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-info-content content ">
              <div className="first-part">
                <div className="image">
                  <img
                    src={
                      userInformations.imagePath
                        ? `${userInformations.imagePath}`
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
                          <div className="input-feedback">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="personal-website-container container">
                      <div className="personal-website-label label">
                        <label htmlFor="personalWebsite">
                          Kişisel web sitesi
                        </label>
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
                          <div className="input-feedback">
                            {errors.githubLink}
                          </div>
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
              <button className="accept" type="submit">
                Kaydet
              </button>
              <button className="cancel" type="reset">
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
}
function EditEmployee() {
  const userInfos = useSelector((state) => state.user);
  const [userInformations, setuserInformations] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    let employeeService = new EmployeeService();
    if (userInfos?.userInfos?.id) {
      employeeService
        .getById(userInfos.userInfos.id)
        .then((result) => setuserInformations(result.data.data));
    }
  }, [userInfos]);
  function handleUpdateUserInformations(userInformations) {
    dispatch(updateUserInfos(JSON.parse(userInformations.config.data)));
  }
  return userInformations.email !== null ? (
    <div className="edit-employee edit">
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: userInformations.id || 0,
          firstName: userInformations.firstName || "",
          lastName: userInformations.lastName || "",
          email: userInformations.email || "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email alanını doldurunuz"),
          firstName: Yup.string().required("İsim alanı zorunludur"),
          lastName: Yup.string().required("Soyadınızı giriniz"),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let employeeService = new EmployeeService();

          employeeService
            .update(values)
            .then((result) => handleUpdateUserInformations(result))
            .catch((error) => console.log("error", error));
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
          <form
            className="edit-user-employee-form edit-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-info-content content ">
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
              </div>
            </div>
            <div className="button-container">
              <button className="accept" type="submit">
                Kaydet
              </button>
              <button className="cancel" type="reset">
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
}
function EditEmployer() {
  const userInfos = useSelector((state) => state.user);
  const [userInformations, setuserInformations] = useState({});
  useEffect(() => {
    let employerService = new EmployerService();
    if (userInfos?.userInfos?.id) {
      employerService
        .getById(userInfos.userInfos.id)
        .then((result) => setuserInformations(result.data.data));
    }
  }, [userInfos,userInformations.updated]);
  function handleSubmit(values){
    let employerService = new EmployerService();
    employerService
      .update(values)
      .then((result) => alertify.success(result.data.message))
      .catch((error) => console.log("error", error));
      setuserInformations(userInformations.updated=false)
  }
  return userInformations.email !== null ? (
    <div className="edit-employer edit">
      {userInformations.updated===false?<span>Personel onayı bekleniyor</span>:null}
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: userInformations.id || 0,
          companyName: userInformations.companyName || "",
          webAddress: userInformations.webAddress || "",
          email: userInformations.email || "",
          phoneNumber: userInformations.phoneNumber || "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email alanını doldurunuz"),
          companyName: Yup.string().required("Şirket ismi alanı zorunludur"),
          webAddress: Yup.string().required("Web adresi girmek zorunludur"),
          phoneNumber: Yup.string().required("Telefon alanı zorunludur"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values)
          
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
          <form
            className="edit-user-candidate-form edit-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-info-content content ">
              <div className="second-part">
                <div className="name display-flex">
                  <div className="company-name-container container">
                    <div className="company-name-label label">
                      <label htmlFor="companyName">Şirket ismi</label>
                    </div>
                    <div className="company-name-input input">
                      <input
                        type="text"
                        id="companyName"
                        placeholder={values.companyName}
                        value={values.companyName}
                        onChange={handleChange}
                      />
                      {errors.companyName && touched.companyName && (
                        <div className="input-feedback">
                          {errors.companyName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="web-address-container container">
                    <div className="web-address-label label">
                      <label htmlFor="webAddress">Web adresi</label>
                    </div>
                    <div className="web-address-input input">
                      <input
                        type="text"
                        id="webAddress"
                        placeholder={values.webAddress}
                        value={values.webAddress}
                        onChange={handleChange}
                      />
                      {errors.webAddress && touched.webAddress && (
                        <div className="input-feedback">
                          {errors.webAddress}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
            <div className="button-container">
              <button className="accept" type="submit">
                Kaydet
              </button>
              <button className="cancel" type="reset">
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
}
