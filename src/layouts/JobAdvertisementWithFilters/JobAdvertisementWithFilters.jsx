import React, { useState, useEffect } from "react";
import "./JobAdvertisementWithFilters.css";
import CityService from "../../services/cityService";
import WayOfWorkService from "../../services/wayOfWorkService";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/tr";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default function JobAdvertisementWithFilters() {
  const [cities, setcities] = useState([]);
  const [wayOfWorks, setwayOfWorks] = useState([]);
  const [jobAdvertisements, setjobAdvertisements] = useState([]);
  const [cityId, setcityId] = useState(0)
  const [wayOfWorkId, setwayOfWorkId] = useState(0)
  const [numberPerPage, setnumberPerPage] = useState(10)
  const [page, setpage] = useState(1)
  console.log(jobAdvertisements)
  console.log("pagee",page)
  useEffect(() => {
    let cityService = new CityService();
    let wayOfWorkService = new WayOfWorkService();
    cityService.getCities().then((result) => setcities(result.data.data));
    wayOfWorkService.getAll().then((result) => setwayOfWorks(result.data.data));
    let jobAdvertisementService = new JobAdvertisementService();
    let isMounted = true;
    jobAdvertisementService
      .getFiltered(
        page,
        numberPerPage,
        cityId,
        wayOfWorkId
      )
      .then((result) => {
        if (isMounted) setjobAdvertisements(result.data.data)
      });
    
    return () => {
      isMounted = false;
    };
  }, [cityId,wayOfWorkId,numberPerPage,page]);

  function handleFilter() {
    setcityId(document.getElementById("city-select").value)
    setwayOfWorkId(document.getElementById("way-of-work-select").value)
  }
  function handleNumberPerPage(){
    setnumberPerPage(document.getElementById("number-per-page").value)
  }
  function handlePage(value){
    if(value>0&&value<6){
      setpage(value)
    }
    
  }
  return (
    <div className="job-advertisement-with-filters">
      <div className="header">
        <h1>İş ilanları</h1>
        <div className="advertisement-per-page">
          <div className="label">
            <span>Sayfa başına ilan adedi</span>
          </div>
          <div className="option">
            <select
              name="number-per-page"
              id="number-per-page"
              defaultValue={numberPerPage}
              onChange={handleNumberPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
      <div className="filter-content">
        <div className="filters">
          <div className="city-filter filter">
            <div className="label">
              <span>Şehir</span>
            </div>
            <div className="option">
              <select id="city-select">
                <option value={0} label="Şehir seç.." />
                {cities.map((city) => (
                  <option value={city.id} key={city.id} label={city.cityName} />
                ))}
              </select>
            </div>
          </div>
          <div className="way-of-work-filter filter">
            <div className="label">
              <span>Çalışma şekli</span>
            </div>
            <div className="option">
              <select id="way-of-work-select">
                <option value={0} label="Çalışma şekli seç.." />
                {wayOfWorks.map((wayOfWork) => (
                  <option
                    value={wayOfWork.id}
                    key={wayOfWork.id}
                    label={wayOfWork.wayOfWork}
                  />
                ))}
              </select>
            </div>
          </div>
          <div className="filter-footer">
            <div className="button-apply">
              <button onClick={() => handleFilter()}>Uygula</button>
            </div>
          </div>
        </div>
        <div className="job-advertisements">
          {jobAdvertisements.map((jobAdvertisement) => (
            <Link
              to={`/jobadvertisementdetail/${jobAdvertisement.id}`}
              key={jobAdvertisement.id}
            >
              <div className="job-advertisement">
                <div className="job-advertisement-container">
                  <div className="header">
                    <span className="title">{jobAdvertisement.jobTitle}</span>
                    <span className="company-name">
                      {jobAdvertisement.companyName}
                    </span>
                    <span className="city">{jobAdvertisement.city}</span>
                  </div>
                  <div className="bottom">
                    <div className="left-side">
                      <span>{jobAdvertisement.wayOfWork}</span>
                      <span>{jobAdvertisement.typeOfWork}</span>
                      <span title="Açık pozisyon adedi">
                        {jobAdvertisement.openPositionNumber}
                      </span>
                    </div>
                    <div className="right-side">
                      <span>
                        {moment(jobAdvertisement.releaseDate).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="footer">
            <div className="pages">
              <div className="previous-page page-content" onClick={()=>handlePage(page-1)}>
                <ChevronLeftIcon/>
              </div>
              <div className="content page-content" onClick={()=>handlePage(1)}>
                <span>1</span>
              </div>
              <div className="content page-content" onClick={()=>handlePage(2)}>
                <span>2</span>
              </div>
              <div className="content page-content" onClick={()=>handlePage(3)}>
                <span>3</span>
              </div>
              <div className="content page-content" onClick={()=>handlePage(4)}>
                <span>4</span>
              </div>
              <div className="content page-content" onClick={()=>handlePage(5)}>
                <span>5</span>
              </div>
              <div className = "next-page page-content" onClick={()=>handlePage(page+1)}>
                <ChevronRightIcon/>
              </div>
            </div>
      </div>
    </div>
  );
}
