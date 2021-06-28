import React, {useState,useEffect} from 'react'
import './Home.css'
import JobAdvertisementLayout from '../JobAdvertisementLayout/JobAdvertisementLayout';
import Resumes from '../../pages/Resumes/Resumes';
import EmployerList from '../EmployerList/EmployerList';

export default function Home() {
    const [role, setrole] = useState('')
    useEffect(() => {
        let isMounted = true; 
        if (isMounted) setrole(localStorage.getItem("role"))
        return () => { isMounted = false };
    }, [])

    function setLayout(){
        if(role==="employer"){
            return <Resumes/>
        }
        if(role==="admin"){
            return <EmployerList/>
        }
        return <JobAdvertisementLayout/>
        
    }
    
    return (
        <div >
            <div>
                {setLayout()}
                
            </div>
        </div>
    )
}
