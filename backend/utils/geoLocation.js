// Dummy geolocation data
const cityCoordinates = {
    'New York': { lat: 40.7128, lng: -74.006 },
    'London': { lat: 51.5074, lng: -0.1278 },
    'Tokyo': { lat: 35.6762, lng: 139.6503 },
    'Paris': { lat: 48.8566, lng: 2.3522 },
    'Sydney': { lat: -33.8688, lng: 151.2093 },
  };
  
  const getCoordinates = (city) => {
    return cityCoordinates[city] || null;
  };
  
  module.exports = getCoordinates;