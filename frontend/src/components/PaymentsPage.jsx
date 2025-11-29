import { useState } from 'react';
import { Search, Download, CreditCard, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const dummyPayments = [
  {
    id: 'PAY001',
    transactionId: 'TXN-2024-001',
    userName: 'John Doe',
    vehiclePlate: 'ABC-1234',
    spotId: 'R1',
    amount: 25,
    paymentMethod: 'card',
    status: 'completed',
    date: '2024-11-29T10:30:00',
    duration: '5 hours',
  },
  {
    id: 'PAY002',
    transactionId: 'TXN-2024-002',
    userName: 'Jane Smith',
    vehiclePlate: 'DEF-9012',
    spotId: 'V1',
    amount: 40,
    paymentMethod: 'digital',
    status: 'completed',
    date: '2024-11-29T09:15:00',
    duration: '4 hours',
  },
  {
    id: 'PAY003',
    transactionId: 'TXN-2024-003',
    userName: 'Michael Johnson',
    vehiclePlate: 'GHI-3456',
    spotId: 'R5',
    amount: 15,
    paymentMethod: 'cash',
    status: 'completed',
    date: '2024-11-29T08:45:00',
    duration: '3 hours',
  },
  {
    id: 'PAY004',
    transactionId: 'TXN-2024-004',
    userName: 'Emily Brown',
    vehiclePlate: 'PQR-5678',
    spotId: 'M2',
    amount: 9,
    paymentMethod: 'card',
    status: 'completed',
    date: '2024-11-29T07:20:00',
    duration: '3 hours',
  },
  {
    id: 'PAY005',
    transactionId: 'TXN-2024-005',
    userName: 'David Wilson',
    vehiclePlate: 'STU-9012',
    spotId: 'R8',
    amount: 30,
    paymentMethod: 'digital',
    status: 'pending',
    date: '2024-11-29T06:00:00',
    duration: '6 hours',
  },
  {
    id: 'PAY006',
    transactionId: 'TXN-2024-006',
    userName: 'Sarah Martinez',
    vehiclePlate: 'YZA-7890',
    spotId: 'V2',
    amount: 50,
    paymentMethod: 'card',
    status: 'completed',
    date: '2024-11-28T18:30:00',
    duration: '5 hours',
  },
  {
    id: 'PAY007',
    transactionId: 'TXN-2024-007',
    userName: 'Robert Taylor',
    vehiclePlate: 'BCD-1234',
    spotId: 'R3',
    amount: 20,
    paymentMethod: 'cash',
    status: 'completed',
    date: '2024-11-28T16:45:00',
    duration: '4 hours',
  },
  {
    id: 'PAY008',
    transactionId: 'TXN-2024-008',
    userName: 'Linda Anderson',
    vehiclePlate: 'HIJ-9012',
    spotId: 'M5',
    amount: 12,
    paymentMethod: 'digital',
    status: 'failed',
    date: '2024-11-28T15:20:00',
    duration: '4 hours',
  },
  {
    id: 'PAY009',
    transactionId: 'TXN-2024-009',
    userName: 'John Doe',
    vehiclePlate: 'XYZ-5678',
    spotId: 'V3',
    amount: 60,
    paymentMethod: 'card',
    status: 'completed',
    date: '2024-11-28T14:00:00',
    duration: '6 hours',
  },
  {
    id: 'PAY010',
    transactionId: 'TXN-2024-010',
    userName: 'Michael Johnson',
    vehiclePlate: 'JKL-7890',
    spotId: 'R10',
    amount: 35,
    paymentMethod: 'digital',
    status: 'completed',
    date: '2024-11-28T12:30:00',
    duration: '7 hours',
  },
];

export function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  const filteredPayments = dummyPayments.filter(payment => {
    const matchesSearch = searchQuery === '' || 
      payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.spotId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const stats = {
    totalRevenue: dummyPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    todayRevenue: dummyPayments
      .filter(p => p.status === 'completed' && p.date.startsWith('2024-11-29'))
      .reduce((sum, p) => sum + p.amount, 0),
    pendingPayments: dummyPayments.filter(p => p.status === 'pending').length,
    totalTransactions: dummyPayments.length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'cash':
        return <DollarSign className="w-4 h-4" />;
      case 'digital':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Payments</h1>
              <p className="text-gray-600 mt-1">Track and manage all payment transactions</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-gray-900 mt-2">${stats.totalRevenue}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Revenue</p>
                <p className="text-gray-900 mt-2">${stats.todayRevenue}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Payments</p>
                <p className="text-gray-900 mt-2">{stats.pendingPayments}</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Transactions</p>
                <p className="text-gray-900 mt-2">{stats.totalTransactions}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, vehicle, transaction ID, or spot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <span className="text-sm text-gray-600 flex items-center">Status:</span>
                {['all', 'completed', 'pending', 'failed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 ml-4">
                <span className="text-sm text-gray-600 flex items-center">Method:</span>
                {['all', 'cash', 'card', 'digital'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setFilterMethod(method)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      filterMethod === method
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Spot
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {payment.userName}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {payment.vehiclePlate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {payment.spotId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {payment.duration}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        {getMethodIcon(payment.paymentMethod)}
                        <span className="capitalize">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(payment.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No payments found</p>
          </div>
        )}
      </main>
    </>
  );
}
