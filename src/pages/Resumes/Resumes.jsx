import React, { useEffect, useState } from "react";
import ResumeService from "../../services/resumeService";

import "./Resumes.css";

import { Link } from "react-router-dom";

export default function Resumes() {
  const [shortResumes, setShortResumes] = useState([]);
  console.log(shortResumes);
  useEffect(() => {
    let resumeService = new ResumeService();
    let isMounted = true;
    resumeService.getShortResumes().then((result) => {
      if (isMounted) setShortResumes(result.data.data);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="short-resume-card-container">
      {shortResumes.map((shortResume) => (
        <Link to={`/resumedetailsforemployers/${shortResume.id}`} key={shortResume.id} >
          <div className="short-resume-card">
            <div className="first-part">
              <img src={shortResume.imagePath} alt="" />
            </div>
            <div className="second-part">
              <span>{shortResume.resumeName}</span>
              <span>{shortResume.lastUpdateDate}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
