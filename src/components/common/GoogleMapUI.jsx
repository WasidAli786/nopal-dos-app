"use client";

import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Skeleton } from "@nextui-org/react";

const GoogleMapUI = ({ lat, lng, loadingHeight }) => {
  const center = {
    lat: Number(lat ?? 0),
    lng: Number(lng ?? 0),
  };

  const [libraries] = useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <>
      {!isLoaded ? (
        <div className={loadingHeight ?? "aspect-video"}>
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      ) : (
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="h-full w-full rounded-2xl"
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </>
  );
};

export default GoogleMapUI;
