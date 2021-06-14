import React, { useState,useEffect } from 'react'
import JobAdvertisementService from '../../services/jobAdvertisementService'
import './JobAdvertisement.css'
import { Link } from "react-router-dom"
import moment from 'moment';
import 'moment/locale/tr';

export default function JobAdvertisement() {
    const [jobAdvertisements, setjobAdvertisements] = useState([])
    console.log(moment.locale())
    
    useEffect(() => {
        let jobAdvertisementService=new JobAdvertisementService();
        jobAdvertisementService.getAll().then(result=>setjobAdvertisements(result.data.data));
        
    }, [])
    
    return (
        <div className="job-advertisement-component">
            {jobAdvertisements.map((jobAdvertisement)=>(
                <Link to = {`/jobadvertisementdetail/${jobAdvertisement.id}`} key={jobAdvertisement.id}>
                    <div className="job-advertisement"  >
                        <div className="job-advertisement-container">
                            <div className="header">
                                <span>{jobAdvertisement.jobTitle}</span>
                                <span>{jobAdvertisement.companyName}</span>
                                <span>{jobAdvertisement.city}</span>
                            </div>
                            <div className="bottom">
                                <div className="left-side">
                                    <span>Tam zamanlı</span>
                                    <span>Part Time</span>
                                    <span>{jobAdvertisement.openPositionNumber}</span>
                                </div>
                                <div className="right-side">
                                    <span>{moment(jobAdvertisement.releaseDate).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                </Link>
                
            ))}
                    
        </div>
    )
}
