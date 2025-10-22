# Airbnb-Style Map Explorer

A beautiful, interactive map application built with React and MapLibre GL JS, featuring global property listings with search functionality.

## Features

- 🗺️ **Interactive Map**: Navigate around the world with smooth animations
- 🏠 **Global Properties**: 30+ properties across 6 continents
- 🔍 **Smart Search**: Search by property name, amenities, or location
- 📍 **Location Services**: Automatic location detection and return-to-location button
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Real-time Filtering**: Instant search results with live map updates

## Tech Stack

- **React 18** with TypeScript
- **MapLibre GL JS** for interactive maps
- **@vis.gl/react-maplibre** for React integration
- **Vite** for fast development and building
- **OpenFreeMap** tiles for beautiful map rendering

## Getting Started

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Usage

1. **Explore Properties**: Click on property cards in the sidebar to fly to locations
2. **Search**: Use the search bars to filter properties by name or location
3. **Navigate**: Pan and zoom the map freely
4. **Return Home**: Click "My Location" button to return to your current position

## Project Structure

```
src/
├── components/          # React components
│   ├── MapController.tsx    # Handles map navigation
│   ├── PropertyList.tsx     # Property cards sidebar
│   ├── PropertyPins.tsx     # Map markers
│   ├── ReturnToLocationButton.tsx
│   ├── SearchBar.tsx        # Search functionality
│   └── you-are-here.tsx    # Location detection
├── lib/                # Utilities and data
│   ├── api.ts              # Location API
│   ├── constants.ts        # App constants
│   └── mockData.ts         # Property data
└── app.tsx             # Main application
```

## License

MIT License - feel free to use this project for learning or commercial purposes!
