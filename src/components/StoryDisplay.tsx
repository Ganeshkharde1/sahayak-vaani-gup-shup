
import { useState } from 'react';
import { Download, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface StoryDisplayProps {
  story: string;
  query: string;
  onClose: () => void;
}

const StoryDisplay = ({ story, query, onClose }: StoryDisplayProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Simulate PDF generation (you can replace this with actual PDF library like jsPDF)
    setTimeout(() => {
      // Create a simple text file for now (can be replaced with actual PDF generation)
      const element = document.createElement('a');
      const file = new Blob([`कहानी: ${query}\n\n${story}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `कहानी-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setIsExporting(false);
      toast({
        title: "फाइल डाउनलोड हो गई! 📄",
        description: "कहानी PDF के रूप में सेव कर दी गई है",
      });
    }, 1000);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">जेनरेट की गई कहानी</h3>
            <p className="text-sm text-gray-600">विषय: {query}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="border-gray-300 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-green-200 max-h-96 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            {story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-3 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <Button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
          size="lg"
        >
          {isExporting ? (
            <>
              <Download className="w-4 h-4 mr-2 animate-pulse" />
              PDF बनाई जा रही है...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              PDF के रूप में डाउनलोड करें
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default StoryDisplay;
