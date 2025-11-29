import { Car, Users, DollarSign, TrendingUp } from 'lucide-react';

export function Dashboard({ spots }) {
  const totalSpots = spots.length;
  const occupiedSpots = spots.filter(s => s.isOccupied).length;
  const availableSpots = totalSpots - occupiedSpots;
  const occupancyRate = Math.round((occupiedSpots / totalSpots) * 100);

  const calculateRevenue = () => {
    let revenue = 0;
    spots.forEach(spot => {
      if (spot.vehicle) {
        const hours = Math.ceil(
          (new Date().getTime() - spot.vehicle.entryTime.getTime()) / (1000 * 60 * 60)
        );
        const ratePerHour = spot.type === 'vip' ? 10 : spot.type === 'handicap' ? 0 : spot.type === 'motorcycle' ? 3 : 5;
        revenue += hours * ratePerHour;
      }
    });
    return revenue;
  };

  const stats = [
    {
      label: 'Total Spots',
      value: totalSpots,
      icon: Car,
      color: 'bg-blue-500',
    },
    {
      label: 'Available',
      value: availableSpots,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Occupied',
      value: occupiedSpots,
      icon: Users,
      color: 'bg-orange-500',
    },
    {
      label: 'Revenue',
      value: `$${calculateRevenue()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-gray-900 mt-2">{stat.value}</p>
                {stat.label === 'Occupied' && (
                  <p className="text-gray-500 text-xs mt-1">{occupancyRate}% occupancy</p>
                )}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
