import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './components/DashboardPage';
import { ParkingMapPage } from './components/ParkingMapPage';
import { UsersPage } from './components/UsersPage';
import { PaymentsPage } from './components/PaymentsPage';
import { ReportPage } from './components/ReportPage';

const initialSpots = [
  // Regular spots (1-20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `R${i + 1}`,
    type: 'regular',
    isOccupied: false,
  })),
  // Handicap spots (21-24)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `H${i + 1}`,
    type: 'handicap',
    isOccupied: false,
  })),
  // VIP spots (25-28)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `V${i + 1}`,
    type: 'vip',
    isOccupied: false,
  })),
  // Motorcycle spots (29-36)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `M${i + 1}`,
    type: 'motorcycle',
    isOccupied: false,
  })),
];

export default function App() {
  const [spots, setSpots] = useState(initialSpots);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleAddVehicle = (vehicleData, spotId) => {
    const newVehicle = {
      ...vehicleData,
      id: Math.random().toString(36).substr(2, 9),
      entryTime: new Date(),
      spotId: spotId,
    };

    setSpots(prevSpots =>
      prevSpots.map(spot =>
        spot.id === spotId
          ? { ...spot, isOccupied: true, vehicle: newVehicle }
          : spot
      )
    );
  };

  const handleRemoveVehicle = (spotId) => {
    setSpots(prevSpots =>
      prevSpots.map(spot =>
        spot.id === spotId
          ? { ...spot, isOccupied: false, vehicle: undefined }
          : spot
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1">
        {currentPage === 'dashboard' && (
          <DashboardPage 
            spots={spots}
            onAddVehicle={handleAddVehicle}
            onRemoveVehicle={handleRemoveVehicle}
          />
        )}
        
        {currentPage === 'allotment' && (
          <ParkingMapPage 
            spots={spots}
            onAddVehicle={handleAddVehicle}
            onRemoveVehicle={handleRemoveVehicle}
          />
        )}
        
        {currentPage === 'users' && <UsersPage />}
        
        {currentPage === 'payments' && <PaymentsPage />}
        
        {currentPage === 'report' && <ReportPage />}
      </div>
    </div>
  );
}
