
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const riskData = [
    { name: 'High Risk', value: 3, color: '#ef4444' },
    { name: 'Medium Risk', value: 7, color: '#f59e0b' },
    { name: 'Low Risk', value: 15, color: '#10b981' },
  ];

  const analysisHistory = [
    { month: 'Jan', contracts: 12, risks: 4 },
    { month: 'Feb', contracts: 18, risks: 6 },
    { month: 'Mar', contracts: 15, risks: 3 },
    { month: 'Apr', contracts: 22, risks: 8 },
    { month: 'May', contracts: 28, risks: 5 },
    { month: 'Jun', contracts: 35, risks: 7 },
  ];

  const stats = [
    {
      title: 'Total Contracts',
      value: '130',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
    },
    {
      title: 'Risks Detected',
      value: '33',
      change: '-8%',
      changeType: 'positive' as const,
      icon: AlertTriangle,
    },
    {
      title: 'Approved',
      value: '97',
      change: '+15%',
      changeType: 'positive' as const,
      icon: CheckCircle,
    },
    {
      title: 'Avg. Review Time',
      value: '2.4h',
      change: '-23%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of contract analysis activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Analysis History */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Analysis Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="contracts" fill="#3b82f6" name="Contracts" />
              <Bar dataKey="risks" fill="#ef4444" name="Risks Found" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis</h3>
        <div className="space-y-4">
          {[
            { name: 'Service Agreement - TechCorp', status: 'Low Risk', time: '2 hours ago' },
            { name: 'Employment Contract - Jane Doe', status: 'Medium Risk', time: '4 hours ago' },
            { name: 'NDA - ClientCo', status: 'Low Risk', time: '1 day ago' },
            { name: 'Partnership Agreement - StartupXYZ', status: 'High Risk', time: '2 days ago' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === 'High Risk' ? 'bg-red-100 text-red-800' :
                item.status === 'Medium Risk' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
