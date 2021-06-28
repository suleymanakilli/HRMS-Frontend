import React from "react";
import "./RegisterForEmployers.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
export default function RegisterForEmployers() {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          companyName: "",
          webAddress: "",
          phoneNumber: 0,
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email alanını doldurunuz"),
          password: Yup.string().required("Şifre giriniz"),
          companyName: Yup.string().required("Şirket isminizi giriniz"),
          webAddress: Yup.string().required("Web adresinizi giriniz"),
          phoneNumber: Yup.number().required("Telefon numaranızı giriniz").min(6,"Geçersiz telefon numarası").max(10,"Başına 0 koymadan deneyiniz")
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
              <h1>İş veren kayıt ekranı</h1>

              <div className="company-name container">
                <div className="label">
                  <label htmlFor="company-name">Şirket ismi</label>
                </div>
                <div className="input">
                  <input
                    id="company-name"
                    type="text"
                    placeholder="Şirket ismi"
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

              <div className="web-address container">
                <div className="label">
                  <label htmlFor="web-address">Web adresi</label>
                </div>
                <div className="input">
                  <input
                    id="web-address"
                    type="text"
                    placeholder="Web adresi"
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
              <div className="phone-number container">
                <div className="label">
                  <label htmlFor="phone-number">Telefon numarası</label>
                </div>
                <div className="input">
                  <input
                    id="phone-number"
                    type="number"
                    placeholder="Telefon numarası"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="input-feedback">{errors.phoneNumber}</div>
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
                <Link to="/register">İş arayan mısınız ?</Link>
              </div>
              <div className="route-to-login form-route">
                <Link to="/login">Zaten üye misiniz ?</Link>
              </div>
            </Container>
          </form>
        )}
      </Formik>
    </div>
  );
}
