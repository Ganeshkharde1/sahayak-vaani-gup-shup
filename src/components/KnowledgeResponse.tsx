
import { CheckCircle, Lightbulb, List, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KnowledgeResponse {
  explanation: string;
  analogy: string;
  keyPoints: string[];
}

interface KnowledgeResponseProps {
  response: KnowledgeResponse;
  question: string;
  onClose: () => void;
}

const KnowledgeResponse = ({ response, question, onClose }: KnowledgeResponseProps) => {
  return (
    <Card className="bg-white border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <CheckCircle className="w-5 h-5" />
            <span>आपके सवाल का जवाब</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        {/* Question */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <p className="text-sm text-blue-600 font-medium mb-1">सवाल:</p>
          <p className="text-blue-800">{question}</p>
        </div>

        {/* Explanation */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-800">सरल व्याख्या</h3>
          </div>
          <p className="text-gray-700 leading-relaxed pl-10">{response.explanation}</p>
        </div>

        {/* Analogy */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800">आसान उदाहरण</h3>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg pl-10">
            <p className="text-orange-800 italic">{response.analogy}</p>
          </div>
        </div>

        {/* Key Points */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <List className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800">मुख्य बातें</h3>
          </div>
          <ul className="space-y-2 pl-10">
            {response.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-600 text-center">
            💡 क्या आपका सवाल और भी है? बस माइक बटन दबाकर पूछें!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeResponse;
