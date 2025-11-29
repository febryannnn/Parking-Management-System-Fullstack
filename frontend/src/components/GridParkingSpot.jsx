export function GridParkingSpot({ spot, onClick, vehicleFilter, searchQuery }) {
  if (!spot) {
    return <div className="aspect-square" />;
  }

  const isFiltered = vehicleFilter !== 'all' && spot.vehicle?.vehicleType !== vehicleFilter;
  const isSearchMatch = searchQuery && spot.vehicle && (
    spot.vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSpotStyle = () => {
    if (isSearchMatch) {
      return 'bg-yellow-400 border-yellow-500';
    }
    
    if (!spot.isOccupied) {
      return 'bg-gray-100 border-gray-300';
    }
    
    if (isFiltered) {
      return 'bg-gray-200 border-gray-300 opacity-50';
    }
    
    return 'bg-white border-gray-300';
  };

  return (
    <div
      onClick={!spot.isOccupied ? onClick : undefined}
      className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${getSpotStyle()} ${
        !spot.isOccupied ? 'cursor-pointer hover:border-blue-400 hover:shadow-md' : ''
      }`}
    >
      {spot.isOccupied ? (
        <svg
          viewBox="0 0 48 32"
          className="w-full h-full p-2"
          fill="none"
        >
          {/* Car shape */}
          <path
            d="M8 20 L10 12 L14 10 L34 10 L38 12 L40 20 L38 22 L36 22 L36 25 L32 25 L32 22 L16 22 L16 25 L12 25 L12 22 L10 22 Z"
            fill="#1f2937"
            stroke="#1f2937"
            strokeWidth="1"
          />
          {/* Windows */}
          <path
            d="M14 12 L16 14 L18 14 L20 12 Z"
            fill="#60a5fa"
            opacity="0.7"
          />
          <path
            d="M28 12 L30 14 L32 14 L34 12 Z"
            fill="#60a5fa"
            opacity="0.7"
          />
          {/* Wheels */}
          <circle cx="14" cy="23" r="2.5" fill="#374151" />
          <circle cx="34" cy="23" r="2.5" fill="#374151" />
        </svg>
      ) : (
        <span className="text-xs text-gray-500">{spot.id}</span>
      )}
    </div>
  );
}
