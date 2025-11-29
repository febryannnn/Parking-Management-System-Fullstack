import { useState } from 'react';
import { Download, Calendar, TrendingUp, Users, Car, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 4200, transactions: 156 },
  { month: 'Feb', revenue: 3800, transactions: 142 },
  { month: 'Mar', revenue: 5100, transactions: 189 },
  { month: 'Apr', revenue: 4600, transactions: 167 },
  { month: 'May', revenue: 5800, transactions: 201 },
  { month: 'Jun', revenue: 6200, transactions: 224 },
  { month: 'Jul', revenue: 7100, transactions: 245 },
  { month: 'Aug', revenue: 6800, transactions: 238 },
  { month: 'Sep', revenue: 6400, transactions: 221 },
  { month: 'Oct', revenue: 7500, transactions: 267 },
  { month: 'Nov', revenue: 8200, transactions: 289 },
  { month: 'Dec', revenue: 9100, transactions: 312 },
];

const spotTypeData = [
  { name: 'Regular', value: 55, count: 20 },
  { name: 'VIP', value: 15, count: 4 },
  { name: 'Handicap', value: 10, count: 4 },
  { name: 'Motorcycle', value: 20, count: 8 },
];

const peakHoursData = [
  { hour: '6 AM', occupancy: 20 },
  { hour: '8 AM', occupancy: 65 },
  { hour: '10 AM', occupancy: 85 },
  { hour: '12 PM', occupancy: 92 },
  { hour: '2 PM', occupancy: 78 },
  { hour: '4 PM', occupancy: 88 },
  { hour: '6 PM', occupancy: 95 },
  { hour: '8 PM', occupancy: 70 },
  { hour: '10 PM', occupancy: 45 },
];

const vehicleTypeData = [
  { type: 'Car', count: 145, percentage: 65 },
  { type: 'Motorcycle', count: 48, percentage: 22 },
  { type: 'Truck', count: 29, percentage: 13 },
];

const COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'];

export function ReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const totalStats = {
    totalRevenue: revenueData.reduce((sum, item) => sum + item.revenue, 0),
    totalTransactions: revenueData.reduce((sum, item) => sum + item.transactions, 0),
    avgDailyRevenue: Math.round(revenueData.reduce((sum, item) => sum + item.revenue, 0) / 12),
    totalUsers: 248,
    occupancyRate: 78,
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive parking management insights</p>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedPeriod('week')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedPeriod === 'week'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setSelectedPeriod('month')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedPeriod === 'month'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setSelectedPeriod('year')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedPeriod === 'year'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Year
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-gray-900 mt-2">${totalStats.totalRevenue.toLocaleString()}</p>
                <p className="text-green-600 text-xs mt-1">+12.5%</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Transactions</p>
                <p className="text-gray-900 mt-2">{totalStats.totalTransactions.toLocaleString()}</p>
                <p className="text-green-600 text-xs mt-1">+8.3%</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Daily Revenue</p>
                <p className="text-gray-900 mt-2">${totalStats.avgDailyRevenue}</p>
                <p className="text-green-600 text-xs mt-1">+5.7%</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-gray-900 mt-2">{totalStats.totalUsers}</p>
                <p className="text-green-600 text-xs mt-1">+15.2%</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Occupancy Rate</p>
                <p className="text-gray-900 mt-2">{totalStats.occupancyRate}%</p>
                <p className="text-green-600 text-xs mt-1">+3.1%</p>
              </div>
              <div className="bg-cyan-500 p-3 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-gray-900 mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grid for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Peak Hours Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Peak Hours Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="occupancy" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Occupancy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Spot Type Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Spot Type Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spotTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {spotTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Type Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-gray-900 mb-6">Vehicle Type Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicleTypeData.map((vehicle, index) => (
              <div key={vehicle.type} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">{vehicle.type}</h3>
                  <span className="text-gray-900">{vehicle.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${vehicle.percentage}%`,
                      backgroundColor: COLORS[index],
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">{vehicle.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Transactions Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">Monthly Transactions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="transactions" fill="#10b981" radius={[8, 8, 0, 0]} name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
}
