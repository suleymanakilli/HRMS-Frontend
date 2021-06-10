import React, { useState,useEffect } from 'react'
import JobAdvertisementService from '../../services/jobAdvertisementService'
import './JobAdvertisement.css'

export default function JobAdvertisement() {
    const [jobAdvertisements, setjobAdvertisements] = useState([])
    useEffect(() => {
        let jobAdvertisementService=new JobAdvertisementService();
        jobAdvertisementService.getJobAdvertisements().then(result=>setjobAdvertisements(result.data.data));
    }, [])
    return (
        <div>
            {jobAdvertisements.length>0?<h1>{jobAdvertisements[0].jobTitle}</h1>:null}
        </div>
    )
}
