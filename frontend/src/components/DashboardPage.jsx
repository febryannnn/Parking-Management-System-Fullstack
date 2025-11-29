import { useState } from 'react';
import { Dashboard } from './Dashboard';
import { ParkingGrid } from './ParkingGrid';
import { VehicleForm } from './VehicleForm';
import { SearchBar } from './SearchBar';

export function DashboardPage({ spots, onAddVehicle, onRemoveVehicle }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredSpots = spots.filter(spot => {
    if (!searchQuery) return true;
    if (!spot.vehicle) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      spot.vehicle.licensePlate.toLowerCase().includes(query) ||
      spot.vehicle.owner.toLowerCase().includes(query) ||
      spot.id.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="px-8 py-6">
          <h1 className="text-gray-900">Parking Management System</h1>
          <p className="text-gray-600 mt-1">Manage and monitor parking spaces in real-time</p>
        </div>
      </header>

      <main className="px-8 py-8">
        <Dashboard spots={spots} />
        
        <div className="mt-8">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="mt-8">
          <ParkingGrid
            spots={searchQuery ? filteredSpots : spots}
            onSpotClick={handleSpotClick}
            onRemoveVehicle={onRemoveVehicle}
            highlightedSpots={searchQuery ? filteredSpots.map(s => s.id) : []}
          />
        </div>
      </main>

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
