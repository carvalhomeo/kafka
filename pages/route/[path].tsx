import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, Socket } from "socket.io-client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -15.793889,
  lng: -47.882778,
};

const socket: Socket = connect(process.env.SOCKETADDRESS!);

const Path = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    id: string;
    lat: number;
    long: number;
    last: boolean;
  }>();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLEMAPSAPIKEY!,
  });

  useEffect(() => {
    socket.on("coordinates", (data) => {
      const coord = JSON.parse(data);
      if (coord.id === router.query.path) {
        setMessage(coord);
      }
    });
  }, [socket]);

  return isLoaded ? (
    <div style={{ width: "100%", height: "100vh" }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {message && (
          <Marker position={{ lat: message.lat, lng: message.long }} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Path;
