
import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const InstantKnowledge = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<{
    explanation: string;
    analogy: string;
    keyPoints: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "कृपया अपना सवाल लिखें",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const mockResponse = {
        explanation: `${query} के बारे में: यह एक जटिल वैज्ञानिक घटना है जो प्रकाश के प्रकीर्णन से संबंधित है। जब सूर्य की रोशनी वायुमंडल में प्रवेश करती है, तो यह छोटे कणों से टकराती है।`,
        analogy: "यह बिल्कुल वैसे है जैसे आप एक प्रिज्म से सफेद रोशनी को गुजारते हैं और वह इंद्रधनुष के रंगों में बिखर जाती है।",
        keyPoints: [
          "प्रकाश का प्रकीर्णन मुख्य कारण है",
          "नीला रंग सबसे ज्यादा बिखरता है",
          "वायुमंडल में छोटे कण जिम्मेदार हैं",
          "यही कारण है कि सूर्यास्त के समय आसमान लाल दिखता है"
        ]
      };
      setResponse(mockResponse);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <BookOpen className="w-5 h-5" />
            <span>त्वरित ज्ञान केंद्र</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="अपना सवाल यहाँ लिखें... जैसे 'आसमान नीला क्यों होता है?'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "खोज रहे हैं..." : "समझाएं"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {response && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-800 mb-2">📚 व्याख्या:</h3>
                <p className="text-gray-700">{response.explanation}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-800 mb-2">🎯 आसान उदाहरण:</h3>
                <p className="text-gray-700 italic">{response.analogy}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-800 mb-2">🔑 मुख्य बातें:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {response.keyPoints.map((point, index) => (
                    <li key={index} className="text-gray-700">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstantKnowledge;
