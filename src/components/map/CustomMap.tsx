import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }: any) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const geocoder = useMemo(() => {
    return googleLoaded ? new google.maps.Geocoder() : null;
  }, [googleLoaded]);

  useEffect(() => {
    const inMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });
      const {Map} = await loader.importLibrary("maps")
      const {Marker}  = await loader.importLibrary("marker") as google.maps.MarkerLibrary

      const position ={
        lat : 43.642693,
        lng: -79.675565
      }

      const mapOptions : google.maps.MapOptions={
        center:position,
        zoom: 15,
        mapId: "My_Map_Id"
      }
      const map = new Map(mapRef.current as  HTMLDivElement , mapOptions)
      const marker = new Marker({
        map:map,
        position: position
      })
    };
    inMap();
  }, [address]);

  return (
    <div style={{ height: "400px", border: "1px solid red" }} ref={mapRef} />
  );
}

export default Map;
