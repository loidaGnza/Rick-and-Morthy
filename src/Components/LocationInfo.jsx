import React from 'react'

const LocationInfo = ({ location }) => {

  return (
    <article className='location__info'>
      <h2>{location?.name}</h2>
      <ul className='list'>
        <li><span>Type:</span> {location?.type}</li>
        <li><span>Dimesion:</span> {location?.dimesion}</li>
        <li><span>Population:</span> {location?.residents.length}</li>
      </ul>
    </article>
  )
}

export default LocationInfo