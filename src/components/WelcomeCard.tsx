
import { Card } from '@/components/ui/card';
import { Sparkles, Heart, Star } from 'lucide-react';

const WelcomeCard = () => {
  return (
    <Card className="p-8 mb-8 bg-gradient-to-br from-orange-100 via-white to-green-100 border-2 border-orange-200 shadow-xl">
      <div className="text-center">
        {/* Welcome Header */}
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            नमस्ते! मैं सहायक हूँ 🙏
          </h2>
          
          <p className="text-lg text-gray-600 mb-4">
            आपका AI शिक्षा मित्र - हमेशा मदद के लिए तैयार!
          </p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">आसान सवाल-जवाब</h3>
            <p className="text-sm text-gray-600">किसी भी विषय के बारे में पूछें</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">आवाज़ में बात</h3>
            <p className="text-sm text-gray-600">बोलकर सवाल पूछें और सुनें</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">हमेशा उपलब्ध</h3>
            <p className="text-sm text-gray-600">24/7 आपकी मदद करने को तैयार</p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-white/70 rounded-lg p-6 border border-orange-200">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            🎤 शुरू करने के लिए नीचे माइक बटन दबाएं
          </p>
          <p className="text-sm text-gray-600">
            आप हिंदी या अंग्रेजी में सवाल पूछ सकते हैं
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
