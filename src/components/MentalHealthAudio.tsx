
import { useState, useRef } from 'react';
import { Play, Pause, Volume2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AudioBook {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

const MentalHealthAudio = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const audioBooks: AudioBook[] = [
    {
      id: '1',
      title: 'तनाव मुक्त जीवन',
      description: 'तनाव को कम करने और मानसिक शांति पाने के तरीके',
      duration: '15 मिनट',
      category: 'तनाव प्रबंधन'
    },
    {
      id: '2',
      title: 'सकारात्मक सोच का जादू',
      description: 'अपनी सोच को सकारात्मक बनाने की तकनीकें',
      duration: '12 मिनट',
      category: 'प्रेरणा'
    },
    {
      id: '3',
      title: 'मेडिटेशन और माइंडफुलनेस',
      description: 'ध्यान और सचेतता के अभ्यास',
      duration: '20 मिनट',
      category: 'ध्यान'
    },
    {
      id: '4',
      title: 'आत्मविश्वास बढ़ाने के उपाय',
      description: 'स्वयं पर भरोसा बढ़ाने की गाइड',
      duration: '18 मिनट',
      category: 'आत्मविकास'
    }
  ];

  const playAudio = (audioBook: AudioBook) => {
    if (currentlyPlaying === audioBook.id && isPlaying) {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setCurrentlyPlaying(audioBook.id);
      setIsPlaying(true);
      
      // Simulate audio playback
      toast({
        title: `🎧 ${audioBook.title}`,
        description: "ऑडियो बुक चल रही है...",
      });

      // Auto-stop after some time (simulation)
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentlyPlaying(null);
        toast({
          title: "ऑडियो पूर्ण हुई",
          description: "धन्यवाद! आशा है यह आपके लिए उपयोगी थी।",
        });
      }, 10000);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-pink-800">
            <Heart className="w-5 h-5" />
            <span>मानसिक स्वास्थ्य और कल्याण</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            ऑडियो बुक्स सुनें और अपने मानसिक स्वास्थ्य का ख्याल रखें
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audioBooks.map((audioBook) => (
          <Card key={audioBook.id} className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-purple-800">{audioBook.title}</h3>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {audioBook.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{audioBook.description}</p>
                  <p className="text-xs text-gray-500">⏱️ {audioBook.duration}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => playAudio(audioBook)}
                    variant={currentlyPlaying === audioBook.id && isPlaying ? "destructive" : "default"}
                    className={`${
                      currentlyPlaying === audioBook.id && isPlaying
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    {currentlyPlaying === audioBook.id && isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        रोकें
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        सुनें
                      </>
                    )}
                  </Button>

                  {currentlyPlaying === audioBook.id && isPlaying && (
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-purple-400 animate-pulse"></div>
                        <div className="w-1 h-6 bg-purple-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-3 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-5 bg-purple-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-blue-800 mb-2">🧘‍♀️ मानसिक स्वास्थ्य के लिए टिप्स</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-blue-700">नियमित व्यायाम</p>
                <p>रोज़ाना 30 मिनट का व्यायाम मूड बेहतर बनाता है</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-blue-700">पर्याप्त नींद</p>
                <p>7-8 घंटे की गुणवत्तापूर्ण नींद जरूरी है</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-blue-700">सामाजिक संपर्क</p>
                <p>दोस्तों और परिवार से जुड़े रहें</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default MentalHealthAudio;
