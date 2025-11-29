import { useState } from 'react';
import { Search, Car as CarIcon, Bike, Truck, MapPin } from 'lucide-react';
import { GridParkingSpot } from './GridParkingSpot';
import { VehicleForm } from './VehicleForm';

const createGridLayout = (spots) => {
  const grid = Array(8).fill(null).map(() => Array(10).fill(null));
  
  spots.forEach((spot, index) => {
    let row, col;
    
    if (index < 10) {
      row = index;
      col = 0;
    } else if (index < 20) {
      row = index - 10;
      col = 1;
    } else if (index < 28) {
      row = index - 20;
      col = 3;
    } else if (index < 32) {
      row = index - 28;
      col = 5;
    } else if (index < 36) {
      row = index - 32;
      col = 6;
    } else if (index < 44) {
      row = index - 36;
      col = 8;
    } else {
      row = index - 44;
      col = 9;
    }
    
    if (row < 8 && col < 10) {
      grid[row][col] = spot;
    }
  });
  
  return grid;
};

export function ParkingMapPage({ spots, onAddVehicle, onRemoveVehicle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  
  const gridLayout = createGridLayout(spots);

  const handleSpotClick = (spot) => {
    if (!spot.isOccupied) {
      setSelectedSpot(spot);
      setShowForm(true);
    }
  };

  const handleAddVehicle = (vehicleData) => {
    if (!selectedSpot) return;
    onAddVehicle(vehicleData, selectedSpot.id);
    setShowForm(false);
    setSelectedSpot(null);
  };

  const filterButtons = [
    { id: 'all', label: 'ALL', icon: null },
    { id: 'car', label: 'CAR', icon: CarIcon },
    { id: 'motorcycle', label: 'BIKE', icon: Bike },
    { id: 'truck', label: 'TRUCK', icon: Truck },
  ];

  return (
    <>
      <div className="p-8">
        {/* Header with search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
              <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <MapPin className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Vehicle type filters */}
        <div className="flex gap-3 mb-8">
          {filterButtons.map((button) => {
            const Icon = button.icon;
            const isActive = vehicleFilter === button.id;
            
            return (
              <button
                key={button.id}
                onClick={() => setVehicleFilter(button.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{button.label}</span>
              </button>
            );
          })}
        </div>

        {/* Parking Grid */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="grid gap-3" style={{ 
            gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(8, minmax(0, 1fr))'
          }}>
            {gridLayout.map((row, rowIndex) =>
              row.map((spot, colIndex) => (
                <GridParkingSpot
                  key={`${rowIndex}-${colIndex}`}
                  spot={spot}
                  onClick={spot ? () => handleSpotClick(spot) : undefined}
                  onRemove={spot ? () => onRemoveVehicle(spot.id) : undefined}
                  vehicleFilter={vehicleFilter}
                  searchQuery={searchQuery}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showForm && selectedSpot && (
        <VehicleForm
          spot={selectedSpot}
          onSubmit={handleAddVehicle}
          onCancel={() => {
            setShowForm(false);
            setSelectedSpot(null);
          }}
        />
      )}
    </>
  );
}
