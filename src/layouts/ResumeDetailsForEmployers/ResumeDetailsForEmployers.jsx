import React,{useEffect,useState} from 'react'
import ResumeService from '../../services/resumeService'
import './ResumeDetailsForEmployers.css'
//import {Link} from 'react-router-dom'

export default function ResumeDetailsForEmployers(props) {
    const[resumeDetails,setResumeDetails]=useState({})
    console.log(resumeDetails)
    useEffect(()=>{
        let resumeService=new ResumeService()
        resumeService.getResumeDetailsByResumeId(props.match.params.id).then(result=>setResumeDetails(result.data.data))
    },[props.match.params.id])
    function makeStars(level){
        let content=[]
        for (let i = 0; i < level; i++) {
            content.push(<img src={`${window.location.origin}/star-active.png`} alt="" key={i}/>)
        }
        for (let j = 0; j < 5-level; j++) {
            content.push(<img src={`${window.location.origin}/star-inactive.png`} alt="" key={5-j}/>)
        }
        return content;
    }
    
    return (
        <div>
            
            <div className="resume-detail-for-employer-container">
                <h1>{`${resumeDetails.candidateDto?.firstName} ${resumeDetails.candidateDto?.lastName} kullanıcısının CV bilgileri`}</h1>
                <div className="contact-information-container container contact-work-education">
                    <div className="contact-information resume-item">
                        <div className="contact-header header">
                            <span>İletişim bilgileri</span>
                        </div>
                        <div className="contact-info-content content">
                            <div className="first-part">
                                <div className="image">
                                    <img src={resumeDetails.candidateDto?.imagePath?`${resumeDetails.candidateDto.imagePath}`:`${window.location.origin}/default-user-image.png`} alt="" />
                                </div>

                            </div>
                            <div className="second-part">
                                <div className="name">
                                    <span>{`${resumeDetails.candidateDto?.firstName} ${resumeDetails.candidateDto?.lastName}`}</span>
                                </div>
                                <div className="other-infos infos">
                                    <div className="e-mail-info info-item">
                                        <span className="e-mail-placeholder placeholder">Email</span>
                                        <span className="e-mail info">{resumeDetails.candidateDto?.email}</span>
                                    </div>
                                    <div className="birth-year-info info-item">
                                        <span className="birth-year-placeholder placeholder">Doğum yılı</span>
                                        <span className="birth-year info">{resumeDetails.candidateDto?.birthYear}</span>
                                    </div>
                                    {resumeDetails.candidateDto?.phoneNumber?
                                        <div className="phone-number-info info-item">
                                            <span className="phone-number-placeholder placeholder">Telefon</span>
                                            <span className="phone-number info">{resumeDetails.candidateDto?.phoneNumber}</span>
                                        </div>
                                    :null}
                                    {resumeDetails.candidateDto?.githubLink?
                                        <div className="github-link-info info-item">
                                            <span className="github-link-placeholder placeholder">Github linki</span>
                                            <span className="github-link info"><a href={`http://${resumeDetails.candidateDto?.githubLink}`}>{resumeDetails.candidateDto?.githubLink}</a></span>
                                        </div>
                                    :null}
                                    {resumeDetails.candidateDto?.linkedinLink?
                                        <div className="linkedin-link-info info-item">
                                            <span className="linkedin-link-placeholder placeholder">Linkedin linki</span>
                                            <span className="linkedin-link info"><a href={`http://${resumeDetails.candidateDto?.linkedinLink}`}>{resumeDetails.candidateDto?.linkedinLink}</a></span>
                                        </div>
                                    :null}
                                    {resumeDetails.candidateDto?.personalWebsite?
                                        <div className="personal-web-site-link-info info-item">
                                            <span className="personal-website-link-placeholder placeholder">Kişisel web sitesi</span>
                                            <span className="personal-website-link info"><a href={`http://${resumeDetails.candidateDto?.personalWebsite}`}>{resumeDetails.candidateDto?.personalWebsite}</a></span>
                                        </div>
                                    :null}


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {resumeDetails.summaryInformation?
                <div className="summary-information-container container">
                    <div className="summary-information resume-item">
                        <div className="summary-header header">
                            <span>Özet bilgi</span>
                        </div>
                        <div className="summary-content content">
                            <span>{resumeDetails.summaryInformation}</span>
                        </div>
                    </div>
                </div>
                    
                :null}

                {resumeDetails.workExperiences?
                
                    <div className="work-experience-container container contact-work-education">
                        <div className="work-experience resume-item">
                            <div className="work-experience-header header">
                                <span>İş deneyimleri</span>
                            </div>
                            {resumeDetails.workExperiences.map((workExperience)=>(
                                <div className="work-experience-content content" key={workExperience.id}>
                                    <div className="first-part">
                                        <div className="image">
                                            <img src={`${window.location.origin}/business-place.svg`} alt="" />
                                        </div>
                                    </div>
                                    <div className="second-part">
                                        <div className="infos">
                                            <div className="company-info info-item">
                                                <span className="company-placeholder placeholder">Firma adı</span>
                                                <span className="company info">{workExperience.workplaceName}</span>
                                            </div>
                                            <div className="position-info info-item">
                                                <span className="position-placeholder placeholder">Pozisyon</span>
                                                <span className="position info">{workExperience.position}</span>
                                            </div>
                                            <div className="start-date-info info-item">
                                                <span className="start-date-placeholder placeholder">Başlama tarihi</span>
                                                <span className="start-date info">{workExperience.workExperienceStartDate}</span>
                                            </div>
                                            {workExperience.workExperienceEndDate?
                                                <div className="end-date-info info-item">
                                                    <span className="end-date-placeholder placeholder">Bitiş tarihi</span>
                                                    <span className="end-date info">{workExperience.workExperienceEndDate}</span>
                                                </div>
                                            :null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                :null}

                {resumeDetails.educationInformations?
                
                    <div className="education-information-container container contact-work-education">
                        <div className="education-information resume-item">
                            <div className="education-information-header header">
                                <span>Eğitim bilgileri</span>
                            </div>
                            {resumeDetails.educationInformations.map((educationInformation)=>(
                                <div className="education-information-content content" key={educationInformation.id}>
                                    <div className="first-part">
                                        <div className="image">
                                            <img src={`${window.location.origin}/school_default.svg`} alt="" />
                                        </div>
                                    </div>
                                    <div className="second-part">
                                        <div className="infos">
                                            <div className="college-info info-item">
                                                <span className="college-info-placeholder placeholder">Üniversite adı</span>
                                                <span className="college-info info">{educationInformation.schoolName}</span>
                                            </div>
                                            <div className="department-info info-item">
                                                <span className="department-placeholder placeholder">Bölüm</span>
                                                <span className="department info">{educationInformation.departmentName}</span>
                                            </div>
                                            <div className="start-date-info info-item">
                                                <span className="start-date-placeholder placeholder">Başlama tarihi</span>
                                                <span className="start-date info">{educationInformation.educationStartDate}</span>
                                            </div>
                                            {educationInformation.educationEndDate?
                                                <div className="end-date-info info-item">
                                                    <span className="end-date-placeholder placeholder">Mezuniyet tarihi</span>
                                                    <span className="end-date info">{educationInformation.educationEndDate}</span>
                                                </div>
                                            :null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                :null}

                {resumeDetails.languages?
                    <div className="languages-container container">
                        <div className="languages resume-item">
                            <div className="languages-header header">
                                <span>Yabancı dil</span>
                            </div>
                            <div className="languages-content-container">
                                <div className="language-content-headers">
                                    <span className="language">Dil</span>
                                    <span className="level">Seviye</span>
                                </div>
                                {resumeDetails.languages.map((language)=>(
                                    <div className="languages-content content" key={language.id}>
                                        <span className="content-language">{language.languageName}</span>
                                        <div className="stars">
                                            {makeStars(`${language.level}`)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                :null}

                {resumeDetails.skills?
                    <div className="skills-container container">
                        <div className="skills resume-item">
                            <div className="skills-header header">
                                <span>Yetenekler</span>
                            </div>
                            <div className="skills-content-container">
                                {resumeDetails.skills.map((skill)=>(
                                    <div className="skills-content content" key={skill.id}>
                                        <span>{skill.skillName}</span>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                :null}
                

            </div>
        </div>
    )
}
