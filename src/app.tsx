import { useState, useMemo, useCallback } from 'react';
import { Map } from '@vis.gl/react-maplibre';
import { middleOfUSA } from './lib/constants';
import { mockProperties, Property, PropertyPin } from './lib/mockData';
import { reverseGeocode } from './lib/geocoding';
import YouAreHere from './components/you-are-here';
import SearchBar from './components/SearchBar';
import PropertyList from './components/PropertyList';
import PropertyPins from './components/PropertyPins';
import ReturnToLocationButton from './components/ReturnToLocationButton';
import MapController from './components/MapController';
import PropertyManager from './components/PropertyManager';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [propertyPins, setPropertyPins] = useState<PropertyPin[]>([]);
  const [managingPin, setManagingPin] = useState<PropertyPin | null>(null);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [mapRef, setMapRef] = useState<any>(null);

  // Group properties by location to create pins
  const groupedProperties = useMemo(() => {
    const groups: Record<string, Property[]> = {};
    
    properties.forEach(property => {
      const key = `${property.coordinates[0]},${property.coordinates[1]}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(property);
    });

    const pins: PropertyPin[] = [];
    Object.entries(groups).forEach(([key, props]) => {
      const [lon, lat] = key.split(',').map(Number);
      pins.push({
        id: key,
        coordinates: [lon, lat],
        location: props[0].location,
        properties: props
      });
    });

    return pins;
  }, [properties]);

  // Filter properties based on search queries
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
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
  }, [properties, searchQuery, locationQuery]);

  // Filter pins based on filtered properties
  const filteredPins = useMemo(() => {
    const filteredIds = new Set(filteredProperties.map(p => p.id));
    return [...groupedProperties, ...propertyPins].map(pin => ({
      ...pin,
      properties: pin.properties.filter(p => filteredIds.has(p.id))
    })).filter(pin => pin.properties.length > 0);
  }, [groupedProperties, propertyPins, filteredProperties]);

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

  const handlePlaceSelect = useCallback((coordinates: [number, number]) => {
    if (mapRef) {
      mapRef.flyTo({
        center: coordinates,
        zoom: 12,
        duration: 1500
      });
    }
  }, [mapRef]);

  const handleMapClick = useCallback(async (event: any) => {
    if (!isAddingPin) return;
    
    const { lng, lat } = event.lngLat;
    const coordinates: [number, number] = [lng, lat];
    
    try {
      const locationName = await reverseGeocode(lat, lng);
      const newPin: PropertyPin = {
        id: Date.now().toString(),
        coordinates,
        location: locationName,
        properties: []
      };
      
      setPropertyPins(prev => [...prev, newPin]);
      setManagingPin(newPin);
      setIsAddingPin(false);
    } catch (error) {
      console.error('Error creating pin:', error);
    }
  }, [isAddingPin]);

  const handlePinPropertiesUpdate = useCallback((updatedProperties: Property[]) => {
    if (!managingPin) return;

    // Update the pin's properties
    setPropertyPins(prev => 
      prev.map(pin => 
        pin.id === managingPin.id 
          ? { ...pin, properties: updatedProperties }
          : pin
      )
    );

    // Update the main properties list
    const existingPropertyIds = new Set(properties.map(p => p.id));
    const newProperties = updatedProperties.filter(p => !existingPropertyIds.has(p.id));
    const updatedExistingProperties = properties.map(p => {
      const updated = updatedProperties.find(up => up.id === p.id);
      return updated || p;
    });

    setProperties([...updatedExistingProperties, ...newProperties]);
    setManagingPin(null);
  }, [managingPin, properties]);

  const handlePinManage = useCallback((pin: PropertyPin) => {
    setManagingPin(pin);
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
          onClick={handleMapClick}
          ref={setMapRef}
          cursor={isAddingPin ? 'crosshair' : 'grab'}
        >
          <YouAreHere onLocationUpdate={handleLocationUpdate} />
          <PropertyPins 
            pins={filteredPins}
            selectedProperty={selectedProperty}
            onPropertySelect={handlePropertySelect}
            onPinManage={handlePinManage}
          />
          <MapController selectedProperty={selectedProperty} />
          <ReturnToLocationButton currentLocation={currentLocation} />
        </Map>
        
        <button 
          className={`add-pin-button ${isAddingPin ? 'active' : ''}`}
          onClick={() => setIsAddingPin(!isAddingPin)}
          title={isAddingPin ? 'Cancel adding pin' : 'Add new pin'}
        >
          {isAddingPin ? '×' : '+'}
        </button>
      </div>
      
      <div className="sidebar">
        <SearchBar 
          onSearch={handleSearch}
          onLocationSearch={handleLocationSearch}
          onPlaceSelect={handlePlaceSelect}
          properties={properties}
        />
        <PropertyList 
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
        />
      </div>

      {managingPin && (
        <PropertyManager
          properties={managingPin.properties}
          location={managingPin.location}
          coordinates={managingPin.coordinates}
          onPropertiesUpdate={handlePinPropertiesUpdate}
          onClose={() => setManagingPin(null)}
        />
      )}
    </div>
  );
}