import { useState } from 'react';
import { Property } from '../lib/mockData';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationSearch: (location: string) => void;
  properties: Property[];
}

export default function SearchBar({ onSearch, onLocationSearch, properties }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const uniqueLocations = Array.from(new Set(properties.map(p => p.location)));

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
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
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
