import { useState, useMemo, useCallback } from 'react';
import { Map, useMap } from '@vis.gl/react-maplibre';
import { middleOfUSA } from './lib/constants';
import { mockProperties, Property } from './lib/mockData';
import YouAreHere from './components/you-are-here';
import SearchBar from './components/SearchBar';
import PropertyList from './components/PropertyList';
import PropertyPins from './components/PropertyPins';
import ReturnToLocationButton from './components/ReturnToLocationButton';
import MapController from './components/MapController';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  // Filter properties based on search queries
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesSearch = searchQuery === '' || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesLocation = locationQuery === '' ||
        property.location.toLowerCase().includes(locationQuery.toLowerCase());
      
      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, locationQuery]);

  const handlePropertySelect = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLocationSearch = useCallback((location: string) => {
    setLocationQuery(location);
  }, []);

  const handleLocationUpdate = useCallback((location: [number, number]) => {
    setCurrentLocation(location);
  }, []);

  return (
    <div className="app-container">
      <div className="map-container">
        <Map
          initialViewState={{
            longitude: middleOfUSA[0],
            latitude: middleOfUSA[1],
            zoom: 2
          }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
        >
          <YouAreHere onLocationUpdate={handleLocationUpdate} />
          <PropertyPins 
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onPropertySelect={handlePropertySelect}
          />
          <MapController selectedProperty={selectedProperty} />
          <ReturnToLocationButton currentLocation={currentLocation} />
        </Map>
      </div>
      
      <div className="sidebar">
        <SearchBar 
          onSearch={handleSearch}
          onLocationSearch={handleLocationSearch}
          properties={mockProperties}
        />
        <PropertyList 
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
        />
      </div>
    </div>
  );
}