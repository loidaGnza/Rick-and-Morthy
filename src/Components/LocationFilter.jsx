import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({ locationName, getNewLocation }) => {
  const [locationOptions, setLocationOptions] = useState()

  useEffect(() => {
    if (!locationName) {
      setLocationOptions()
      return
    }
    const URL = `https://rickandmortyapi.com/api/location?=name${locationName}`
    axios.get(URL)
      .then(res => setLocationOptions(res.data.results))
      .catch(error => console.log(error))
  }, [locationName])


  return (
    <ul className=' container__suggestion'>
      {
        locationOptions?.map(locationOption => <li onClick={() => getNewLocation(locationOption.url, locationOption.name)} key={locationOption.url}>{locationOption.name}</li>)
      }
    </ul>
  )
}

export default LocationFilter