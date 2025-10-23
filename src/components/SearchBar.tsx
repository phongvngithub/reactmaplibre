import { useState, useEffect, useRef } from 'react';
import { Property, NominatimResult } from '../lib/mockData';
import { searchPlaces } from '../lib/geocoding';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationSearch: (location: string) => void;
  onPlaceSelect: (coordinates: [number, number]) => void;
  properties: Property[];
}

export default function SearchBar({ onSearch, onLocationSearch, onPlaceSelect, properties }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState<NominatimResult[]>([]);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);
  const searchTimeoutRef = useRef<number>();

  const uniqueLocations = Array.from(new Set(properties.map(p => p.location)));

  // Debounced place search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length > 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearchingPlaces(true);
        const results = await searchPlaces(searchQuery);
        setPlaceSuggestions(results);
        setShowPlaceSuggestions(true);
        setIsSearchingPlaces(false);
      }, 300);
    } else {
      setPlaceSuggestions([]);
      setShowPlaceSuggestions(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationSearch(locationQuery);
  };

  const handleLocationSelect = (location: string) => {
    setLocationQuery(location);
    onLocationSearch(location);
    setShowSuggestions(false);
  };

  const handlePlaceSelect = (place: NominatimResult) => {
    const coordinates: [number, number] = [parseFloat(place.lon), parseFloat(place.lat)];
    setSearchQuery(place.display_name);
    onPlaceSelect(coordinates);
    setShowPlaceSuggestions(false);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search places or properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (placeSuggestions.length > 0) {
                  setShowPlaceSuggestions(true);
                }
              }}
              className="search-input"
            />
            {showPlaceSuggestions && (
              <div className="suggestions place-suggestions">
                {isSearchingPlaces && (
                  <div className="suggestion-item loading">
                    <div className="loading-spinner"></div>
                    Searching places...
                  </div>
                )}
                {placeSuggestions.map((place) => (
                  <div
                    key={place.place_id}
                    className="suggestion-item place-suggestion"
                    onClick={() => handlePlaceSelect(place)}
                  >
                    <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div className="place-info">
                      <div className="place-name">{place.display_name}</div>
                      <div className="place-type">{place.type} • {place.class}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <form onSubmit={handleLocationSearch} className="location-form">
          <div className="location-input-group">
            <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              placeholder="Search by location..."
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="location-input"
            />
            {showSuggestions && locationQuery && (
              <div className="suggestions">
                {uniqueLocations
                  .filter(location =>
                    location.toLowerCase().includes(locationQuery.toLowerCase())
                  )
                  .slice(0, 5)
                  .map((location, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {location}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
