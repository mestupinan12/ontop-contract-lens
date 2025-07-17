import { useState } from 'react';
import { Save, Bell, Shield, Database, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

const Settings = () => {
  const [localSettings, setLocalSettings] = useState({
    notifications: {
      emailAlerts: true,
      highRiskAlerts: true,
      weeklyReports: false,
      systemUpdates: true
    },
    analysis: {
      autoAnalyze: false,
      riskThreshold: 70,
      retentionDays: 90
    }
  });

  const { toast } = useToast();
  const { 
    webhookUrl, 
    setWebhookUrl, 
    apiKey, 
    setApiKey, 
    saveSettings: saveGlobalSettings 
  } = useSettings();

  const updateLocalSetting = (category: string, key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Save the global settings (webhook URL and API key)
    saveGlobalSettings();
    
    // Here you could also save localSettings to localStorage if needed
    // localStorage.setItem('app-settings', JSON.stringify(localSettings));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your contract analysis preferences</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Alerts</h4>
              <p className="text-sm text-gray-500">Receive email notifications for important events</p>
            </div>
            <Switch
              checked={localSettings.notifications.emailAlerts}
              onCheckedChange={(checked) => updateLocalSetting('notifications', 'emailAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">High Risk Contract Alerts</h4>
              <p className="text-sm text-gray-500">Get notified when high-risk contracts are detected</p>
            </div>
            <Switch
              checked={localSettings.notifications.highRiskAlerts}
              onCheckedChange={(checked) => updateLocalSetting('notifications', 'highRiskAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Weekly Reports</h4>
              <p className="text-sm text-gray-500">Receive weekly summary reports</p>
            </div>
            <Switch
              checked={localSettings.notifications.weeklyReports}
              onCheckedChange={(checked) => updateLocalSetting('notifications', 'weeklyReports', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">System Updates</h4>
              <p className="text-sm text-gray-500">Be notified about system updates and maintenance</p>
            </div>
            <Switch
              checked={localSettings.notifications.systemUpdates}
              onCheckedChange={(checked) => updateLocalSetting('notifications', 'systemUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Analysis Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto-analyze Uploads</h4>
              <p className="text-sm text-gray-500">Automatically analyze contracts when uploaded</p>
            </div>
            <Switch
              checked={localSettings.analysis.autoAnalyze}
              onCheckedChange={(checked) => updateLocalSetting('analysis', 'autoAnalyze', checked)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Threshold (High Risk Alert)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={localSettings.analysis.riskThreshold}
              onChange={(e) => updateLocalSetting('analysis', 'riskThreshold', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span className="font-medium">{localSettings.analysis.riskThreshold}</span>
              <span>100</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention (Days)
            </label>
            <input
              type="number"
              value={localSettings.analysis.retentionDays}
              onChange={(e) => updateLocalSetting('analysis', 'retentionDays', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="30"
              max="365"
            />
            <p className="text-xs text-gray-500 mt-1">
              Analysis data will be automatically deleted after this period
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Integration Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              N8N Webhook URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/contract-analysis"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { name: 'Carolina Rincon', role: 'Admin', email: 'carolina@legtop.com' },
              { name: 'Rafael Cestari', role: 'Admin', email: 'rafael@legtop.com' },
              { name: 'Alejandro Garcia', role: 'Admin', email: 'alejandro@legtop.com' },
              { name: 'Fadia Faraj', role: 'Admin', email: 'fadia@legtop.com' },
              { name: 'Elisa Correa', role: 'Admin', email: 'elisa@legtop.com' },
              { name: 'Gabriel Espinosa', role: 'Admin', email: 'gabriel@legtop.com' },
              { name: 'Mikaela Estupiñán', role: 'Admin', email: 'mikaela@legtop.com' }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">
            Invite Team Member
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
