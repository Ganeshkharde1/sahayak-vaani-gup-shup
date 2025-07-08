import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import VoiceVisualizer from '@/components/VoiceVisualizer';
import ChatMessage from '@/components/ChatMessage';
import WelcomeCard from '@/components/WelcomeCard';
import KnowledgeBase from '@/components/KnowledgeBase';
import KnowledgeResponse from '@/components/KnowledgeResponse';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface KnowledgeResponseData {
  explanation: string;
  analogy: string;
  keyPoints: string[];
}

const VoiceInterface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [knowledgeResponse, setKnowledgeResponse] = useState<KnowledgeResponseData | null>(null);
  
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
          // Enhanced response handling with knowledge base
          handleAudioResponse("यह एक नमूना उत्तर है। अगर आपका सवाल जटिल है तो मैं इसे आसान भाषा में समझा सकता हूँ!");
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
    
    // Add user message placeholder and show knowledge base for complex questions
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "आपका सवाल रिकॉर्ड हो गया है...",
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion("आसमान नीला क्यों होता है?"); // Sample question
    setShowKnowledgeBase(true);
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

  const handleKnowledgeResponse = (response: KnowledgeResponseData) => {
    setKnowledgeResponse(response);
    setShowKnowledgeBase(false);
    
    // Add the knowledge response as a message
    const knowledgeMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: `${response.explanation}\n\n${response.analogy}`,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, knowledgeMessage]);
  };

  const handleCloseKnowledgeResponse = () => {
    setKnowledgeResponse(null);
  };
  
  const clearChat = () => {
    setMessages([]);
    setShowKnowledgeBase(false);
    setKnowledgeResponse(null);
    toast({
      title: "चैट साफ़ कर दिया गया",
      description: "नई बातचीत शुरू करें",
    });
  };

  return (
    <>
      {/* Header Controls */}
      <div className="flex items-center justify-end space-x-2 mb-6">
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

      {/* Welcome Card */}
      {messages.length === 0 && <WelcomeCard />}
      
      {/* Chat Messages */}
      <div className="space-y-4 mb-8">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Knowledge Base */}
      {showKnowledgeBase && (
        <div className="mb-6">
          <KnowledgeBase
            question={currentQuestion}
            onResponse={handleKnowledgeResponse}
          />
        </div>
      )}

      {/* Knowledge Response Display */}
      {knowledgeResponse && (
        <div className="mb-6">
          <KnowledgeResponse
            response={knowledgeResponse}
            question={currentQuestion}
            onClose={handleCloseKnowledgeResponse}
          />
        </div>
      )}
      
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
      
      {/* Enhanced Quick Help */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-4">💡 मुझसे ये सब पूछ सकते हैं:</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-orange-50 border-orange-200">
            <p className="text-sm font-medium text-orange-800">📚 पाठ्यक्रम के सवाल</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm font-medium text-green-800">🧮 गणित की समस्याएं</p>
          </Card>
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm font-medium text-blue-800">🔬 विज्ञान के प्रयोग</p>
          </Card>
          <Card className="p-4 bg-purple-50 border-purple-200">
            <p className="text-sm font-medium text-purple-800">🤔 जटिल सवालों की आसान व्याख्या</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VoiceInterface;
