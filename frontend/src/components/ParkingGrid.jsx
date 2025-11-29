import { ParkingSpotCard } from './ParkingSpotCard';

export function ParkingGrid({ spots, onSpotClick, onRemoveVehicle, highlightedSpots }) {
  const spotsByType = {
    regular: spots.filter(s => s.type === 'regular'),
    handicap: spots.filter(s => s.type === 'handicap'),
    vip: spots.filter(s => s.type === 'vip'),
    motorcycle: spots.filter(s => s.type === 'motorcycle'),
  };

  const renderSection = (title, spots, color) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-4 h-4 rounded ${color}`}></div>
        <h2 className="text-gray-900">{title}</h2>
        <span className="text-gray-500 text-sm">
          ({spots.filter(s => !s.isOccupied).length}/{spots.length} available)
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {spots.map(spot => (
          <ParkingSpotCard
            key={spot.id}
            spot={spot}
            onClick={() => onSpotClick(spot)}
            onRemove={() => onRemoveVehicle(spot.id)}
            isHighlighted={highlightedSpots.includes(spot.id)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-gray-900 mb-6">Parking Layout</h2>
      
      {renderSection('Regular Parking', spotsByType.regular, 'bg-blue-500')}
      {renderSection('Handicap Parking', spotsByType.handicap, 'bg-purple-500')}
      {renderSection('VIP Parking', spotsByType.vip, 'bg-amber-500')}
      {renderSection('Motorcycle Parking', spotsByType.motorcycle, 'bg-green-500')}
    </div>
  );
}
