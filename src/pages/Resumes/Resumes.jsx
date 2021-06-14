import React,{useEffect,useState} from 'react'
import ResumeService from '../../services/resumeService'
import './Resumes.css'

import {Link} from 'react-router-dom'

export default function Resumes() {
    const[shortResumes,setShortResumes]=useState([])
    console.log(shortResumes)
    useEffect(()=>{
        let resumeService=new ResumeService()
        resumeService.getShortResumes().then(result=>setShortResumes(result.data.data))

    },[])
    return (
        <div>
            {shortResumes.map((shortResume)=>(
                
                    <div className="short-resume-card" key={shortResume.id}>
                        <div className="first-part">
                            <img src={shortResume.imagePath} alt="" />
                        </div>
                        <div className="second-part">
                            <span>{shortResume.resumeName}</span>
                            <span>{shortResume.lastUpdateDate}</span>
                        </div>
                        <div className="third-part">
                            <Link to={`/resumedetailsforemployers/${shortResume.id}`}>
                                <button>Ayrıntılı incele</button>
                            </Link>
                        </div>
                    </div>
                
                
            ))}
            
        </div>
    )
}
