import { useState } from 'react';
import { Upload, FileText, Send, AlertTriangle, Shield, CheckCircle, Wifi, WifiOff, Play, Download, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

const ContractAnalysis = () => {
  const [contractText, setContractText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();
  const { webhookUrl, setWebhookUrl, isConnected, setIsConnected } = useSettings();

  // Updated recent analyses data
  const recentAnalyses = [
    {
      id: 1,
      name: 'MSA - Finerio',
      date: '2024-01-15',
      time: '14:30',
      status: 'Approved',
      statusColor: '#FFBDC6',
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      name: 'DPA - DIIO',
      date: '2024-01-15',
      time: '11:45',
      status: 'Under Review',
      statusColor: '#FF8C9C',
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      name: 'NDA - Kontigo',
      date: '2024-01-14',
      time: '16:20',
      status: 'Approved',
      statusColor: '#FFBDC6',
      timeAgo: '1 day ago'
    },
    {
      id: 4,
      name: 'Other - Miscellaneous',
      date: '2024-01-14',
      time: '09:15',
      status: 'Pending',
      statusColor: '#DE485D',
      timeAgo: '2 days ago'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContractText(text);
        toast({
          title: "File uploaded",
          description: `Successfully loaded ${file.name}`,
        });
      };
      reader.readAsText(file);
    }
  };

  const testConnection = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Error", 
        description: "Please enter your N8N webhook URL first",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    console.log("Testing N8N webhook connection:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: 'legtop-dashboard-test'
        }),
      });

      if (response.ok) {
        setIsConnected(true);
        toast({
          title: "Connection Successful",
          description: "N8N webhook is reachable",
        });
      } else {
        setIsConnected(false);
        toast({
          title: "Connection Failed",
          description: `Unable to reach the N8N webhook (Status: ${response.status})`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      setIsConnected(false);
      toast({
        title: "Connection Failed",
        description: "Unable to reach the N8N webhook. Please check your URL and network connection.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const analyzeContract = async () => {
    if (!contractText.trim()) {
      toast({
        title: "Error",
        description: "Please enter contract text or upload a file",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl.trim()) {
      toast({
        title: "Error", 
        description: "Please configure your N8N webhook URL in Settings",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    console.log("Sending contract to N8N webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contract_text: contractText,
          file_name: uploadedFileName || 'contract.txt',
          timestamp: new Date().toISOString(),
          source: 'legtop-dashboard'
        }),
      });

      if (response.ok) {
        const data = await response.text();
        setAnalysisResult(data);
        setIsConnected(true);
        
        toast({
          title: "Analysis Complete",
          description: "Contract has been successfully analyzed by N8N",
        });
      } else {
        setIsConnected(false);
        toast({
          title: "Analysis Failed",
          description: `N8N webhook returned error (Status: ${response.status})`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error analyzing contract:", error);
      setIsConnected(false);
      
      toast({
        title: "Analysis Failed",
        description: "Unable to connect to N8N webhook. Please check your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 space-y-6" style={{ background: 'linear-gradient(135deg, #FFDEE2 0%, #FFDEE2 100%)', minHeight: '100vh' }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#23174B' }}>Contract Analysis</h1>
        <p style={{ color: '#6D2F5A' }}>Upload or paste a contract for AI-powered analysis</p>
      </div>

      {/* Webhook Configuration */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#23174B' }}>
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#DE485D' }}>
              <Shield className="w-4 h-4 text-white m-1" />
            </div>
            N8N Webhook Configuration
            <div className="ml-auto flex items-center gap-2">
              {isConnected ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="text-xs">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-xs">Disconnected</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-n8n-instance.com/webhook/contract-analysis"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs mt-1" style={{ color: '#6D2F5A' }}>
                  Enter your N8N webhook URL for contract analysis. Configure this in Settings for persistence.
                </p>
              </div>
              <Button
                onClick={testConnection}
                disabled={isTesting || !webhookUrl.trim()}
                variant="outline"
                className="shrink-0"
              >
                {isTesting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Test Connection
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#23174B' }}>
              <FileText className="w-5 h-5" />
              Contract Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#23174B' }}>
                Upload Contract File
              </label>
              <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload className="w-8 h-8" />
                <span className="mt-2 text-sm">
                  {uploadedFileName ? uploadedFileName : 'Click to upload file'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#23174B' }}>
                Or Paste Contract Text
              </label>
              <Textarea
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="Paste your contract text here..."
                className="min-h-[300px] resize-none"
              />
            </div>

            {/* Review Button */}
            <Button 
              onClick={analyzeContract}
              disabled={isAnalyzing || !contractText.trim() || !webhookUrl.trim()}
              className="w-full"
              size="lg"
              style={{ backgroundColor: '#DE485D' }}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Contract...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send to N8N for Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#23174B' }}>
              <Shield className="w-5 h-5" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">N8N Analysis Result</span>
                  </div>
                  <div className="text-sm text-blue-800 whitespace-pre-wrap">
                    {analysisResult}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 italic">
                  Analysis completed at {new Date().toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: '#6D2F5A' }}>
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No analysis results yet.</p>
                <p className="text-sm">Upload a contract and click "Send to N8N for Analysis" to get started.</p>
                {!webhookUrl && (
                  <p className="text-sm text-red-600 mt-2">
                    Please configure your N8N webhook URL first.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Analysis List */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
        <CardHeader>
          <CardTitle style={{ color: '#23174B' }}>Recent Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" style={{ color: '#6D2F5A' }} />
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#23174B' }}>{analysis.name}</p>
                    <p className="text-xs" style={{ color: '#6D2F5A' }}>{analysis.timeAgo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: analysis.statusColor }}
                  >
                    {analysis.status}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractAnalysis;
