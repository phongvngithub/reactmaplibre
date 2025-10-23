import { Property, PropertyPin } from '../lib/mockData';
import { Marker, Popup } from '@vis.gl/react-maplibre';

interface PropertyPinsProps {
  pins: PropertyPin[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
  onPinManage: (pin: PropertyPin) => void;
}

export default function PropertyPins({ pins, selectedProperty, onPropertySelect, onPinManage }: PropertyPinsProps) {
  return (
    <>
      {pins.map((pin) => {
        const mainProperty = pin.properties[0];
        const propertyCount = pin.properties.length;
        const isSelected = selectedProperty && pin.properties.some(p => p.id === selectedProperty.id);
        
        if (!mainProperty) return null;

        return (
          <Marker
            key={pin.id}
            longitude={pin.coordinates[0]}
            latitude={pin.coordinates[1]}
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              if (propertyCount === 1) {
                onPropertySelect(mainProperty);
              } else {
                onPinManage(pin);
              }
            }}
          >
            <div className={`property-marker ${isSelected ? 'selected' : ''} ${propertyCount > 1 ? 'multiple' : ''}`}>
              <div className="marker-price">
                {propertyCount > 1 ? (
                  <span className="property-count">{propertyCount}</span>
                ) : (
                  `$${mainProperty.price}`
                )}
              </div>
              <div className="marker-dot"></div>
              {propertyCount > 1 && (
                <div className="manage-icon" title="Manage properties">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
              )}
            </div>
          </Marker>
        );
      })}
      
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
