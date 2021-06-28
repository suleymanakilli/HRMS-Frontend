import React, { useEffect, useState } from "react";
import "./AddJobAdvertisement.css";

import { Formik } from "formik";
import * as Yup from "yup";
import alertify from "alertifyjs";

import JobAdvertisementService from "../../services/jobAdvertisementService";
import WayOfWorkService from "../../services/wayOfWorkService";
import TypeOfWorkService from "../../services/typeOfWorkService";
import CityService from "../../services/cityService";
import JobTitleService from "../../services/jobTitleService";

export default function AddJobAdvertisement() {
  const [wayOfWorks, setwayOfWorks] = useState([]);
  const [typeOfWorks, settypeOfWorks] = useState([]);
  const [cities, setcities] = useState([]);
  const [jobTitles, setjobTitles] = useState([]);

  function alertUser(data) {
    if (data.successful) {
      alertify.success(
        "Başarılı bir şekilde eklendi. HRMS personelimiz onayladıktan sonra ilanınız yayında olacaktır. Teşekkür ederiz."
      );
    } else {
      alertify.error(
        "Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin"
      );
    }
  }

  useEffect(() => {
    let wayOfWorkService = new WayOfWorkService();
    let typeOfWorkService = new TypeOfWorkService();
    let cityService = new CityService();
    let jobTitleService = new JobTitleService();
    jobTitleService.getAll().then((result) => setjobTitles(result.data.data));
    wayOfWorkService.getAll().then((result) => setwayOfWorks(result.data.data));
    typeOfWorkService
      .getAll()
      .then((result) => settypeOfWorks(result.data.data));
    cityService.getCities().then((result) => setcities(result.data.data));
  }, []);
  return (
    <div>
      <div className="form-container">
        <h1>Yeni iş ilanı ekle</h1>
        <Formik
          initialValues={{
            city: {
              id: 0,
            },

            wayOfWork: { id: 0 },
            typeOfWork: { id: 0 },
            minSalary: 0,
            maxSalary: 0,
            openPositionNumber: 0,
            deadline: "",
            employer: { id: 10 },
            jobTitle: { id: 0 },
            description: "",
          }}
          validationSchema={Yup.object({
            city: Yup.object({
              id: Yup.number().min(1, "Şehir alanı boş olamaz"),
            }),
            wayOfWork: Yup.object({
              id: Yup.number().min(1, "Çalışma şekli boş olamaz"), //.required('Çalışma şeklini seçmelisiniz')
            }),
            //wayOfWorkId: Yup.number().required('Çalışma şeklini seçmelisiniz'),
            typeOfWork: Yup.object({
              id: Yup.number().min(1, "Çalışma tipi boş olamaz"), //.required('Çalışma tipini seçmelisiniz')
            }),
            //typeOfWorkId: Yup.number().required('Çalışma tipini seçmelisiniz'),
            minSalary: Yup.number(),
            maxSalary: Yup.number(),
            openPositionNumber: Yup.number().min(
              1,
              "Açık pozisyon sayısı en az 1 olmalıdır"
            ), //.required('Açık pozisyon sayısını girmelisiniz'),
            deadline: Yup.date()
              .required("Son geçerlilik tarihini girmelisiniz")
              .min(new Date(Date.now()), "Geçersiz tarih"),
            employer: Yup.object({
              id: Yup.number(),
            }),
            jobTitle: Yup.object({
              id: Yup.number().min(1, "Pozisyon bilgisi boş olamaz"), //.required('Çalışma tipini seçmelisiniz')
            }),
            //employerId: Yup.number(),
            description: Yup.string()
              .min(10, "En az 10 karakter girmelisiniz")
              .required("Açıklama boş olamaz"),
          })}
          onSubmit={(values, { resetForm }) => {
            //console.log(values)
            let jobAdvertisementService = new JobAdvertisementService();
            jobAdvertisementService
              .postJobAdvertisement(values)
              .then((response) => alertUser(response.data));
            resetForm();
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
            <form className="magic-form" onSubmit={handleSubmit}>
              <div>
                <div className="city-job-way-type-container">
                  <div className="city-form form-item">
                    <div className="label-container">
                      <label htmlFor="city.id">Şehir</label>
                    </div>
                    <div className="select-container input-select">
                      <select
                        id="city.id"
                        value={values.city.id}
                        onChange={handleChange}
                      >
                        <option value={0} label="Şehir seç.." />
                        {cities.map((city) => (
                          <option
                            value={city.id}
                            key={city.id}
                            label={city.cityName}
                          />
                        ))}
                      </select>
                      {errors.city?.id && touched.city?.id && (
                        <div className="input-feedback">{errors.city.id}</div>
                      )}
                    </div>
                  </div>

                  <div className="job-title-form form-item">
                    <div className="label-container">
                      <label htmlFor="jobTitle.id">Pozisyon</label>
                    </div>
                    <div className="select-container input-select">
                      <select
                        id="jobTitle.id"
                        value={values.jobTitle.id}
                        onChange={handleChange}
                      >
                        <option value={0} label="Pozisyon seç.." />
                        {jobTitles.map((jobTitle) => (
                          <option
                            value={jobTitle.id}
                            key={jobTitle.id}
                            label={jobTitle.title}
                          />
                        ))}
                      </select>
                    </div>
                    {errors.jobTitle?.id && touched.jobTitle?.id && (
                      <div className="input-feedback">{errors.jobTitle.id}</div>
                    )}
                  </div>

                  <div className="way-of-work-form form-item">
                    <div className="label-container">
                      <label htmlFor="wayOfWork.id">Çalışma şekli</label>
                    </div>
                    <div className="select-container input-select">
                      <select
                        id="wayOfWork.id"
                        value={values.wayOfWork.id}
                        onChange={handleChange}
                      >
                        <option value={0} label="Çalışma şekli seç.." />
                        {wayOfWorks.map((wayOfWork) => (
                          <option
                            value={wayOfWork.id}
                            key={wayOfWork.id}
                            label={wayOfWork.wayOfWork}
                          />
                        ))}
                      </select>
                      {errors.wayOfWork?.id && touched.wayOfWork?.id && (
                        <div className="input-feedback">
                          {errors.wayOfWork.id}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="type-of-work-form form-item">
                    <div className="label-container">
                      <label htmlFor="typeOfWork.id">Çalışma tipi</label>
                    </div>
                    <div
                      className="select-container input-select"
                      id="type-of-work-select"
                    >
                      <select
                        id="typeOfWork.id"
                        value={values.typeOfWork.id}
                        onChange={handleChange}
                      >
                        <option value={0} label="Çalışma tipi seç.." />
                        {typeOfWorks.map((typeOfWork) => (
                          <option
                            value={typeOfWork.id}
                            key={typeOfWork.id}
                            label={typeOfWork.workType}
                          />
                        ))}
                      </select>
                    </div>
                    {errors.typeOfWork?.id && touched.typeOfWork?.id && (
                      <div className="input-feedback">
                        {errors.typeOfWork.id}
                      </div>
                    )}
                  </div>
                </div>

                <div className="salary-container form-item">
                  <div className="min-salary-form">
                    <div className="label-container">
                      <label htmlFor="minSalary">Min maaş</label>
                    </div>
                    <div className="input-container input-select">
                      <input
                        id="minSalary"
                        type="number"
                        placeholder="Min maaş"
                        value={values.minSalary}
                        onChange={handleChange}
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.minSalary}</div>
                      )}
                    </div>
                  </div>
                  <div className="max-salary-form">
                    <div className="label-container">
                      <label htmlFor="maxSalary">Max maaş</label>
                    </div>
                    <div className="input-container input-select">
                      <input
                        id="maxSalary"
                        type="number"
                        placeholder="Max maaş"
                        value={values.maxSalary}
                        onChange={handleChange}
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.maxSalary}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="open-position-deadline-container">
                  <div className="open-position-number-form form-item">
                    <div className="label-container">
                      <label htmlFor="openPositionNumber">
                        Açık pozisyon sayısı
                      </label>
                    </div>
                    <div className="input-container input-select">
                      <input
                        id="openPositionNumber"
                        type="number"
                        placeholder="Açık pozisyon sayısı"
                        value={values.openPositionNumber}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.openPositionNumber &&
                      touched.openPositionNumber && (
                        <div className="input-feedback">
                          {errors.openPositionNumber}
                        </div>
                      )}
                  </div>

                  <div className="deadline-form form-item">
                    <div className="label-container">
                      <label htmlFor="deadline">Son geçerlilik tarihi</label>
                    </div>
                    <div className="input-container input-select">
                      <input
                        id="deadline"
                        type="date"
                        placeholder="Son geçerlilik tarihi"
                        value={values.deadline}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.deadline && touched.deadline && (
                      <div className="input-feedback">{errors.deadline}</div>
                    )}
                  </div>
                </div>

                <div className="description-form form-item">
                  <div className="label-container">
                    <label htmlFor="description">Açıklama</label>
                  </div>
                  <div className="text-area-container input-select">
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Açıklama"
                      value={values.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {errors.description && touched.description && (
                    <div className="input-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="submit-btn">
                  <button type="submit">Ekle</button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
