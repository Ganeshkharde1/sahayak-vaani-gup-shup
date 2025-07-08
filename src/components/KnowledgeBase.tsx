
import { useState } from 'react';
import { Book, Lightbulb, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KnowledgeResponse {
  explanation: string;
  analogy: string;
  keyPoints: string[];
}

interface KnowledgeBaseProps {
  question: string;
  onResponse: (response: KnowledgeResponse) => void;
}

const KnowledgeBase = ({ question, onResponse }: KnowledgeBaseProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateKnowledgeResponse = async (query: string): Promise<KnowledgeResponse> => {
    // Simulate AI processing for demonstration
    // In real implementation, this would call an AI service
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Sample responses for common questions
    const sampleResponses: Record<string, KnowledgeResponse> = {
      "आसमान नीला क्यों होता है": {
        explanation: "आसमान नीला इसलिए दिखता है क्योंकि सूरज की रोशनी में सात रंग होते हैं। जब यह रोशनी हमारे वायुमंडल में छोटे कणों से टकराती है, तो नीला रंग ज्यादा बिखरता है।",
        analogy: "यह बिल्कुल वैसे ही है जैसे आप एक प्रिज्म से सफेद रोशनी को देखते हैं और इंद्रधनुष के रंग दिखते हैं। हमारा आसमान एक बड़े प्रिज्म की तरह काम करता है!",
        keyPoints: [
          "सूरज की रोशनी में सभी रंग मिले होते हैं",
          "नीला रंग हवा के कणों से ज्यादा टकराता है",
          "इसलिए आसमान नीला दिखता है"
        ]
      },
      "पानी क्यों जमता है": {
        explanation: "पानी तब जमता है जब इसका तापमान 0 डिग्री सेल्सियस से कम हो जाता है। ठंड में पानी के कण धीमे हो जाते हैं और एक साथ जुड़कर बर्फ बन जाते हैं।",
        analogy: "यह बिल्कुल वैसे ही है जैसे दौड़ते हुए बच्चे अचानक रुक जाएं और हाथ पकड़कर खड़े हो जाएं। पानी के कण भी ऐसे ही जुड़कर बर्फ बनाते हैं!",
        keyPoints: [
          "0 डिग्री सेल्सियस पर पानी जमता है",
          "ठंड में अणु धीमे हो जाते हैं",
          "अणु मिलकर ठोस बर्फ बनाते हैं"
        ]
      }
    };

    const response = sampleResponses[query] || {
      explanation: "यह एक बहुत दिलचस्प सवाल है! मैं इसका जवाब सरल भाषा में देने की कोशिश करता हूँ।",
      analogy: "यह समझने के लिए एक आसान उदाहरण देता हूँ जो आपके दैनिक जीवन से जुड़ा है।",
      keyPoints: [
        "मुख्य बिंदु 1",
        "मुख्य बिंदु 2", 
        "मुख्य बिंदु 3"
      ]
    };

    setIsGenerating(false);
    return response;
  };

  const handleGenerateResponse = async () => {
    const response = await generateKnowledgeResponse(question);
    onResponse(response);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Book className="w-5 h-5" />
          <span>तत्काल ज्ञान केंद्र</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600 mb-2">आपका सवाल:</p>
          <p className="font-medium text-gray-800">{question}</p>
        </div>
        
        <Button
          onClick={handleGenerateResponse}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              जवाब तैयार कर रहा हूँ...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              सरल व्याख्या पाएं
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          आसान भाषा में उदाहरण के साथ समझाया जाएगा
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;
