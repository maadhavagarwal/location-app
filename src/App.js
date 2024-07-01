import React, { useState, useEffect } from 'react';

// import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
  
  const geoUrl = "https://gist.githubusercontent.com/mbostock/4090846/raw/world-110m.json";
function TrackUserLocation() {
  
  
  // Example coordinates for a specific location (e.g., New York City)
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  
  
   
      
  
  useEffect(() => {
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
      // const markerCoordinates = {  latitude: position.coords.latitude, longitude: position.coords.longitude };
      // Cleanup the watcher when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watcher);
      };
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#D6D6fA",
                  },
                  hover: {
                    fill: "#F23",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
        <Marker coordinates={[location.longitude,location.latitude]}>
          <circle r={10} fill="#F23" />
          <text textAnchor="middle" y={-20} style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
        
          </text>
        </Marker>
      </ComposableMap>
  
    </div>
  );
}

export default TrackUserLocation;
