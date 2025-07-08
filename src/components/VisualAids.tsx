
import { useState, useRef, useEffect } from 'react';
import { Palette, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const VisualAids = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateDrawing = async () => {
    if (!query.trim()) {
      toast({
        title: "कृपया विषय का विवरण दें",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simple drawing based on query (water cycle example)
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#60a5fa';

      // Draw sun
      ctx.beginPath();
      ctx.arc(100, 80, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Draw cloud
      ctx.beginPath();
      ctx.arc(300, 100, 40, 0, 2 * Math.PI);
      ctx.arc(340, 100, 35, 0, 2 * Math.PI);
      ctx.arc(320, 80, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#e5e7eb';
      ctx.fill();
      ctx.strokeStyle = '#9ca3af';
      ctx.stroke();

      // Draw water
      ctx.beginPath();
      ctx.fillRect(50, 350, 400, 50);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();

      // Add labels
      ctx.fillStyle = '#1f2937';
      ctx.font = '16px Arial';
      ctx.fillText('सूर्य', 80, 130);
      ctx.fillText('बादल', 290, 170);
      ctx.fillText('पानी', 230, 390);

      // Add arrows for water cycle
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      
      // Evaporation arrow
      ctx.beginPath();
      ctx.moveTo(250, 350);
      ctx.lineTo(280, 140);
      ctx.stroke();

      // Rain arrow
      ctx.beginPath();
      ctx.moveTo(320, 140);
      ctx.lineTo(350, 340);
      ctx.stroke();

      setLoading(false);
      toast({
        title: "चित्र तैयार हो गया!",
        description: "आप इसे डाउनलोड कर सकते हैं",
      });
    }, 2000);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `visual-aid-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "चित्र डाउनलोड हो गया!",
      description: "फाइल आपके डाउनलोड फोल्डर में सेव हो गई",
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Palette className="w-5 h-5" />
            <span>विज़ुअल एड्स जेनरेटर</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                क्या बनाना चाहते हैं? (जैसे: जल चक्र, सौर मंडल, पौधे का विकास)
              </label>
              <Input
                placeholder="विस्तार से बताएं कि आप क्या चित्र बनाना चाहते हैं"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={generateDrawing}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 w-full"
            >
              <Palette className="w-4 h-4 mr-2" />
              {loading ? "चित्र बना रहे हैं..." : "चित्र बनाएं"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">📊 जेनरेटेड चित्र:</h3>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadImage}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  डाउनलोड
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCanvas}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  साफ़ करें
                </Button>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="max-w-full border border-gray-200 rounded"
                style={{ background: '#ffffff' }}
              />
            </div>
            
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
              <p className="font-medium">💡 टिप:</p>
              <p>यह चित्र ब्लैकबोर्ड पर आसानी से बनाया जा सकता है। मुख्य आकार और लेबल को ध्यान में रखें।</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualAids;
