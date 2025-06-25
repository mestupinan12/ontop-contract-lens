
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, AlertTriangle, CheckCircle, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const riskData = [
    { name: 'High Risk', value: 3, color: '#DE485D' },
    { name: 'Medium Risk', value: 7, color: '#FF8C9C' },
    { name: 'Low Risk', value: 15, color: '#FFBDC6' },
  ];

  const analysisHistory = [
    { month: 'Jan', contracts: 12, risks: 4 },
    { month: 'Feb', contracts: 18, risks: 6 },
    { month: 'Mar', contracts: 15, risks: 3 },
    { month: 'Apr', contracts: 22, risks: 8 },
    { month: 'May', contracts: 28, risks: 5 },
    { month: 'Jun', contracts: 35, risks: 7 },
  ];

  const contractTypes = [
    { name: 'Partnership Agreement', sla: '4 days', priority: 'high' },
    { name: 'PSP Agreement', sla: '8 days', priority: 'medium' },
    { name: 'Vendor Agreement', sla: '7 days', priority: 'medium' },
    { name: 'MSA (Master Service Agreement)', sla: '8 days', priority: 'medium' },
    { name: 'Service Agreement', sla: '7 days', priority: 'medium' },
    { name: 'DPA (Data Processing Agreement)', sla: '7 days', priority: 'medium' },
    { name: 'NDA (Non-Disclosure Agreement)', sla: '7 days', priority: 'medium' },
  ];

  const stats = [
    {
      title: 'Total Contracts',
      value: '130',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      bgColor: 'bg-gradient-to-br from-[#FFDEE2] to-[#FFBDC6]',
      iconBg: 'bg-[#DE485D]',
      iconColor: 'text-white',
    },
    {
      title: 'Risks Detected',
      value: '33',
      change: '-8%',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      bgColor: 'bg-gradient-to-br from-[#FF8C9C] to-[#FF5A70]',
      iconBg: 'bg-[#23174B]',
      iconColor: 'text-white',
    },
    {
      title: 'Approved',
      value: '97',
      change: '+15%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-br from-[#FFBDC6] to-[#FFDEE2]',
      iconBg: 'bg-[#6D2F5A]',
      iconColor: 'text-white',
    },
    {
      title: 'Avg. Review Time',
      value: '2.4h',
      change: '-23%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-[#FFDEE2] to-white',
      iconBg: 'bg-[#DE485D]',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="p-6 space-y-6" style={{ background: 'linear-gradient(135deg, #FFDEE2 0%, #FFDEE2 100%)' }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#23174B' }}>Dashboard</h1>
        <p style={{ color: '#6D2F5A' }}>Overview of contract analysis activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`${stat.bgColor} rounded-lg p-6 border border-white/50 shadow-lg backdrop-blur-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#23174B' }}>{stat.title}</p>
                  <p className="text-2xl font-bold" style={{ color: '#23174B' }}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center shadow-md`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm ml-2" style={{ color: '#6D2F5A' }}>from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contract Types & SLAs Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #DE485D, #FF5A70)' }}>
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#23174B' }}>Contract Types & SLAs</h3>
            <p className="text-sm" style={{ color: '#6D2F5A' }}>Expected review times for different contract types</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contractTypes.map((contract, index) => (
            <div key={index} className="p-4 bg-white/80 rounded-lg border border-white/70 hover:bg-white/90 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm" style={{ color: '#23174B' }}>{contract.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contract.priority === 'high' 
                    ? 'text-white' 
                    : 'text-white'
                }`} style={{ 
                  backgroundColor: contract.priority === 'high' ? '#DE485D' : '#FF8C9C'
                }}>
                  SLA: {contract.sla}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#6D2F5A' }} />
                <span className="text-sm" style={{ color: '#6D2F5A' }}>Review within {contract.sla}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Analysis History */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-lg">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#23174B' }}>Monthly Analysis Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFBDC6" />
              <XAxis dataKey="month" stroke="#6D2F5A" />
              <YAxis stroke="#6D2F5A" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #FFBDC6',
                  borderRadius: '8px',
                  color: '#23174B'
                }}
              />
              <Bar dataKey="contracts" fill="#FF8C9C" name="Contracts" />
              <Bar dataKey="risks" fill="#DE485D" name="Risks Found" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-lg">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#23174B' }}>Risk Distribution</h3>
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
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #FFBDC6',
                  borderRadius: '8px',
                  color: '#23174B'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#23174B' }}>Recent Analysis</h3>
        <div className="space-y-4">
          {[
            { name: 'Service Agreement - TechCorp', status: 'Low Risk', time: '2 hours ago', statusColor: '#FFBDC6' },
            { name: 'Employment Contract - Jane Doe', status: 'Medium Risk', time: '4 hours ago', statusColor: '#FF8C9C' },
            { name: 'NDA - ClientCo', status: 'Low Risk', time: '1 day ago', statusColor: '#FFBDC6' },
            { name: 'Partnership Agreement - StartupXYZ', status: 'High Risk', time: '2 days ago', statusColor: '#DE485D' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-white/70 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" style={{ color: '#6D2F5A' }} />
                <div>
                  <p className="font-medium" style={{ color: '#23174B' }}>{item.name}</p>
                  <p className="text-sm" style={{ color: '#6D2F5A' }}>{item.time}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: item.statusColor }}>
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
