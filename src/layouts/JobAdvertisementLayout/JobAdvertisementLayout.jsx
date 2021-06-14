import React, { useState,useEffect } from 'react'
import './JobAdvertisementLayout.css'
import JobAdvertisement from '../../pages/JobAdvertisement/JobAdvertisement'
import CityService from '../../services/cityService';
import { Link } from 'react-router-dom';


export default function JobAdvertisementLayout() {
    const [cities, setcities] = useState([])
    useEffect(() => {
        let cityService=new CityService();
        cityService.getCities().then(result=>setcities(result.data.data));
    }, [])
    return (
        <div>
            <div className="search-container">
                <div className="city-option search-container-item">
                    <select name="cities" id="">
                        <option value="choose-city">Şehir</option>
                        {cities.map((city)=>(
                            
                            <option value={city.id} key={city.id}>{city.cityName}</option>
                        ))}
                    </select>
                </div>
                <div className="input search-container-item">
                    <input type="text" placeholder="Pozisyon, firma adı, sektör" />
                </div>
                <div className="button search-container-item">
                    <button>İş bul</button>
                </div>
                <Link to={"/jobadvertisementwithfilters"} id="detail-search-container">
                    <div className="detail-search search-container-item">
                        <span>Detaylı Ara</span>
                    </div>
                </Link>
                

            </div>
            <div>
                <h1>Son Eklenenler</h1>
                <JobAdvertisement/>
            </div>
            
        </div>
    )
}
