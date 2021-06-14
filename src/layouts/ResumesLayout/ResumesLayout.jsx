import React,{useState,useEffect} from 'react'
import JobTitleService from '../../services/jobTitleService'
import { Link } from "react-router-dom"
import './ResumesLayout.css'
import Resumes from '../../pages/Resumes/Resumes'
export default function ResumesLayout() {
    const [jobtitles, setjobtitles] = useState([])
    
    useEffect(()=>{
        let jobTitleService=new JobTitleService()
        jobTitleService.getAll().then(result=>(setjobtitles(result.data.data)))
    },[])
    return (
        <div>
            <div className="search-container">
                <div className="city-option search-container-item">
                    <select name="cities" id="">
                        <option value="choose-city">Pozisyon</option>
                        {jobtitles.map((jobtitle)=>(
                            
                            <option value={jobtitle.id} key={jobtitle.id}>{jobtitle.title}</option>
                        ))}
                    </select>
                </div>
                <div className="input search-container-item">
                    <input type="text" placeholder="Pozisyon, bölüm, üniversite" />
                </div>
                <div className="button search-container-item">
                    <button>Cv bul</button>
                </div>
                <Link to={"/resumeswithfilters"} id="detail-search-container">
                    <div className="detail-search search-container-item">
                        <span>Detaylı Ara</span>
                    </div>
                </Link>
            </div>

            <Resumes/>
        </div>
    )
}
