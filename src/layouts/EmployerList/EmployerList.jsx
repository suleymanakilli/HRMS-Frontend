import React, { useState, useEffect } from "react";
import "./EmployerList.css";
import alertify from "alertifyjs";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import { useSelector } from "react-redux";
import EmployeeConfirmEmployerService from "../../services/employeeConfirmEmployerServise";
import EmployerService from "../../services/employerService";
export default function EmployerList() {
  const userInfos = useSelector(state => state.user)
  const [employers, setemployers] = useState([]);
  const [employersToUpdate, setemployersToUpdate] = useState([])
  console.log("employers",employers);
  console.log("employers to update",employersToUpdate)
  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getNotApprovedOnes()
      .then((result) => setemployers(result.data.data));
      employerService.getToBeUpdatedOnes().then(result=>setemployersToUpdate(result.data.data))
      
  }, []);

  function approveConfirm(id) {
    if (window.confirm("Onaylamak istediğinize emin misiniz ?")) {
      console.log(id);
      let employeeConfirmEmployerServise = new EmployeeConfirmEmployerService();
      employeeConfirmEmployerServise
        .approve(id, userInfos.userInfos.id)
        .then((result) => alertify.success(result.data.message));
      setemployers(employers.filter((employer) => employer.id !== id));
    }
  }
  function refuseConfirm(id) {
    if (
      window.confirm("Bu ilanı yayından kaldırmak istediğinize emin misiniz ?")
    ) {
      console.log(id);
      let employeeConfirmEmployerServise = new EmployeeConfirmEmployerService();
      employeeConfirmEmployerServise
        .doNotApprove(id)
        .then((result) => alertify.success(result.data.message));
      setemployers(employers.filter((employer) => employer.id !== id));
    }
  }
  function implementUpdateConfirm(id){
    if (window.confirm("Onaylamak istediğinize emin misiniz ?")) {
      console.log(id);
      let employeeConfirmEmployerServise = new EmployeeConfirmEmployerService();
      employeeConfirmEmployerServise
        .implementUpdate(id)
        .then((result) => alertify.success(result.data.message));
        setemployersToUpdate(employersToUpdate.filter((employerToUpdate) => employerToUpdate.id !== id));
    }
  }
  function implementUpdateRefuse(id){
    if (window.confirm("Onaylamak istediğinize emin misiniz ?")) {
      console.log(id);
      let employeeConfirmEmployerServise = new EmployeeConfirmEmployerService();
      employeeConfirmEmployerServise
        .doNotImplementUpdate(id)
        .then((result) => alertify.success(result.data.message));
        setemployersToUpdate(employersToUpdate.filter((employerToUpdate) => employerToUpdate.id !== id));
    }
  }
  return (
    <div className="employer-list-container">
      <div className="first-part">
        <h1>Yeni açılan hesaplar</h1>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Şirket ismi</th>
              <th>Email</th>
              <th>Web adresi</th>
              <th>Telefon numarası</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employers.map((employer,index) => (
              <tr key={index}>
                <td>{employer.companyName}</td>
                <td>{employer.email}</td>
                <td>{employer.webAddress}</td>
                <td>{employer.phoneNumber}</td>
                <td>
                  <div
                    className="check icon"
                    title="Onayla"
                    onClick={() => approveConfirm(employer.id)}
                  >
                    <Check style={{ color: "white" }} />
                  </div>
                </td>
                <td>
                  <div
                    className="clear icon"
                    title="Onaylama"
                    onClick={() => refuseConfirm(employer.id)}
                  >
                    <Clear style={{ color: "white" }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="second-part">
      <h1>Güncellenmeyi bekleyen hesaplar</h1>
        {employersToUpdate.length>0?<table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Şirket ismi</th>
              <th>Email</th>
              <th>Web adresi</th>
              <th>Telefon numarası</th>
              <th>Eski bilgiler</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employersToUpdate.map((employerToUpdate,index) => (
              <tr key={index}>
                <td>{employerToUpdate.employerHistory.companyName}</td>
                <td>{employerToUpdate.employerHistory.email}</td>
                <td>{employerToUpdate.employerHistory.webAddress}</td>
                <td>{employerToUpdate.employerHistory.phoneNumber}</td>
                <td style={{cursor:"pointer"}}>Eski bilgileri gör</td>
                <td>
                  <div
                    className="check icon"
                    title="Onayla"
                    onClick={() => implementUpdateConfirm(employerToUpdate.id)}
                  >
                    <Check style={{ color: "white" }} />
                  </div>
                </td>
                <td>
                  <div
                    className="clear icon"
                    title="Onaylama"
                    onClick={() => implementUpdateRefuse(employerToUpdate.id)}
                  >
                    <Clear style={{ color: "white" }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>:<span>Güncellenecek hesap bulunmuyor</span>}
        
        
      </div>
    </div>
  );
}
