import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapChart() {
  const [userLocation, setUserLocation] = useState([19.4355233,72.7702886]); // Default to London
  const [path, setPath] = useState([]); // Initialize with default location

  useEffect(() => {
    const handlePositionUpdate = (position) => {
      const { latitude, longitude } = position.coords;
      const newLocation = [latitude, longitude];
      setUserLocation(newLocation);
      setPath((prevPath) => [...prevPath, newLocation]);
    };
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(handlePositionUpdate);
      
    }, 500);
    const watchId = navigator.geolocation.watchPosition(handlePositionUpdate);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <>
    <div>{userLocation[0]}</div>
    <div>{userLocation[1]}</div>
    <MapContainer center={userLocation} zoom={13} style={{ height: "100vh", width: "90%",margin:"50px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={userLocation} icon={userIcon}>
        <Popup>
          You are here
        </Popup>
      </Marker>
      <Polyline positions={path} color="blue" />
    </MapContainer>
    </>
  );
}
