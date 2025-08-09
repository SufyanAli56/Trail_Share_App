import React from 'react'
import ExploreDestinations from '../components/common/ExploreDestinations'
import Categories from '../components/common/Categories'
import MapView from '../components/common/MapView'
import SpecialOffer from '../components/common/SpecialOffer'

const Destinations = () => {
  return (
    <div>
     <ExploreDestinations/>
     <Categories/>
     <MapView/>
     <SpecialOffer/>
    </div>
  )
}

export default Destinations
