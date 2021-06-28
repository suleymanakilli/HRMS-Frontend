import React, { useState,useEffect } from 'react'
import JobAdvertisementService from '../../services/jobAdvertisementService'
import './JobAdvertisement.css'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import moment from 'moment';
import 'moment/locale/tr';

export default function JobAdvertisement(props) {
    const [jobAdvertisements, setjobAdvertisements] = useState([])
    const userInfos = useSelector(state => state.user)
    console.log(jobAdvertisements)
    
    useEffect(() => {
        
        let isMounted = true; 
        let jobAdvertisementService=new JobAdvertisementService();
        if(props.favorites){
            jobAdvertisementService.getFavorites(userInfos.userInfos.id).then(result=>{if (isMounted) setjobAdvertisements(result.data.data)});
        }
        else{
            jobAdvertisementService.getAll().then(result=>{if (isMounted) setjobAdvertisements(result.data.data)});
        }
        
        return () => { isMounted = false };
    }, [props])
    
    return (
        jobAdvertisements.length>0?
        <div className="job-advertisement-component">
            {jobAdvertisements.map((jobAdvertisement)=>(
                <Link to = {`/jobadvertisementdetail/${jobAdvertisement.id}`} key={jobAdvertisement.id}>
                    <div className="job-advertisement"  >
                        <div className="job-advertisement-container">
                            <div className="header">
                                <span className="title">{jobAdvertisement.jobTitle}</span>
                                <span className="company-name">{jobAdvertisement.companyName}</span>
                                <span className="city">{jobAdvertisement.city}</span>
                            </div>
                            <div className="bottom">
                                <div className="left-side">
                                    <span>{jobAdvertisement.wayOfWork}</span>
                                    <span>{jobAdvertisement.typeOfWork}</span>
                                    <span title="Açık pozisyon adedi">{jobAdvertisement.openPositionNumber}</span>
                                </div>
                                <div className="right-side">
                                    <span>{moment(jobAdvertisement.releaseDate).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                </Link>
                
            ))}
                    
        </div>:<div>Sonuç bulunamadı</div>
    )
}
