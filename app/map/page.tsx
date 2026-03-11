'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockLocations = [
  {
    id: '1',
    name: 'Eiffel Tower',
    city: 'Paris',
    country: 'France',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    type: 'Landmark',
    description: 'Iconic iron lattice tower and symbol of Paris',
  },
  {
    id: '2',
    name: 'Louvre Museum',
    city: 'Paris',
    country: 'France',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    type: 'Museum',
    description: 'World\'s largest art museum',
  },
  {
    id: '3',
    name: 'Notre-Dame Cathedral',
    city: 'Paris',
    country: 'France',
    coordinates: { lat: 48.8530, lng: 2.3499 },
    type: 'Historical',
    description: 'Medieval Catholic cathedral',
  },
  {
    id: '4',
    name: 'Shibuya Crossing',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6595, lng: 139.7004 },
    type: 'Landmark',
    description: 'World\'s busiest pedestrian crossing',
  },
  {
    id: '5',
    name: 'Tokyo Tower',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6586, lng: 139.7454 },
    type: 'Landmark',
    description: 'Communications and observation tower',
  },
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = React.useState(mockLocations[0]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [mapCenter, setMapCenter] = React.useState({ lat: 48.8584, lng: 2.2945 });

  const filteredLocations = mockLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: typeof mockLocations[0]) => {
    setSelectedLocation(location);
    setMapCenter(location.coordinates);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20" />

      <div className="relative h-full flex">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-96 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/20 dark:border-gray-700/20 overflow-y-auto"
        >
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Explore Destinations
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Discover amazing places around the world
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {filteredLocations.map((location) => (
                <motion.div
                  key={location.id}
                  whileHover={{ x: 5 }}
                  onClick={() => handleLocationSelect(location)}
                >
                  <GlassCard
                    className={`cursor-pointer transition-all ${
                      selectedLocation.id === location.id
                        ? 'ring-2 ring-blue-500 dark:ring-cyan-500'
                        : ''
                    }`}
                    hover={false}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg flex-shrink-0">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {location.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {location.city}, {location.country}
                        </p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {location.type}
                        </Badge>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-800 dark:to-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                  >
                    <MapPin className="h-10 w-10 text-white" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Interactive Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md">
                      Mapbox integration ready. Add your Mapbox access token to display the interactive map.
                    </p>
                  </div>
                  <GlassCard className="max-w-2xl mx-auto text-left">
                    <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                      {selectedLocation.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {selectedLocation.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge>{selectedLocation.type}</Badge>
                      <span className="text-gray-600 dark:text-gray-300">
                        {selectedLocation.city}, {selectedLocation.country}
                      </span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-mono">
                          {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  size="icon"
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <Navigation className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
