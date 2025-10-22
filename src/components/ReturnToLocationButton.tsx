import { useMap } from '@vis.gl/react-maplibre';

interface ReturnToLocationButtonProps {
  currentLocation: [number, number] | null;
}

export default function ReturnToLocationButton({ currentLocation }: ReturnToLocationButtonProps) {
  const { current: map } = useMap();

  const handleReturnToLocation = () => {
    if (!map || !currentLocation) return;
    
    map.flyTo({
      center: currentLocation,
      zoom: 8,
      duration: 1500
    });
  };

  if (!currentLocation) return null;

  return (
    <button
      className="return-location-button"
      onClick={handleReturnToLocation}
      title="Return to your location"
    >
      <svg className="return-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>My Location</span>
    </button>
  );
}
