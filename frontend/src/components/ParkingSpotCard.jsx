import { Car, X, Clock } from 'lucide-react';

export function ParkingSpotCard({ spot, onClick, onRemove, isHighlighted }) {
  const getSpotColor = () => {
    if (isHighlighted) return 'border-yellow-400 bg-yellow-50';
    if (spot.isOccupied) return 'border-red-300 bg-red-50';
    return 'border-green-300 bg-green-50';
  };

  const getTypeColor = () => {
    switch (spot.type) {
      case 'regular':
        return 'bg-blue-500';
      case 'handicap':
        return 'bg-purple-500';
      case 'vip':
        return 'bg-amber-500';
      case 'motorcycle':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTimeParked = () => {
    if (!spot.vehicle) return '';
    const hours = Math.floor(
      (new Date().getTime() - spot.vehicle.entryTime.getTime()) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      ((new Date().getTime() - spot.vehicle.entryTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60)
    );
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div
      className={`relative border-2 rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${getSpotColor()}`}
      onClick={spot.isOccupied ? undefined : onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`${getTypeColor()} text-white px-2 py-1 rounded text-xs`}>
          {spot.id}
        </span>
        {spot.isOccupied && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-center py-4">
        <Car
          className={`w-8 h-8 ${
            spot.isOccupied ? 'text-red-600' : 'text-green-600'
          }`}
        />
      </div>

      {spot.isOccupied && spot.vehicle ? (
        <div className="mt-2 text-xs">
          <p className="text-gray-900 truncate">
            {spot.vehicle.licensePlate}
          </p>
          <p className="text-gray-600 truncate">{spot.vehicle.owner}</p>
          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <Clock className="w-3 h-3" />
            <span>{getTimeParked()}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-green-700 text-xs mt-2">Available</p>
      )}
    </div>
  );
}
