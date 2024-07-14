import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function Map() {
  function CurrentLocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  function DetectClick() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
      },
    });
    return null;
  }

  const position = [51.505, -0.09];
  return (
    <div className="map">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <h5>Location Name</h5>
            <p>Cloudy</p>
          </Popup>
        </Marker>
        {/* <CurrentLocationMarker /> */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
