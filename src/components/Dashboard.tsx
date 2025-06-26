
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, CheckCircle, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const contractTypes = [
    { name: 'Partnership Agreement', sla: '4 days', priority: 'high' },
    { name: 'PSP Agreement', sla: '8 days', priority: 'medium' },
    { name: 'Vendor Agreement', sla: '7 days', priority: 'medium' },
    { name: 'MSA (Master Service Agreement)', sla: '8 days', priority: 'medium' },
    { name: 'Service Agreement', sla: '7 days', priority: 'medium' },
    { name: 'DPA (Data Processing Agreement)', sla: '7 days', priority: 'medium' },
    { name: 'NDA (Non-Disclosure Agreement)', sla: '7 days', priority: 'medium' },
  ];

  const monthlyData = [
    { month: 'May', fullyExecuted: 40 },
    { month: 'June', fullyExecuted: 61 },
  ];

  const stats = [
    {
      title: 'Total Contracts',
      value: '76',
      change: 'June 2024',
      changeType: 'neutral' as const,
      icon: FileText,
      bgColor: 'bg-gradient-to-br from-[#FFDEE2] to-[#FFBDC6]',
      iconBg: 'bg-[#DE485D]',
      iconColor: 'text-white',
    },
    {
      title: 'Fully Executed',
      value: '61',
      change: 'June 2024',
      changeType: 'neutral' as const,
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-br from-[#FFBDC6] to-[#FFDEE2]',
      iconBg: 'bg-[#6D2F5A]',
      iconColor: 'text-white',
    },
    {
      title: 'Average Review Time',
      value: '2-4h',
      change: 'Per contract type',
      changeType: 'neutral' as const,
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-[#FFDEE2] to-white',
      iconBg: 'bg-[#DE485D]',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="p-6 space-y-6" style={{ background: 'linear-gradient(135deg, #FFDEE2 0%, #FFDEE2 100%)' }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#23174B' }}>Legtop AI Dashboard</h1>
        <p style={{ color: '#6D2F5A' }}>Overview of contract analysis activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <span className="text-sm font-medium" style={{ color: '#6D2F5A' }}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Chart */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #DE485D, #FF5A70)' }}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#23174B' }}>Monthly Fully Executed Contracts</h3>
            <p className="text-sm" style={{ color: '#6D2F5A' }}>May vs June comparison</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFBDC6" />
              <XAxis 
                dataKey="month" 
                stroke="#6D2F5A"
                fontSize={12}
                fontWeight={500}
              />
              <YAxis 
                stroke="#6D2F5A"
                fontSize={12}
                fontWeight={500}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #FFBDC6',
                  borderRadius: '8px',
                  color: '#23174B'
                }}
              />
              <Bar 
                dataKey="fullyExecuted" 
                fill="#DE485D"
                radius={[4, 4, 0, 0]}
                name="Fully Executed"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
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

      {/* Recent Analysis */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#23174B' }}>Recent Analysis</h3>
        <div className="space-y-4">
          {[
            { name: 'MSA — Finerio', status: 'Approved', time: '2 hours ago', statusColor: '#FFBDC6' },
            { name: 'DPA — DIIO', status: 'Under Review', time: '4 hours ago', statusColor: '#FF8C9C' },
            { name: 'NDA — Kontigo', status: 'Approved', time: '1 day ago', statusColor: '#FFBDC6' },
            { name: 'Others', status: 'Pending', time: '2 days ago', statusColor: '#DE485D' },
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
