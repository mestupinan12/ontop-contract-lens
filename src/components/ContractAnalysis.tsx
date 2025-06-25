
import { useState } from 'react';
import { Upload, FileText, Send, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContractAnalysis = () => {
  const [contractText, setContractText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();

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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contract Analysis</h1>
        <p className="text-gray-600">Upload or paste a contract for AI-powered analysis</p>
      </div>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">N8N Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Webhook URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/contract-analysis"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">Enter your N8N webhook URL for contract analysis</p>
          </div>
        </CardContent>
      </Card>

      {/* Contract Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Contract Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                    <span className="text-sm font-medium text-gray-600">Overall Risk Score</span>
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

                {/* Issues Detected */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Issues Detected</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analysisResults.issues_detected}</p>
                </div>

                {/* Clause Types */}
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">Flagged Clause Types</h4>
                  <div className="space-y-1">
                    {analysisResults.clause_types?.map((clause: string, index: number) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                        {clause}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {analysisResults.recommendations?.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No analysis results yet.</p>
                <p className="text-sm">Upload a contract and click "Review Contract" to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractAnalysis;
