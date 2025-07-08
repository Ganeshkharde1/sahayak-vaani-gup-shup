
import { useState } from 'react';
import { GamepadIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type GameType = 'quiz' | 'puzzle';

interface QuizGame {
  title: string;
  questions: string[];
}

interface PuzzleGame {
  title: string;
  activities: string[];
}

type GeneratedGame = QuizGame | PuzzleGame;

const GameGenerator = () => {
  const [query, setQuery] = useState('');
  const [gameType, setGameType] = useState<GameType>('quiz');
  const [generatedGame, setGeneratedGame] = useState<GeneratedGame | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateGame = () => {
    if (!query.trim()) {
      toast({
        title: "कृपया अपना प्रश्न लिखें",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate game generation
    setTimeout(() => {
      if (gameType === 'quiz') {
        const mockQuiz: QuizGame = {
          title: `${query} - क्विज़`,
          questions: [
            "प्रश्न 1: मुख्य अवधारणा क्या है?",
            "प्रश्न 2: इसका उपयोग कहाँ होता है?",
            "प्रश्न 3: इसके फायदे क्या हैं?",
            "प्रश्न 4: इसके नुकसान क्या हैं?",
            "प्रश्न 5: भविष्य में इसकी संभावनाएं क्या हैं?"
          ]
        };
        setGeneratedGame(mockQuiz);
      } else {
        const mockPuzzle: PuzzleGame = {
          title: `${query} - पहेली`,
          activities: [
            "गतिविधि 1: शब्दों को जोड़ें",
            "गतिविधि 2: सही क्रम में लगाएं",
            "गतिविधि 3: छुपे हुए शब्द खोजें",
            "गतिविधि 4: पैटर्न पूरा करें",
            "गतिविधि 5: रहस्य सुलझाएं"
          ]
        };
        setGeneratedGame(mockPuzzle);
      }
      setLoading(false);
    }, 2000);
  };

  const downloadPDF = () => {
    // Mock PDF download
    const content = generatedGame ? 
      ('questions' in generatedGame ? generatedGame.questions : generatedGame.activities) : [];
    
    toast({
      title: "PDF डाउनलोड शुरू हो रहा है",
      description: `${content.length} आइटम के साथ गेम तैयार है`,
    });
  };

  const isQuizGame = (game: GeneratedGame): game is QuizGame => {
    return 'questions' in game;
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <GamepadIcon className="w-5 h-5" />
            <span>शैक्षिक गेम जेनरेटर</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="गेम का विषय लिखें... जैसे 'गणित के सवाल' या 'इतिहास की घटनाएं'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={gameType} onValueChange={(value: GameType) => setGameType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="गेम का प्रकार चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">क्विज़</SelectItem>
                  <SelectItem value="puzzle">पहेली</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={generateGame}
                disabled={loading}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <GamepadIcon className="w-4 h-4 mr-2" />
                {loading ? "तैयार कर रहे हैं..." : "गेम बनाएं"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedGame && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-800">{generatedGame.title}</h3>
                <Button onClick={downloadPDF} className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  PDF डाउनलोड करें
                </Button>
              </div>
              
              <div className="space-y-2">
                {isQuizGame(generatedGame) 
                  ? generatedGame.questions.map((question, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-green-200">
                        <p className="text-gray-700">{question}</p>
                      </div>
                    ))
                  : generatedGame.activities.map((activity, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-green-200">
                        <p className="text-gray-700">{activity}</p>
                      </div>
                    ))
                }
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameGenerator;
