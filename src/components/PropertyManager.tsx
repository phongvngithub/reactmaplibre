import { useState } from 'react';
import { Property } from '../lib/mockData';

interface PropertyManagerProps {
  properties: Property[];
  location: string;
  coordinates: [number, number];
  onPropertiesUpdate: (properties: Property[]) => void;
  onClose: () => void;
}

const defaultImages = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop'
];

const defaultAvatars = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
];

export default function PropertyManager({ properties, location, coordinates, onPropertiesUpdate, onClose }: PropertyManagerProps) {
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const createNewProperty = (): Property => ({
    id: Date.now().toString(),
    title: '',
    location,
    coordinates,
    price: 100,
    rating: 4.5,
    reviewCount: 0,
    image: defaultImages[Math.floor(Math.random() * defaultImages.length)],
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi'],
    host: {
      name: 'New Host',
      avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
      isSuperhost: false
    },
    description: ''
  });

  const handleAddProperty = () => {
    const newProperty = createNewProperty();
    setEditingProperty(newProperty);
    setIsAddingNew(true);
  };

  const handleSaveProperty = (property: Property) => {
    let updatedProperties;
    if (isAddingNew) {
      updatedProperties = [...properties, property];
    } else {
      updatedProperties = properties.map(p => p.id === property.id ? property : p);
    }
    onPropertiesUpdate(updatedProperties);
    setEditingProperty(null);
    setIsAddingNew(false);
  };

  const handleDeleteProperty = (propertyId: string) => {
    const updatedProperties = properties.filter(p => p.id !== propertyId);
    onPropertiesUpdate(updatedProperties);
  };

  const handleCancel = () => {
    setEditingProperty(null);
    setIsAddingNew(false);
  };

  return (
    <div className="property-manager-overlay">
      <div className="property-manager">
        <div className="property-manager-header">
          <h2>Manage Properties</h2>
          <p className="location-info">{location}</p>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="property-manager-content">
          {editingProperty ? (
            <PropertyForm
              property={editingProperty}
              onSave={handleSaveProperty}
              onCancel={handleCancel}
              isNew={isAddingNew}
            />
          ) : (
            <>
              <div className="property-manager-actions">
                <button className="add-property-btn" onClick={handleAddProperty}>
                  + Add New Property
                </button>
              </div>

              <div className="properties-list">
                {properties.length === 0 ? (
                  <div className="empty-state">
                    <p>No properties at this location yet.</p>
                    <button onClick={handleAddProperty}>Add the first property</button>
                  </div>
                ) : (
                  properties.map(property => (
                    <div key={property.id} className="property-item">
                      <img src={property.image} alt={property.title} className="property-thumb" />
                      <div className="property-details">
                        <h3>{property.title}</h3>
                        <p>${property.price}/night • {property.bedrooms} bed • {property.bathrooms} bath</p>
                        <p className="property-description">{property.description}</p>
                      </div>
                      <div className="property-actions">
                        <button onClick={() => setEditingProperty(property)}>Edit</button>
                        <button 
                          onClick={() => handleDeleteProperty(property.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface PropertyFormProps {
  property: Property;
  onSave: (property: Property) => void;
  onCancel: () => void;
  isNew: boolean;
}

function PropertyForm({ property, onSave, onCancel, isNew }: PropertyFormProps) {
  const [formData, setFormData] = useState(property);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a property title');
      return;
    }
    onSave(formData);
  };

  const updateField = (field: keyof Property, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateHostField = (field: keyof Property['host'], value: any) => {
    setFormData(prev => ({
      ...prev,
      host: { ...prev.host, [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <h3>{isNew ? 'Add New Property' : 'Edit Property'}</h3>
      
      <div className="form-row">
        <label>
          Title *
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Property title"
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Type
          <select
            value={formData.type}
            onChange={(e) => updateField('type', e.target.value)}
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="condo">Condo</option>
          </select>
        </label>
        <label>
          Price per night
          <input
            type="number"
            value={formData.price}
            onChange={(e) => updateField('price', parseInt(e.target.value))}
            min="1"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Bedrooms
          <input
            type="number"
            value={formData.bedrooms}
            onChange={(e) => updateField('bedrooms', parseInt(e.target.value))}
            min="0"
          />
        </label>
        <label>
          Bathrooms
          <input
            type="number"
            value={formData.bathrooms}
            onChange={(e) => updateField('bathrooms', parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Max Guests
          <input
            type="number"
            value={formData.guests}
            onChange={(e) => updateField('guests', parseInt(e.target.value))}
            min="1"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Host Name
          <input
            type="text"
            value={formData.host.name}
            onChange={(e) => updateHostField('name', e.target.value)}
          />
        </label>
        <label>
          Superhost
          <input
            type="checkbox"
            checked={formData.host.isSuperhost}
            onChange={(e) => updateHostField('isSuperhost', e.target.checked)}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Description
          <textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={3}
            placeholder="Property description"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Amenities (comma-separated)
          <input
            type="text"
            value={formData.amenities.join(', ')}
            onChange={(e) => updateField('amenities', e.target.value.split(',').map(a => a.trim()).filter(a => a))}
            placeholder="WiFi, Kitchen, Pool, etc."
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {isNew ? 'Add Property' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}