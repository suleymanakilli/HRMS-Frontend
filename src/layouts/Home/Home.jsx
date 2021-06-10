import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import JobAdvertisement from '../../pages/JobAdvertisement/JobAdvertisement'
import './Home.css'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


export default function Home() {
    
    return (
        <div >
            <JobAdvertisement/>
            <div className="search-container">
                <div className="city-option search-container-item">
                    <select name="cities" id="">
                        <option value="choose-city">Şehir</option>
                        <option value="konya">Konya</option>
                        <option value="ankara">Ankara</option>
                    </select>
                </div>
                <div className="input search-container-item">
                    <input type="text" placeholder="Pozisyon, firma adı, sektör" />
                </div>
                <div className="button search-container-item">
                    <button>İş bul</button>
                </div>
                <div className="detail-search search-container-item">
                    <span>Detaylı Ara</span>
                </div>

            </div>

            <div>
                <h1>Son Eklenenler</h1>
            </div>
        </div>
    )
}
