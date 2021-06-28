import React from "react";
import "./Login.css";
import { Redirect, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/authService";
import alertify from "alertifyjs";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserInfos } from "../../store/actions/updateUserActions";

export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch()
  function handleUpdateUserInformations(userInformations){
    dispatch(updateUserInfos(userInformations))
  }
  function handleResult(result) {
    console.log(result);
    localStorage.setItem("token", result.data[0]);
    localStorage.setItem("role",result.data[1].userOperationClaims[0].operationClaim.name);
    /*localStorage.setItem("userId", result.data[1].id);
    localStorage.setItem("companyName", result.data[1].companyName);
    localStorage.setItem("firstName", result.data[1].firstName);
    localStorage.setItem("lastName", result.data[1].lastName);
    localStorage.setItem("imagePath", result.data[1].imagePath);*/
    handleUpdateUserInformations(result.data[1])
    history.push("/home");
    //window.location.reload();
  }
  function handleErrorResult(errorResult) {
    console.log(errorResult);
    alertify.error("Bilgiler geçersiz.");
  }
  if (localStorage.getItem("token")) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().required("Email alanını doldurunuz"),
            password: Yup.string().required("Şifre giriniz"),
          })}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            let authService = new AuthService();
            authService
              .login(values)
              .then((response) => handleResult(response))
              .catch((error) => handleErrorResult(error));
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
            <form className="login-form" onSubmit={handleSubmit}>
              <Container>
                <Link to={"/home"}>
                  <h1 className="to-home">HRMS</h1>
                </Link>
                <h1>Giriş yap</h1>
                <div className="email-container container">
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
                  </div>
                </div>
                <div className="password-container container">
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
                  </div>
                </div>

                <div className="submit-btn">
                  <button type="submit">Giriş yap</button>
                </div>
                <div className="route-to-register form-route">
                  <Link to="/register">Üye değil misiniz ?</Link>
                </div>
              </Container>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
