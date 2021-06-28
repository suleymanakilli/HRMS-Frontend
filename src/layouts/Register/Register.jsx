import React from "react";
import "./Register.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

export default function Register() {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          identityNumber: "",
          birthYear: 0
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email alanını doldurunuz"),
          password: Yup.string().required("Şifre giriniz"),
          firstName: Yup.string().required("İsminizi giriniz"),
          lastName: Yup.string().required("Soyadınızı giriniz"),
          identityNumber: Yup.string().required("TC kimlik numaranızı giriniz"),
          birthYear: Yup.number().required().min(1950, "Geçerli bir tarih giriniz").max(2005, "Geçerli bir tarih giriniz")
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
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
            <Container>
              <Link to={"/home"}>
                <h1 className="to-home">HRMS</h1>
              </Link>
              <h1>İş arayan kayıt ekranı</h1>
              <div className="full-name container">
                <div className="first-name">
                  <div className="label">
                    <label htmlFor="firstName">İsim</label>
                  </div>
                  <div className="input">
                    <input
                      id="firstName"
                      type="text"
                      placeholder="İsim"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="input-feedback">{errors.firstName}</div>
                    )}
                  </div>
                </div>
                <div className="last-name">
                  <div className="label">
                    <label htmlFor="lastName">Soyisim</label>
                  </div>
                  <div className="input">
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Soyisim"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="input-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="identity-number container">
                <div className="label">
                  <label htmlFor="identityNumber">Tc Kimlik Numarası</label>
                </div>
                <div className="input">
                  <input
                    id="identityNumber"
                    type="text"
                    placeholder="Tc kimlik numarası"
                    value={values.identityNumber}
                    onChange={handleChange}
                  />
                  {errors.identityNumber && touched.identityNumber && (
                    <div className="input-feedback">
                      {errors.identityNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="birth-year container">
                <div className="label">
                  <label htmlFor="birthYear">Doğum yılı</label>
                </div>
                <div className="input">
                  <input
                    id="birthYear"
                    type="number"
                    placeholder="Doğum yılı"
                    value={values.birthYear}
                    onChange={handleChange}
                  />
                  {errors.birthYear && touched.birthYear && (
                    <div className="input-feedback">{errors.birthYear}</div>
                  )}
                </div>
              </div>
              <div className="email container">
                <div className="label">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input">
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="password container">
                <div className="label">
                  <label htmlFor="password">Şifre</label>
                </div>
                <div className="input">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="submit-btn">
                <button type="submit">Giriş yap</button>
              </div>
              <div className="route-to-employer-register form-route">
                <Link to="/registerforemployers">İş veren misiniz ?</Link>
              </div>
              <div className="route-to-employer-register form-route">
                <Link to="/login">Zaten üye misiniz ?</Link>
              </div>
            </Container>
          </form>
        )}
      </Formik>
    </div>
  );
}
