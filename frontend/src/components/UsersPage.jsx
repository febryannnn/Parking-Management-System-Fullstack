import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Phone, Mail, Car } from 'lucide-react';

const dummyUsers = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8900',
    vehicleCount: 2,
    vehicles: ['ABC-1234', 'XYZ-5678'],
    memberSince: '2024-01-15',
    status: 'active',
    totalSpent: 450,
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 234 567 8901',
    vehicleCount: 1,
    vehicles: ['DEF-9012'],
    memberSince: '2024-02-20',
    status: 'active',
    totalSpent: 320,
  },
  {
    id: 'USR003',
    name: 'Michael Johnson',
    email: 'michael.j@email.com',
    phone: '+1 234 567 8902',
    vehicleCount: 3,
    vehicles: ['GHI-3456', 'JKL-7890', 'MNO-1234'],
    memberSince: '2023-12-10',
    status: 'active',
    totalSpent: 680,
  },
  {
    id: 'USR004',
    name: 'Emily Brown',
    email: 'emily.brown@email.com',
    phone: '+1 234 567 8903',
    vehicleCount: 1,
    vehicles: ['PQR-5678'],
    memberSince: '2024-03-05',
    status: 'active',
    totalSpent: 180,
  },
  {
    id: 'USR005',
    name: 'David Wilson',
    email: 'david.w@email.com',
    phone: '+1 234 567 8904',
    vehicleCount: 2,
    vehicles: ['STU-9012', 'VWX-3456'],
    memberSince: '2024-01-28',
    status: 'inactive',
    totalSpent: 520,
  },
  {
    id: 'USR006',
    name: 'Sarah Martinez',
    email: 'sarah.m@email.com',
    phone: '+1 234 567 8905',
    vehicleCount: 1,
    vehicles: ['YZA-7890'],
    memberSince: '2024-02-14',
    status: 'active',
    totalSpent: 290,
  },
  {
    id: 'USR007',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+1 234 567 8906',
    vehicleCount: 2,
    vehicles: ['BCD-1234', 'EFG-5678'],
    memberSince: '2023-11-20',
    status: 'active',
    totalSpent: 750,
  },
  {
    id: 'USR008',
    name: 'Linda Anderson',
    email: 'linda.a@email.com',
    phone: '+1 234 567 8907',
    vehicleCount: 1,
    vehicles: ['HIJ-9012'],
    memberSince: '2024-03-10',
    status: 'active',
    totalSpent: 150,
  },
];

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.vehicles.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: dummyUsers.length,
    active: dummyUsers.filter(u => u.status === 'active').length,
    inactive: dummyUsers.filter(u => u.status === 'inactive').length,
    totalVehicles: dummyUsers.reduce((sum, u) => sum + u.vehicleCount, 0),
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Users Management</h1>
              <p className="text-gray-600 mt-1">Manage registered users and their vehicles</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Active Users</p>
            <p className="text-green-600 mt-2">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Inactive Users</p>
            <p className="text-gray-600 mt-2">{stats.inactive}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Total Vehicles</p>
            <p className="text-gray-900 mt-2">{stats.totalVehicles}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'inactive'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    User Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Vehicles
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="text-gray-900">{user.vehicleCount} vehicle(s)</p>
                          <p className="text-xs text-gray-500">{user.vehicles.join(', ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(user.memberSince).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      ${user.totalSpent}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </main>
    </>
  );
}
