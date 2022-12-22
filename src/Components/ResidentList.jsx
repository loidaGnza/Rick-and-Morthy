import React from 'react'
import ResidentCard from './ResidentsCard'

const ResidentList = ({ residentFilter }) => {

  return (
    < section className='location-residents' >
      {
        residentFilter?.map(urlResident => (
          <ResidentCard key={urlResident} urlResident={urlResident} />
        ))
      }
    </section>
  )
}
export default ResidentList