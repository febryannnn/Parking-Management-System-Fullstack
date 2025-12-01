import { useState } from 'react';
import { X } from 'lucide-react';

export function VehicleForm({ spot, onSubmit, onCancel }) {
  const [licensePlate, setLicensePlate] = useState('');
  const [owner, setOwner] = useState('');
  const [vehicleType, setVehicleType] = useState('car');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (licensePlate.trim() && owner.trim()) {
      onSubmit({ licensePlate: licensePlate.toUpperCase(), owner, vehicleType });
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Park Vehicle - Spot {spot.id}</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="licensePlate" className="block text-gray-700 mb-2">
              License Plate *
            </label>
            <input
              type="text"
              id="licensePlate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="ABC-1234"
              required
            />
          </div>

          <div>
            <label htmlFor="owner" className="block text-gray-700 mb-2">
              Owner Name *
            </label>
            <input
              type="text"
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="vehicleType" className="block text-gray-700 mb-2">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="truck">Truck</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Parking Details:</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                <span className="text-gray-500">Spot Type:</span>{" "}
                {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)}
              </p>
              <p className="text-gray-700">
                <span className="text-gray-500">Rate:</span>{" "}
                {spot.type === "vip"
                  ? "$10/hour"
                  : spot.type === "handicap"
                  ? "Free"
                  : spot.type === "motorcycle"
                  ? "$3/hour"
                  : "$5/hour"}
              </p>
              <p className="text-gray-700">
                <span className="text-gray-500">Entry Time:</span>{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Park Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
