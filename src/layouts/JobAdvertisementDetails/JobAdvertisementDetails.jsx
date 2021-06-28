import React,{useState,useEffect} from 'react'
import './JobAdvertisementDetails.css'
import JobAdvertisementService from '../../services/jobAdvertisementService'
import Room from '@material-ui/icons/Room';
import FavoriteJobAdvertisementService from '../../services/favoriteJobAdvertisementService';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
    import FavoriteIcon from '@material-ui/icons/Favorite';
    import { useSelector } from "react-redux";
export default function JobAdvertisementDetails(props) {
    const userInfos = useSelector(state => state.user)
    const [jobAdvertisementId, setjobAdvertisementId] = useState(0)
    const [jobAdvertisementDetails, setjobAdvertisementDetails] = useState({})
    const [isFavorite, setisFavorite] = useState(false)
    const [favoriteJobobAdvertisements, setfavoriteJobobAdvertisement] = useState([])
    
    console.log(jobAdvertisementDetails)
    useEffect(() => {
        setjobAdvertisementId(props.match.params.id)
    }, [props.match.params.id])
    useEffect(() => {
        let jobAdvertisementService=new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisementDetails(jobAdvertisementId).then(result=>setjobAdvertisementDetails(result.data.data))
        let favoriteJobAdvertisementService=new FavoriteJobAdvertisementService()
        favoriteJobAdvertisementService.getAll(userInfos.userInfos.id).then(result=>{
            console.log(result)
            result.data.data.map(result=>{
                
                console.log("result",result)
                console.log("resultt",jobAdvertisementId)
                if(result.jobAdvertisement.id==jobAdvertisementId){
                    setisFavorite(true)
                    setfavoriteJobobAdvertisement(result)
                }
            })
            
        })
    }, [jobAdvertisementId,isFavorite,userInfos])

    function addToFavorites(){
        let values={candidate:{id:userInfos.userInfos.id},jobAdvertisement:{id:jobAdvertisementId}}
        let favoriteJobAdvertisementService=new FavoriteJobAdvertisementService()
        favoriteJobAdvertisementService.addToFavorites(values).then(
            setTimeout(() => {
                setisFavorite(true)
            }, 100)
            
            ).catch(console.log("hata oluştu"))
    }
    function removeFromFavorites(){
        let values={id:favoriteJobobAdvertisements.id,candidate:{id:userInfos.userInfos.id},jobAdvertisement:{id:jobAdvertisementId}}
        let favoriteJobAdvertisementService=new FavoriteJobAdvertisementService()
        favoriteJobAdvertisementService.removeFromFavorites(values).then(
            setTimeout(() => {
                setisFavorite(false)
            }, 100)
            
            
            ).catch(console.log("hata oluştu"))
    }
    
    return (
        <div>
            <div className="job-advertisement-details-container">
                <div className="header">
                    <div className="title">
                        <div className="job-title">
                            <span>{jobAdvertisementDetails?.employer?.companyName} - {jobAdvertisementDetails?.jobTitle?.title}</span>
                        </div>
                        <div className="favorite-container">
                            {!isFavorite?
                            <div className="add-to-favorite favorite" onClick={()=>addToFavorites()}>
                                <FavoriteBorderIcon/>
                                <span>Favorilere ekle</span>
                            </div>
                            :<div className="remove-from-favorite favorite" onClick={()=>removeFromFavorites()}>
                                <FavoriteIcon/>
                                <span>Favorilerimden çıkar</span>
                            </div>
                        }
                            
                            
                        </div>
                        
                    </div>
                    <div className="location">
                        <div className="location-icon"><Room style={{fontSize:"30px"}}/></div>
                        <div className="location-name"><span>{jobAdvertisementDetails?.city?.cityName}</span></div>
                    </div>
                </div>
                <div className="content-container container">
                    <div className="header">
                        <span>GENEL NİTELİKLER VE İŞ TANIMI</span>
                    </div>
                    <div className="content">
                        {jobAdvertisementDetails?.description}
                    </div>
                </div>
                <div className="position-info-container container">
                    <div className="header">
                        <span>Pozisyon bilgileri</span>
                    </div>

                    <div className="position-content content">
                        <div className="position-name content-item">
                            <span className="position-name-label label">Pozisyon :</span>
                            <span className="position-name info">{jobAdvertisementDetails?.jobTitle?.title}</span>
                        </div>

                        <div className="way-of-work content-item">
                            <span className="way-of-work-label label">Çalışma şekli :</span>
                            <span className="way-of-work info">{jobAdvertisementDetails?.wayOfWork?.wayOfWork}</span>
                        </div>

                        <div className="type-of-work content-item">
                            <span className="type-of-work-label label">Çalışma tipi :</span>
                            <span className="type-of-work info">{jobAdvertisementDetails?.typeOfWork?.workType}</span>
                        </div>
                        
                        <div className="city content-item">
                            <span className="city-label label">Şehir :</span>
                            <span className="city info">{jobAdvertisementDetails?.city?.cityName}</span>
                        </div>

                        {jobAdvertisementDetails?.minSalary>0&&
                            <div className="min-salary content-item">
                                <span className="min-salary-label label">Minimum maaş :</span>
                                <span className="min-salary info">{jobAdvertisementDetails.minSalary}</span>
                            </div>
                        }

                        {jobAdvertisementDetails?.maxSalary>0&&
                            <div className="max-salary content-item">
                                <span className="max-salary-label label">Maksimum maaş :</span>
                                <span className="max-salary info">{jobAdvertisementDetails.maxSalary}</span>
                            </div>
                        }

                        <div className="open-position-number content-item">
                            <span className="open-position-number-label label">Açık pozisyon adedi :</span>
                            <span className="open-position-number info">{jobAdvertisementDetails?.openPositionNumber}</span>
                        </div>

                        <div className="deadline content-item">
                            <span className="deadline-label label">Son başvuru tarihi :</span>
                            <span className="deadline info">{jobAdvertisementDetails?.deadline}</span>
                        </div>

                        
                    </div>
                </div>
                <div className="contact-info-container container">
                    <div className="header">
                        <span>Şirket iletişim bilgileri</span>
                    </div>
                    <div className="content">
                        <div className="email content-item">
                            <span className="email-label label">Email :</span>
                            <span className="email info">{jobAdvertisementDetails?.employer?.email}</span>
                        </div>

                        <div className="phone content-item">
                            <span className="phone-label label">Telefon :</span>
                            <span className="phone info">{jobAdvertisementDetails?.employer?.phoneNumber}</span>
                        </div>

                        <div className="web-address content-item">
                            <span className="web-address-label label">Web adresi :</span>
                            <span className="web-address info">{jobAdvertisementDetails?.employer?.webAddress}</span>
                        </div>
                    </div>
                </div>

                <div className="apply-btn">
                        <button>Başvuru yap</button>
                </div>
            
            </div>
        </div>
    )
}
