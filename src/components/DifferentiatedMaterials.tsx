
import { useState } from 'react';
import { Upload, Download, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const DifferentiatedMaterials = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleGenerateContent = async () => {
    if (!uploadedFile || !description || !gradeLevel) {
      alert('कृपया सभी फ़ील्ड भरें');
      return;
    }

    setIsGenerating(true);
    
    // Simulate content generation
    setTimeout(() => {
      const mockContent = `शिक्षण सामग्री: ${uploadedFile.name}
विवरण: ${description}
कक्षा स्तर: ${gradeLevel}

यह ${gradeLevel} कक्षा के छात्रों के लिए तैयार की गई सामग्री है। इसमें निम्नलिखित विषय शामिल हैं:

1. मुख्य अवधारणाएं
2. अभ्यास प्रश्न
3. गतिविधियां
4. मूल्यांकन

यह सामग्री छात्रों की समझ को बेहतर बनाने के लिए डिज़ाइन की गई है।`;
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedContent) return;

    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `शिक्षण_सामग्री_${gradeLevel}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>शिक्षण सामग्री अपलोड करें</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file-upload">फ़ाइल चुनें</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="mt-1"
            />
            {uploadedFile && (
              <p className="text-sm text-gray-600 mt-2">
                चुनी गई फ़ाइल: {uploadedFile.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">विवरण (एक लाइन में)</Label>
            <Textarea
              id="description"
              placeholder="इस शिक्षण सामग्री का संक्षिप्त विवरण दें..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="grade-level">कक्षा स्तर</Label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="कक्षा चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">कक्षा 1</SelectItem>
                <SelectItem value="2nd">कक्षा 2</SelectItem>
                <SelectItem value="3rd">कक्षा 3</SelectItem>
                <SelectItem value="4th">कक्षा 4</SelectItem>
                <SelectItem value="5th">कक्षा 5</SelectItem>
                <SelectItem value="6th">कक्षा 6</SelectItem>
                <SelectItem value="7th">कक्षा 7</SelectItem>
                <SelectItem value="8th">कक्षा 8</SelectItem>
                <SelectItem value="9th">कक्षा 9</SelectItem>
                <SelectItem value="10th">कक्षा 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerateContent}
            disabled={isGenerating || !uploadedFile || !description || !gradeLevel}
            className="w-full bg-gradient-to-r from-indigo-400 to-indigo-500 text-white"
          >
            {isGenerating ? (
              <>
                <GraduationCap className="w-4 h-4 mr-2 animate-spin" />
                सामग्री तैयार हो रही है...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                सामग्री तैयार करें
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>तैयार की गई सामग्री</span>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>डाउनलोड करें</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DifferentiatedMaterials;
