
import { useState } from 'react';
import { Upload, FileText, Send, AlertTriangle, Shield, CheckCircle, Wifi, WifiOff, Play, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContractAnalysis = () => {
  const [contractText, setContractText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // Mock recent analyses data
  const recentAnalyses = [
    {
      id: 1,
      name: 'Partnership Agreement - TechStartup Inc',
      date: '2024-01-15',
      time: '14:30',
      status: 'High Risk',
      statusColor: '#DE485D'
    },
    {
      id: 2,
      name: 'Service Agreement - ClientCorp',
      date: '2024-01-15',
      time: '11:45',
      status: 'Low Risk',
      statusColor: '#FFBDC6'
    },
    {
      id: 3,
      name: 'NDA - Innovation Labs',
      date: '2024-01-14',
      time: '16:20',
      status: 'Medium Risk',
      statusColor: '#FF8C9C'
    },
    {
      id: 4,
      name: 'Vendor Agreement - SupplyCo',
      date: '2024-01-14',
      time: '09:15',
      status: 'Low Risk',
      statusColor: '#FFBDC6'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
          source: 'ontop-legal-dashboard-test'
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
          description: "Unable to reach the N8N webhook",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      setIsConnected(false);
      toast({
        title: "Connection Test",
        description: "Demo mode - connection test completed",
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
        description: "Please enter your N8N webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    console.log("Sending contract to N8N webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contract_text: contractText,
          timestamp: new Date().toISOString(),
          source: 'ontop-legal-dashboard'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResults(data);
        setIsConnected(true);
        
        toast({
          title: "Analysis Complete",
          description: "Contract has been successfully analyzed",
        });
      } else {
        // Mock results for demo purposes
        const mockResults = {
          risk_score: Math.floor(Math.random() * 100),
          issues_detected: Math.floor(Math.random() * 10) + 1,
          clause_types: ['Liability', 'Termination', 'Payment Terms'],
          recommendations: [
            'Review liability clause for excessive risk exposure',
            'Consider adding force majeure provisions',
            'Clarify payment terms and late fees'
          ],
          key_insights: [
            'Contract contains standard liability limitations',
            'Termination clauses favor the other party',
            'Payment terms are within industry standards'
          ],
          flagged_clauses: [
            'Section 4.2: Unlimited liability exposure',
            'Section 7.1: Immediate termination without cause'
          ]
        };
        setAnalysisResults(mockResults);
        
        toast({
          title: "Analysis Complete",
          description: "Contract has been analyzed (using demo data)",
        });
      }
    } catch (error) {
      console.error("Error analyzing contract:", error);
      
      // Show mock results for demo
      const mockResults = {
        risk_score: Math.floor(Math.random() * 100),
        issues_detected: Math.floor(Math.random() * 10) + 1,
        clause_types: ['Liability', 'Termination', 'Payment Terms'],
        recommendations: [
          'Review liability clause for excessive risk exposure',
          'Consider adding force majeure provisions',
          'Clarify payment terms and late fees'
        ],
        key_insights: [
          'Contract contains standard liability limitations',
          'Termination clauses favor the other party',
          'Payment terms are within industry standards'
        ],
        flagged_clauses: [
          'Section 4.2: Unlimited liability exposure',
          'Section 7.1: Immediate termination without cause'
        ]
      };
      setAnalysisResults(mockResults);
      
      toast({
        title: "Demo Mode",
        description: "Showing mock analysis results for demonstration",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 40) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
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
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/contract-analysis"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs mt-1" style={{ color: '#6D2F5A' }}>Enter your N8N webhook URL for contract analysis</p>
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
                  Test AI
                </>
              )}
            </Button>
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
                <span className="mt-2 text-sm">Click to upload file</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.doc,.docx"
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
              disabled={isAnalyzing || (!contractText.trim() && !webhookUrl.trim())}
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
                  Review Contract
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
            {analysisResults ? (
              <div className="space-y-4">
                {/* Risk Score */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: '#6D2F5A' }}>Overall Risk Score</span>
                    <span className={`text-2xl font-bold ${getRiskLevel(analysisResults.risk_score).color}`}>
                      {analysisResults.risk_score}/100
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          analysisResults.risk_score >= 70 ? 'bg-red-500' :
                          analysisResults.risk_score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${analysisResults.risk_score}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getRiskLevel(analysisResults.risk_score).bg} ${getRiskLevel(analysisResults.risk_score).color}`}>
                    {getRiskLevel(analysisResults.risk_score).level} Risk
                  </span>
                </div>

                {/* Key Insights */}
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2" style={{ color: '#23174B' }}>Key AI Insights</h4>
                  <ul className="space-y-1">
                    {analysisResults.key_insights?.map((insight: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2" style={{ color: '#6D2F5A' }}>
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Flagged Clauses */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="font-medium" style={{ color: '#23174B' }}>Flagged Clauses</span>
                  </div>
                  <ul className="space-y-1">
                    {analysisResults.flagged_clauses?.map((clause: string, index: number) => (
                      <li key={index} className="text-sm" style={{ color: '#DE485D' }}>
                        • {clause}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Issues Detected */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="font-medium" style={{ color: '#23174B' }}>Issues Detected</span>
                  </div>
                  <p className="text-2xl font-bold mt-1" style={{ color: '#23174B' }}>{analysisResults.issues_detected}</p>
                </div>

                {/* Recommendations */}
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2" style={{ color: '#23174B' }}>Recommendations</h4>
                  <ul className="space-y-2">
                    {analysisResults.recommendations?.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span style={{ color: '#6D2F5A' }}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: '#6D2F5A' }}>
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No analysis results yet.</p>
                <p className="text-sm">Upload a contract and click "Review Contract" to get started.</p>
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
                    <p className="text-xs" style={{ color: '#6D2F5A' }}>{analysis.date} at {analysis.time}</p>
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
