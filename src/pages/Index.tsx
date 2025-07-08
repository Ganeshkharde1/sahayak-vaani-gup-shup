import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, BookOpen, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import VoiceVisualizer from '@/components/VoiceVisualizer';
import ChatMessage from '@/components/ChatMessage';
import WelcomeCard from '@/components/WelcomeCard';
import TeacherQuery from '@/components/TeacherQuery';
import StoryDisplay from '@/components/StoryDisplay';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'voice' | 'teacher'>('voice');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [storyQuery, setStoryQuery] = useState<string>('');
  const [showStory, setShowStory] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio context for visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Here you would send the audio data to your AI service
          handleAudioResponse("यह एक नमूना उत्तर है। मैं आपकी मदद करने के लिए यहाँ हूँ!");
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start audio level monitoring
      monitorAudioLevel();
      
      toast({
        title: "सुन रहा हूँ... 🎤",
        description: "अपना सवाल पूछें",
      });
      
    } catch (error) {
      toast({
        title: "माइक्रोफोन एक्सेस नहीं मिला",
        description: "कृपया माइक्रोफोन की अनुमति दें",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    setIsRecording(false);
    setAudioLevel(0);
    
    // Add user message placeholder
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "आपका सवाल रिकॉर्ड हो गया है...",
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
  };
  
  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      if (!analyserRef.current || !isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 255);
      
      if (isRecording) {
        requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };
  
  const handleAudioResponse = (responseText: string) => {
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
    
    // Simulate speaking
    if (!isMuted) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };
  
  const clearChat = () => {
    setMessages([]);
    toast({
      title: "चैट साफ़ कर दिया गया",
      description: "नई बातचीत शुरू करें",
    });
  };

  const handleStoryGenerated = (story: string, query: string) => {
    setGeneratedStory(story);
    setStoryQuery(query);
    setShowStory(true);
  };

  const handleCloseStory = () => {
    setShowStory(false);
    setGeneratedStory('');
    setStoryQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-orange-400">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">सहायक</h1>
                <p className="text-sm text-gray-600">आपका AI शिक्षा सहायक</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="border-orange-200 hover:bg-orange-50"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="border-green-200 hover:bg-green-50"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab('voice')}
            variant={activeTab === 'voice' ? 'default' : 'outline'}
            className={`flex items-center space-x-2 ${
              activeTab === 'voice' 
                ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                : 'border-orange-200 hover:bg-orange-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>आवाज़ चैट</span>
          </Button>
          
          <Button
            onClick={() => setActiveTab('teacher')}
            variant={activeTab === 'teacher' ? 'default' : 'outline'}
            className={`flex items-center space-x-2 ${
              activeTab === 'teacher' 
                ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white' 
                : 'border-purple-200 hover:bg-purple-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>शिक्षक पैनल</span>
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'voice' ? (
          <>
            {/* Welcome Card */}
            {messages.length === 0 && <WelcomeCard />}
            
            {/* Chat Messages */}
            <div className="space-y-4 mb-8">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            {/* Voice Interface */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
              <div className="text-center">
                {/* Voice Visualizer */}
                <div className="mb-8">
                  <VoiceVisualizer 
                    isRecording={isRecording} 
                    isSpeaking={isSpeaking}
                    audioLevel={audioLevel}
                  />
                </div>
                
                {/* Main Recording Button */}
                <div className="mb-6">
                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full text-white font-semibold shadow-lg transition-all duration-200 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>
                </div>
                
                {/* Status Text */}
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {isRecording ? "सुन रहा हूँ..." : isSpeaking ? "जवाब दे रहा हूँ..." : "माइक बटन दबाकर सवाल पूछें"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isRecording ? "बोलना समाप्त करने के लिए फिर से बटन दबाएं" : "मैं आपकी पढ़ाई में मदद करने के लिए यहाँ हूँ"}
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Quick Help */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">💡 मुझसे ये सब पूछ सकते हैं:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <p className="text-sm font-medium text-orange-800">📚 पाठ्यक्रम के सवाल</p>
                </Card>
                <Card className="p-4 bg-green-50 border-green-200">
                  <p className="text-sm font-medium text-green-800">🧮 गणित की समस्याएं</p>
                </Card>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <p className="text-sm font-medium text-blue-800">🔬 विज्ञान के प्रयोग</p>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Teacher Panel */}
            <div className="space-y-6">
              <TeacherQuery onStoryGenerated={handleStoryGenerated} />
              
              {/* Show generated story */}
              {showStory && (
                <StoryDisplay 
                  story={generatedStory}
                  query={storyQuery}
                  onClose={handleCloseStory}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
