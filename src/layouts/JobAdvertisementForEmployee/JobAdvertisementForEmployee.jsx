import React, { useState, useEffect } from "react";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import "./JobAdvertisementForEmployee.css";
import alertify from "alertifyjs";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
export default function JobAdvertisementForEmployee() {
  const [jobAdvertisements, setjobAdvertisements] = useState([]);
  console.log(jobAdvertisements);
  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getNotApprovedOnes()
      .then((result) => setjobAdvertisements(result.data.data));
  }, []);

  function approveConfirm(id) {
    if (window.confirm("Onaylamak istediğinize emin misiniz ?")) {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.approve(id).then((result)=>alertify.success(result.data.message))
        setjobAdvertisements(jobAdvertisements.filter(jobAdvertisement=>jobAdvertisement.id!==id))
    }
  }
  function refuseConfirm(id) {
    if (window.confirm("Bu ilanı yayından kaldırmak istediğinize emin misiniz ?")) {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.doNotApprove(id).then((result)=>alertify.success(result.data.message))
        setjobAdvertisements(jobAdvertisements.filter(jobAdvertisement=>jobAdvertisement.id!==id))
    }
  }
  return (
    <div className="job-advertisement-for-employees-container">
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Şirket ismi</th>
            <th>Şehir</th>
            <th>Açık pozisyon sayısı</th>
            <th>Pozisyon ismi</th>
            <th>Yayım Tarihi</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {jobAdvertisements.map((jobAdvertisement) => (
            <tr key={jobAdvertisement.id}>
              <td>{jobAdvertisement.companyName}</td>
              <td>{jobAdvertisement.city}</td>
              <td>{jobAdvertisement.openPositionNumber}</td>
              <td>{jobAdvertisement.jobTitle}</td>
              <td>{jobAdvertisement.releaseDate}</td>
              <td>
                <div className="check icon" title="Onayla" onClick={() => approveConfirm(jobAdvertisement.id)}>
                  <Check style={{ color: "white" }} />
                </div>
              </td>
              <td>
                <div className="clear icon" title="Onaylama" onClick={() => refuseConfirm(jobAdvertisement.id)}>
                  <Clear style={{ color: "white" }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
