import { useState } from 'react';
import { Upload, FileText, Trash2, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Uploads = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'MSA_Finerio.pdf',
      size: '2.4 MB',
      uploadDate: '2024-06-20',
      status: 'Analyzed',
      riskLevel: 'Low'
    },
    {
      id: 2,
      name: 'DPA_DIIO.pdf',
      size: '1.8 MB',
      uploadDate: '2024-06-19',
      status: 'Analyzed',
      riskLevel: 'Medium'
    },
    {
      id: 3,
      name: 'NDA_Kontigo.pdf',
      size: '1.5 MB',
      uploadDate: '2024-06-18',
      status: 'Analyzed',
      riskLevel: 'Low'
    },
    {
      id: 4,
      name: 'Others.pdf',
      size: '900 KB',
      uploadDate: '2024-06-17',
      status: 'Analyzed',
      riskLevel: 'Medium'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'Uploaded',
          riskLevel: null
        };
        setUploadedFiles(prev => [newFile, ...prev]);
      });
    }
  };

  const deleteFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const getRiskBadge = (riskLevel: string | null) => {
    if (!riskLevel) return null;
    
    const styles = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[riskLevel as keyof typeof styles]}`}>
        {riskLevel} Risk
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Analyzed': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-gray-100 text-gray-800',
      'Uploaded': 'bg-purple-100 text-purple-800',
      'Error': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Uploads</h1>
        <p className="text-gray-600">Manage your uploaded contracts and documents</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="w-full flex flex-col items-center px-6 py-8 bg-gray-50 text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition-colors">
            <Upload className="w-12 h-12" />
            <span className="mt-2 text-lg font-medium">Click to upload files</span>
            <span className="text-sm">or drag and drop</span>
            <span className="text-xs mt-1">PDF, DOC, DOCX up to 10MB</span>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
          </label>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No files uploaded yet.</p>
              <p className="text-sm">Upload your first contract to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">{file.name}</h3>
                      <p className="text-sm text-gray-500">
                        {file.size} • Uploaded {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(file.status)}
                    {getRiskBadge(file.riskLevel)}
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteFile(file.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Used: 5.2 GB</span>
              <span>Available: 50 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10.4%' }}></div>
            </div>
            <p className="text-xs text-gray-500">
              Files are automatically deleted after 90 days unless marked for retention.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Uploads;
