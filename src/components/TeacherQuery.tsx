
import { useState } from 'react';
import { Send, FileText, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface TeacherQueryProps {
  onStoryGenerated: (story: string, query: string) => void;
}

const TeacherQuery = ({ onStoryGenerated }: TeacherQueryProps) => {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateStory = async () => {
    if (!query.trim()) {
      toast({
        title: "कृपया प्रश्न दर्ज करें",
        description: "कहानी बनाने के लिए कोई विषय लिखें",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate story generation (you can replace this with actual AI API call)
    setTimeout(() => {
      const sampleStory = `एक बार की बात है, ${query.replace(/generate a story on|कहानी बनाओ|story|कहानी/gi, '').trim() || 'एक अद्भुत विषय'} के बारे में एक रोचक कहानी...

यह कहानी हमें सिखाती है कि जीवन में धैर्य और मेहनत से हर मुश्किल को पार किया जा सकता है। बच्चों को हमेशा सच बोलना चाहिए और अपने सपनों को पूरा करने के लिए कड़ी मेहनत करनी चाहिए।

इस कहानी का मुख्य संदेश यह है कि अच्छाई हमेशा बुराई पर जीत होती है, और हमें कभी हार नहीं मानना चाहिए।`;
      
      onStoryGenerated(sampleStory, query);
      setQuery('');
      setIsGenerating(false);
      
      toast({
        title: "कहानी तैयार है! 📚",
        description: "कहानी सफलतापूर्वक बनाई गई है",
      });
    }, 2000);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">शिक्षक पैनल</h3>
          <p className="text-sm text-gray-600">कहानी जेनरेट करें</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            कहानी का विषय लिखें:
          </label>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="उदाहरण: 'एक बहादुर राजकुमारी की कहानी बनाओ' या 'दोस्ती पर कहानी'"
            className="min-h-[80px] border-purple-200 focus:border-purple-400"
            disabled={isGenerating}
          />
        </div>
        
        <Button
          onClick={handleGenerateStory}
          disabled={isGenerating || !query.trim()}
          className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              कहानी बनाई जा रही है...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              कहानी बनाएं
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default TeacherQuery;
