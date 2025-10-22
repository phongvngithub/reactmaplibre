import { useEffect, useState, useRef } from "react";
import { middleOfUSA } from "../lib/constants";
import { Popup, useMap } from "@vis.gl/react-maplibre";
import { getLocation } from "../lib/api";

interface YouAreHereProps {
  onLocationUpdate?: (location: [number, number]) => void;
}

export default function YouAreHere({ onLocationUpdate }: YouAreHereProps) {
  const [popupLocation, setPopupLocation] = useState(middleOfUSA);
  const { current: map } = useMap();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!map || hasInitialized.current) return;
    
    hasInitialized.current = true;
    
    (async () => {
      const location = await getLocation();
      if (location !== middleOfUSA) {
        setPopupLocation(location);
        map.flyTo({ center: location, zoom: 8 });
        onLocationUpdate?.(location);
      } else {
        onLocationUpdate?.(middleOfUSA);
      }
    })();
  }, [map, onLocationUpdate]);

  if (!map) return null;

  return (
    <Popup
      longitude={popupLocation[0]}
      latitude={popupLocation[1]}>
      <h3>You are approximately here!</h3>
    </Popup>
  );
}