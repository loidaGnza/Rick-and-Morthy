import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMesage from './Components/ErrorMessage'
import LocationFilter from './Components/LocationFilter'
import LocationInfo from './Components/LocationInfo'
import ResidentList from './Components/ResidentList'
import getRandomNumber from './Utils/getRandomNumber'


const RESIDENTS_PAGE = 15

function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState('')
  const [showError, setShowError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentFilter, setResidentFilter] = useState([])


  const getDataDimension = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
      axios.get(URL)
        .then(res => setLocation(res.data))
        .catch(error => {
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 2000)
          console.log(error)
        })
    } else {
      alert('ingrese un valor')
    }
  }

  useEffect(() => {
    const randomDimension = getRandomNumber()
    getDataDimension(randomDimension)
  }, [])


  const handleSubmit = event => {
    event.preventDefault()
    const dimensionSearch = event.target.searchValue.value
    getDataDimension(dimensionSearch)
  }

  const handleChangeInput = (event) => {
    setLocationName(event.target.value)
  }

  const getNewLocation = (URL, name) => {
    setLocationName(name)
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(error => console.log(error))
  }

  const getAllPages = () => {
    const arrayPages = []
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i)
    }
    return arrayPages
  }


  useEffect(() => {
    if (location) {
      const quantityResidents = location.residents.length
      const quantityPages = Math.ceil(quantityResidents / RESIDENTS_PAGE)
      setLastPage(quantityPages)
      setCurrentPage(1)

    }

  }, [location])


  useEffect(() => {
    const LastResidetsCut = currentPage * RESIDENTS_PAGE
    const firstRsidentsCut = LastResidetsCut - RESIDENTS_PAGE
    const newResidentsFilter = location?.residents.slice(firstRsidentsCut, LastResidetsCut)
    setResidentFilter(newResidentsFilter)

  }, [location, currentPage])


  return (
    <div className="App">

      <div className='cover__img'>


      </div>
        
      <div className='container__F'>
        <form onSubmit={handleSubmit} className='btn__center'>
        <input id='searchValue' value={locationName} type='text' onChange={handleChangeInput} placeholder='search your dimension'  className='input active'/>
        <button type='submit' className='btn'>Search</button>

    
      

        {
          showError ? <ErrorMesage /> : ''
        }
      </form>
      </div>
        
      <LocationFilter locationName={locationName} getNewLocation={getNewLocation} />
      <LocationInfo location={location} />
      <ResidentList residentFilter={residentFilter} />
      <ul className='list-pages'>
        {
          getAllPages().map(page => (
            <li
              className={currentPage === page ? 'currentPage' : ''}
              onClick={() => setCurrentPage(page)}
              key={page}
            >{page}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
