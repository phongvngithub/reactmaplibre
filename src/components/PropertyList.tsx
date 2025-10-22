import { useEffect, useRef } from 'react';
import { Property } from '../lib/mockData';

interface PropertyListProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

export default function PropertyList({ properties, selectedProperty, onPropertySelect }: PropertyListProps) {
  const selectedRef = useRef<HTMLDivElement>(null);

  // Scroll to selected property
  useEffect(() => {
    if (selectedProperty && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedProperty]);
  return (
    <div className="property-list">
      <div className="property-list-header">
        <h2>Properties ({properties.length})</h2>
        <div className="property-list-subtitle">Discover amazing places to stay</div>
      </div>
      
      <div className="property-grid">
        {properties.map((property) => (
          <div
            key={property.id}
            ref={selectedProperty?.id === property.id ? selectedRef : null}
            className={`property-card ${selectedProperty?.id === property.id ? 'selected' : ''}`}
            onClick={() => onPropertySelect(property)}
          >
            <div className="property-image-container">
              <img
                src={property.image}
                alt={property.title}
                className="property-image"
                loading="lazy"
              />
              <div className="property-type-badge">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </div>
              {property.host.isSuperhost && (
                <div className="superhost-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Superhost
                </div>
              )}
            </div>
            
            <div className="property-content">
              <div className="property-header">
                <h3 className="property-title">{property.title}</h3>
                <div className="property-rating">
                  <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{property.rating}</span>
                  <span className="review-count">({property.reviewCount})</span>
                </div>
              </div>
              
              <div className="property-location">
                <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {property.location}
              </div>
              
              <div className="property-details">
                <div className="property-specs">
                  <span className="spec">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9,22 9,12 15,12 15,22"></polyline>
                    </svg>
                    {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                  </span>
                  <span className="spec">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                  </span>
                  <span className="spec">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {property.guests} guest{property.guests !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="property-amenities">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="amenity-tag more">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="property-footer">
                <div className="property-price">
                  <span className="price">${property.price}</span>
                  <span className="price-period">/ night</span>
                </div>
                <div className="property-host">
                  <img
                    src={property.host.avatar}
                    alt={property.host.name}
                    className="host-avatar"
                  />
                  <span className="host-name">{property.host.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
