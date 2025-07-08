
import { useState } from 'react';
import { Search, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface SchemeResult {
  title: string;
  description: string;
  eligibility: string;
  benefits: string;
  link: string;
}

const SchemeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SchemeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "कृपया योजना का नाम या विषय डालें",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI-based scheme search
    setTimeout(() => {
      const mockResults: SchemeResult[] = [
        {
          title: "प्रधानमंत्री छात्रवृत्ति योजना",
          description: "मेधावी छात्रों के लिए वित्तीय सहायता प्रदान करने वाली योजना",
          eligibility: "12वीं में 85% या उससे अधिक अंक",
          benefits: "₹36,000 प्रति वर्ष तक की छात्रवृत्ति",
          link: "https://scholarships.gov.in"
        },
        {
          title: "बेटी बचाओ बेटी पढ़ाओ",
          description: "बालिकाओं की शिक्षा को बढ़ावा देने वाली सरकारी योजना",
          eligibility: "सभी बालिकाएं आवेदन कर सकती हैं",
          benefits: "निःशुल्क शिक्षा और अन्य लाभ",
          link: "https://wcd.nic.in"
        }
      ];
      setResults(mockResults);
      setLoading(false);
      toast({
        title: `${mockResults.length} योजनाएं मिलीं`,
        description: "विस्तृत जानकारी नीचे देखें",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Search className="w-5 h-5" />
            <span>सरकारी योजना खोजें</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="योजना का नाम या विषय डालें... जैसे 'छात्रवृत्ति', 'शिक्षा सहायता'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {loading ? "खोज रहे हैं..." : "खोजें"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {results.map((scheme, index) => (
          <Card key={index} className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-orange-800 text-lg">{scheme.title}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-orange-300"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    विजिट करें
                  </Button>
                </div>
                
                <p className="text-gray-700">{scheme.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-orange-700">✅ पात्रता:</h4>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700">💰 लाभ:</h4>
                    <p className="text-sm text-gray-600">{scheme.benefits}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchemeSearch;
