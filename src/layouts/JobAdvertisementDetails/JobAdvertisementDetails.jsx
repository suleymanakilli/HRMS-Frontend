import React,{useState} from 'react'
import { useEffect } from 'react'
import JobAdvertisementService from '../../services/jobAdvertisementService'

export default function JobAdvertisementDetails(props) {
    const [jobAdvertisementId, setjobAdvertisementId] = useState(0)
    const [jobAdvertisementDetails, setjobAdvertisementDetails] = useState({})
    console.log(jobAdvertisementDetails)
    useEffect(() => {
        setjobAdvertisementId(props.match.params.id)
    }, [props.match.params.id])
    useEffect(() => {
        let jobAdvertisementService=new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisementDetails(jobAdvertisementId).then(result=>setjobAdvertisementDetails(result.data.data))
    }, [jobAdvertisementId])
    
    return (
        <div>
            {jobAdvertisementDetails?.city?.cityName}
        </div>
    )
}
