import { Property } from '../lib/mockData';
import { Marker, Popup } from '@vis.gl/react-maplibre';

interface PropertyPinsProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

export default function PropertyPins({ properties, selectedProperty, onPropertySelect }: PropertyPinsProps) {
  return (
    <>
      {properties.map((property) => (
        <Marker
          key={property.id}
          longitude={property.coordinates[0]}
          latitude={property.coordinates[1]}
          onClick={() => onPropertySelect(property)}
        >
          <div className={`property-marker ${selectedProperty?.id === property.id ? 'selected' : ''}`}>
            <div className="marker-price">${property.price}</div>
            <div className="marker-dot"></div>
          </div>
        </Marker>
      ))}
      
      {selectedProperty && (
        <Popup
          longitude={selectedProperty.coordinates[0]}
          latitude={selectedProperty.coordinates[1]}
          closeButton={false}
          closeOnClick={false}
          className="property-popup"
        >
          <div className="popup-content">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="popup-image"
            />
            <div className="popup-info">
              <h3 className="popup-title">{selectedProperty.title}</h3>
              <div className="popup-location">
                <svg className="popup-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {selectedProperty.location}
              </div>
              <div className="popup-rating">
                <svg className="popup-star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>{selectedProperty.rating}</span>
                <span className="popup-review-count">({selectedProperty.reviewCount})</span>
              </div>
              <div className="popup-price">
                ${selectedProperty.price} <span className="popup-price-period">/ night</span>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
