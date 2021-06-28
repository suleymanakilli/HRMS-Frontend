import React, { useState, useEffect,useRef } from "react";
import './UpdateSkillInformation.css'
import { Formik } from "formik";
import * as Yup from "yup";
import SkillService from "../../../services/skillService";
export default function UpdateSkillInformation(props) {
  const [skills, setskills] = useState("")
  const inputRef=useRef(null)
  useEffect(() => {
    setskills(props.skills)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    
  }, [props]);
  function handleUpdateSkillInformation() {
    props.updateSkill();
  }


  return skills.length>0 || props.skillInformation===null ? (
    
    <div className="update-skill-information-container">
      <Formik
      enableReinitialize ={true}
        initialValues={{
          candidateResume: {
            id: props.resumeId,
          },
          skillName: props.skills?props.skills:""
        }}
        validationSchema={Yup.object({
            skillName: Yup.string().required("Bu alan boş olamaz")
        })}
        onSubmit={(values, { resetForm }) => {
         let skillService=new SkillService()
          let res2=skills.trim().split(" ")
          let res1=values.skillName.trim().split(" ")
          let difference = res2
                 .filter(x => !res2.includes(x))
                 .concat(res2.filter(x => !res1.includes(x)));
          if(difference.length>0){
              for (let i = 0; i < difference.length; i++) {
                if(difference[i].length>0){
                  skillService.deleteBySkillNameAndResumeId(difference[i],values.candidateResume.id).then(()=>handleUpdateSkillInformation())
                }
                  
              }
          }
          for (let i = 0; i < res1.length; i++) {
              if(!skills.includes(res1[i])){
                  let elemToAdd={candidateResume:values.candidateResume,skillName:res1[i]}
                  skillService.add(elemToAdd).then(()=>handleUpdateSkillInformation())
              }
          }
          
          
          //let authService=new AuthService()
          //authService.login(values).then(response=>(handleResult(response))).catch(error=>handleErrorResult(error))
          //resetForm()
        }}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleReset,
          handleChange,
        }) => (
          <form className="update-skill-form" onSubmit={handleSubmit}>
            <div className="skills display-flex">
              <div className="skill-container container">
                <div className="label">
                  <label htmlFor="skillName">Yetenekler (Bir boşluk bırakarak yazınız)</label>
                </div>
                <div className="input">
                <input id="skillName"
                        ref={inputRef}
                        type="text"
                        placeholder="Yetenekler"
                        value={values.skillName}
                        onChange={handleChange} />
                  {errors.skillName && touched.skillName && (
                    <div className="input-feedback">{errors.skillName}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                className="accept"
                
                type="submit"
              >
                Kaydet
              </button>
              <button
                className="cancel"
                onClick={() => handleUpdateSkillInformation()}
                type="button"
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
}


