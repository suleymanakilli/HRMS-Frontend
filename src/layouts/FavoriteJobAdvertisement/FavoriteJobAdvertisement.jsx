import React from 'react'
import './FavoriteJobAdvertisement.css'
import JobAdvertisement from '../../pages/JobAdvertisement/JobAdvertisement'
export default function FavoriteJobAdvertisement() {
    return (
        <div>
            <JobAdvertisement favorites={true}/>
        </div>
    )
}
