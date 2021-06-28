import React, { useState, useEffect, useRef } from "react";
import './UpdateLanguageInformation.css'
import { Formik } from "formik";
import * as Yup from "yup";
import LanguageService from "../../../services/languageService";
export default function UpdateWorkExperienceInformation(props) {
  const [languageInformation, setlanguageInformation] = useState({});
  const inputRef=useRef(null)
  useEffect(() => {
    if(props.languageInformation){
      setlanguageInformation(props.languageInformation);
    }
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [props]);

  function handleUpdateLanguageInformation() {
    props.updateLanguage();
  }

  return languageInformation.languageName || props.languageInformation===undefined||props.languageInformation?.id===undefined? (
    <div className="update-language-information-container">
      <Formik
      enableReinitialize ={true}
        initialValues={{
          candidateResume: {
            id: props.resumeId,
          },
          [languageInformation.id?'id':undefined]:languageInformation.id,
          languageName: languageInformation.languageName?languageInformation.languageName:"",
          level: languageInformation.level?languageInformation.level:0
        }}
        validationSchema={Yup.object({
            languageName: Yup.string().required("Dil alanı boş olamaz"),
            level: Yup.number().min(1,"Seviye alanı boş olamaz")
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let languageService=new LanguageService()
          languageService.add(values).then(()=>handleUpdateLanguageInformation())
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
          <form className="update-language-form" onSubmit={handleSubmit}>
            <div className="language-level display-flex">
              <div className="language-container container">
                <div className="label">
                  <label htmlFor="languageName">Dil</label>
                </div>
                <div className="input">
                  <input id="languageName"
                  ref={inputRef}
                        type="text"
                        placeholder="Dil"
                        value={values.languageName}
                        onChange={handleChange} />
                </div>
                
              </div>
              <div className="level-container container">
                <div className="label">
                  <label htmlFor="workplaceName">Seviye</label>
                </div>
                <div className="select">
                  <select
                    id="level"
                    onChange={handleChange}
                    value={values.level}
                  >
                    <option value={0} label="Pozisyon seç.." />
                    
                      <option
                        value={1}
                        label={"Başlangıç"}
                      />
                      <option
                        value={2}
                        label={"Temel"}
                      />
                      <option
                        value={3}
                        label={"Orta"}
                      />
                      <option
                        value={4}
                        label={"İyi"}
                      />
                      <option
                        value={5}
                        label={"İleri"}
                      />
                    
                  </select>
                  {errors.jobTitle?.id && touched.jobTitle?.id && (
                    <div className="input-feedback">{errors.jobTitle?.id}</div>
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
                onClick={() => handleUpdateLanguageInformation()}
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


//props.languageInformation.languageName?props.languageInformation?.languageName:
//props.languageInformation.level?props.languageInformation.level:0