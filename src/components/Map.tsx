import type { Place } from "../api/Place";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet"; // Displays maps
import { useEffect, useRef } from "react";
import { TileLayer, MapContainer, Marker } from "react-leaflet"; // Compatibility layer between leaflet and react

interface MapProps {
  place: Place | null;
}

export default function Map({ place }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null); // Generic
  useEffect(() => {
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <MapContainer
      ref={mapRef}
      center={[40.7, -74]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
}
