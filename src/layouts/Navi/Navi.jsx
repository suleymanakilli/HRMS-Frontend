import React, { useState,useEffect } from "react";
import "./Navi.css";
import EmployeeService from '../../services/employeeService'
import EmployerService from '../../services/employerService'
import { Search } from "@material-ui/icons";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserInfos } from "../../store/actions/updateUserActions";

import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CandidateService from "../../services/candidateService";
export default function Navi() {
  
  const userInfos = useSelector(state => state.user)
  console.log(userInfos)
  const dispatch = useDispatch()


  console.log("userinfoss",userInfos)
  const [role] = useState(()=>localStorage.getItem("role"))
  const [open, setopen] = useState(false);
  useEffect(() => {
    if(userInfos.userInfos!==null&&userInfos.userInfos!==undefined&&userInfos.userInfos.length>0){
      if(role==="admin"){
        let employeeService=new EmployeeService()
        if(userInfos.userInfos.id){
          employeeService.getById(userInfos.userInfos.id).then(result=>handleUpdateUserInformations(result.data.data))
        }
      }
      if(role==="candidate"){
        let candidateService=new CandidateService()
        if(userInfos.userInfos.id){
          candidateService.getById(userInfos.userInfos.id).then(result=>handleUpdateUserInformations(result.data.data))
        }
      }
      if(role==="employer"){
        let employerService=new EmployerService()
        if(userInfos.userInfos.id){
          employerService.getById(userInfos.userInfos.id).then(result=>handleUpdateUserInformations(result.data.data))
        }
      }
    }
    
    
  }, [role,userInfos.userInfos.id])
  function handleUpdateUserInformations(userInformations){
    console.log(userInformations)
    dispatch(updateUserInfos(userInformations))
  }
  function setOpenAndAddTransition(isOpen) {
    
    setopen(isOpen);
    addTransition();
  }

  function addTransition() {
    var element =
      document.getElementsByClassName("dropdown-items")[0].classList;
    element.toggle("active");
  }

  function logout() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    
    <div className="navi">
      <Container>
        <div className="menu-items-container">
          <div className="menu-first-part">
            <Link to={"/"}>
              <div className="home menu-item">HRMS</div>
            </Link>
            {role === "candidate" || role === null ? (
              <Link to={"/jobadvertisementwithfilters"}>
                <div className="search-job menu-item">
                  <span>İş Ara</span>
                  <Search style={{ fontSize: 22 }}></Search>
                </div>
              </Link>
            ) : null}
            {role === "employer" ? (
              <Link to={"/resumes"}>
                <div className="menu-item">Özgeçmişler</div>
              </Link>
            ) : null}
            {role === "candidate" ? (
              <>
              <Link to={"/userresumes"}>
                <div className="menu-item">Özgeçmişlerim</div>
              </Link>
              <Link to={"/favoritejobadvertisement"}>
                <div className="menu-item">Favorilerim</div>
              </Link>
              </>
              
              
            ) : null}
            {role === "employer" ? (
              <Link to={"/addjobadvertisement"}>
                <div className="menu-item">İlan Yayınla</div>
              </Link>
            ) : null}

            {role === "admin" ? (
              <Link to={"/jobadvertisementforemployee"}>
                <div className="menu-item">İlanlar</div>
              </Link>
            ) : null}

            {role === "admin" ? (
              <Link to={"/employerlist"}>
                <div className="menu-item">Şirketler</div>
              </Link>
            ) : null}
          </div>
          {role === null || role === undefined||userInfos===undefined? (
            <div
              className="menu-second-part"
              onClick={() => setOpenAndAddTransition(!open)}
            >
              <div className="menu-item">
                <AccountCircle />
              </div>
              <div className="menu-item auth">
                <span className="login">Giriş Yap</span>
                <span className="register">veya üye ol</span>
              </div>
              <div className="menu-item">
                <ExpandMore />
              </div>
              {open ? (
                <div className="dropdown-items">
                  <DropdownItems />
                </div>
              ) : (
                <div
                  className="dropdown-items"
                  style={{ visibility: "hidden" }}
                >
                  <DropdownItems />
                </div>
              )}
            </div>
          ) : null}

          {role === "employer" ? (
            <div
              className="menu-second-part"
              onClick={() => setOpenAndAddTransition(!open)}
            >
              <div className="menu-item">
                <img
                  src={`${window.location.origin}/business-place.svg`}
                  alt=""
                />
              </div>
              <div className="menu-item auth">
                <span className="login">{userInfos.userInfos.companyName}</span>
              </div>
              <div className="menu-item" style={{ marginTop: "5px" }}>
                <ExpandMore style={{ fontSize: 30 }} />
              </div>
              {open ? (
                <div
                  className="dropdown-items"
                  style={{ width: "8vw", minWidth: "100px" }}
                >
                  <DropdownItemsLoggedIn />
                </div>
              ) : (
                <div
                  className="dropdown-items"
                  style={{
                    visibility: "hidden",
                    width: "8vw",
                    minWidth: "100px",
                  }}
                >
                  <DropdownItemsLoggedIn />
                </div>
              )}
            </div>
          ) : null}

          {(role === "candidate" || role === "admin") ? (
            <div
              className="menu-second-part"
              onClick={() => setOpenAndAddTransition(!open)}
            >
              <div className="menu-item">
                {userInfos.userInfos?.imagePath !== undefined ? (
                  <img
                    src={`${userInfos.userInfos?.imagePath}`}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    src={`${window.location.origin}/default-user-image.png`}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
              <div className="menu-item auth">
                <span className="login" style={{ fontSize: "15px" }}>
                  <span style={{display:"block"}}>{userInfos.userInfos?.firstName}</span>
                  <span>{userInfos.userInfos?.lastName}</span>
                </span>
              </div>
              <div className="menu-item" style={{ marginTop: "5px" }}>
                <ExpandMore style={{ fontSize: 30 }} />
              </div>
              {open ? (
                <div
                  className="dropdown-items"
                  style={{ width: "8vw", minWidth: "100px" }}
                >
                  <DropdownItemsLoggedIn />
                </div>
              ) : (
                <div
                  className="dropdown-items"
                  style={{
                    visibility: "hidden",
                    width: "8vw",
                    minWidth: "100px",
                  }}
                >
                  <DropdownItemsLoggedIn />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
  function DropdownItems() {
    return (
      <div id="dropdown-items">
        <a href="/login">Giriş Yap</a>
        <a href="register">Kayıt Ol</a>
      </div>
    );
  }

  function DropdownItemsLoggedIn() {
    return (
      <div id="dropdown-items">
        <a href="/edituser">Bilgileri düzenle</a>
        <span onClick={logout}>Çıkış yap</span>
      </div>
    );
  }
}
