
import { useState } from 'react';
import { GamepadIcon, Download, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const GameGenerator = () => {
  const [topic, setTopic] = useState('');
  const [gameType, setGameType] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateGame = async () => {
    if (!topic.trim() || !gameType) {
      toast({
        title: "कृपया विषय और गेम का प्रकार चुनें",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      // Simulate PDF generation
      const gameContent = {
        quiz: {
          title: `${topic} - प्रश्नोत्तरी`,
          questions: [
            "प्रश्न 1: इस विषय की मुख्य परिभाषा क्या है?",
            "प्रश्न 2: इसके मुख्य घटक कौन से हैं?",
            "प्रश्न 3: इसका व्यावहारिक उपयोग क्या है?"
          ]
        },
        puzzle: {
          title: `${topic} - पहेली`,
          activities: [
            "शब्द खोज पहेली",
            "क्रॉसवर्ड पज़ल",
            "मिलान गतिविधि"
          ]
        }
      };

      // Create a simple text content for PDF
      const content = gameType === 'quiz' ? gameContent.quiz : gameContent.puzzle;
      const pdfContent = `${content.title}\n\n${gameType === 'quiz' ? content.questions.join('\n') : content.activities.join('\n')}`;
      
      // Create and download PDF (simplified version)
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${topic}-${gameType}.txt`;
      a.click();
      
      setLoading(false);
      toast({
        title: "गेम तैयार हो गया!",
        description: "फाइल डाउनलोड हो रही है",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <GamepadIcon className="w-5 h-5" />
            <span>शैक्षिक गेम जेनरेटर</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">विषय/टॉपिक:</label>
              <Input
                placeholder="जैसे: गणित, विज्ञान, इतिहास"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">गेम का प्रकार:</label>
              <Select value={gameType} onValueChange={setGameType}>
                <SelectTrigger>
                  <SelectValue placeholder="गेम चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">प्रश्नोत्तरी (Quiz)</SelectItem>
                  <SelectItem value="puzzle">पहेली (Puzzle)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={generateGame}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 w-full"
            >
              <Puzzle className="w-4 h-4 mr-2" />
              {loading ? "गेम बना रहे हैं..." : "गेम बनाएं और डाउनलोड करें"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-blue-800 mb-2">🎮 कैसे काम करता है?</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>1. अपना विषय और गेम का प्रकार चुनें</p>
              <p>2. AI आपके लिए कस्टम गेम बनाएगा</p>
              <p>3. PDF फाइल डाउनलोड करें और क्लास में उपयोग करें</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameGenerator;
