import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "https://gist.githubusercontent.com/mbostock/4090846/raw/world-110m.json";

function TrackUserLocation() {
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
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "#D6D6FA" },
                      hover: { fill: "#F53", outline: "none" },
                      pressed: { fill: "#E42", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            <Marker coordinates={[location.longitude, location.latitude]}>
              <circle r={10} fill="#F23" />
              <text
                textAnchor="middle"
                y={-20}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                You are here
              </text>
            </Marker>
          </ComposableMap>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default TrackUserLocation;
