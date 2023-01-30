import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, Socket } from "socket.io-client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 38.736946,
  lng: -9.142685,
};

type LocationObjectCoords = {
  /**
   * The latitude in degrees.
   */
  latitude: number;
  /**
   * The longitude in degrees.
   */
  longitude: number;
  /**
   * The altitude in meters above the WGS 84 reference ellipsoid. Can be `null` on Web if it's not available.
   */
  altitude: number | null;
  /**
   * The radius of uncertainty for the location, measured in meters. Can be `null` on Web if it's not available.
   */
  accuracy: number | null;
  /**
   * The accuracy of the altitude value, in meters. Can be `null` on Web if it's not available.
   */
  altitudeAccuracy: number | null;
  /**
   * Horizontal direction of travel of this device, measured in degrees starting at due north and
   * continuing clockwise around the compass. Thus, north is 0 degrees, east is 90 degrees, south is
   * 180 degrees, and so on. Can be `null` on Web if it's not available.
   */
  heading: number | null;
  /**
   * The instantaneous speed of the device in meters per second. Can be `null` on Web if it's not available.
   */
  speed: number | null;
};

const socket: Socket = connect(process.env.NEXT_PUBLIC_SOCKETADDRESS!);

const Path = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPSAPIKEY!,
  });

  useEffect(() => {
    socket.on("coordinates", (data) => {
      console.log("pure data", data);
      console.log("parsed data", JSON.parse(data));
      const { latitude, longitude } = JSON.parse(data);
      console.log("data", { latitude, longitude });
      setMessage({ latitude, longitude });
    });
  }, [socket]);

  return isLoaded ? (
    <div style={{ width: "100%", height: "100vh" }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {message && (
          <Marker
            position={{ lat: message.latitude, lng: message.longitude }}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Path;
