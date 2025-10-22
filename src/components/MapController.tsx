import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-maplibre';
import { Property } from '../lib/mockData';

interface MapControllerProps {
  selectedProperty: Property | null;
}

export default function MapController({ selectedProperty }: MapControllerProps) {
  const { current: map } = useMap();
  const previousPropertyRef = useRef<Property | null>(null);

  // Fly to selected property when it changes
  useEffect(() => {
    if (!map || !selectedProperty) return;
    
    // Only fly if it's a different property
    if (previousPropertyRef.current?.id !== selectedProperty.id) {
      previousPropertyRef.current = selectedProperty;
      
      map.flyTo({
        center: selectedProperty.coordinates,
        zoom: 12,
        duration: 1500
      });
    }
  }, [map, selectedProperty]);

  return null; // This component doesn't render anything
}
