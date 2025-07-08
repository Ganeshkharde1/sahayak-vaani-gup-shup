
import { useState } from 'react';
import { BookOpen, Mic, Search, GamepadIcon, Palette, Heart, GraduationCap, Users, Star, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Mic,
      title: "वॉइस असिस्टेंट",
      description: "आवाज़ में सवाल पूछें और हिंदी में जवाब सुनें",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: BookOpen,
      title: "ज्ञान केंद्र",
      description: "किसी भी विषय की सरल व्याख्या पाएं",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Search,
      title: "योजना खोज",
      description: "सरकारी योजनाओं की जानकारी पाएं",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: GamepadIcon,
      title: "गेम जेनरेटर",
      description: "शैक्षिक खेल बनाएं और डाउनलोड करें",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Palette,
      title: "विज़ुअल एड्स",
      description: "चार्ट और चित्र बनाने में मदद",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Heart,
      title: "मानसिक स्वास्थ्य",
      description: "ऑडियो बुक्स और वेलनेस गाइड",
      color: "bg-red-100 text-red-600"
    }
  ];

  const benefits = [
    "24/7 उपलब्ध AI शिक्षक",
    "हिंदी और अंग्रेजी में समर्थन",
    "व्यक्तिगत शिक्षा योजना",
    "इंटरैक्टिव गेम्स और गतिविधियां",
    "वॉइस-टू-वॉइस इंटरैक्शन",
    "प्रगति ट्रैकिंग और रिपोर्ट"
  ];

  const testimonials = [
    {
      name: "राज कुमार",
      role: "छात्र, कक्षा 10",
      text: "सहायक ने मेरी पढ़ाई में बहुत मदद की है। अब मैं आसानी से कोई भी सवाल पूछ सकता हूँ।"
    },
    {
      name: "सुनीता शर्मा",
      role: "शिक्षिका",
      text: "यह AI असिस्टेंट मेरे छात्रों के लिए बहुत उपयोगी है। यह जटिल विषयों को सरल बनाता है।"
    },
    {
      name: "अमित पटेल",
      role: "अभिभावक",
      text: "मेरे बच्चे को घर पर पढ़ाई में मदद मिल जाती है। बहुत अच्छा प्लेटफॉर्म है।"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
              <span className="text-gradient">सहायक</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              आपका AI शिक्षा सहायक
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              भारतीय छात्रों के लिए बनाया गया - आवाज़ में सवाल पूछें, हिंदी में जवाब सुनें
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              शुरू करें
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              और जानें
            </Button>
          </div>

          {/* Hero Image/Demo */}
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {features.slice(0, 6).map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${feature.color} transform hover:scale-105 transition-transform cursor-pointer`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium text-center">{feature.title}</p>
                    </div>
                  );
                })}
              </div>
              {activeFeature !== null && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-700 text-center">
                    {features[activeFeature]?.description}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              क्यों चुनें सहायक?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              आधुनिक AI तकनीक के साथ, भारतीय छात्रों के लिए विशेष रूप से डिज़ाइन किया गया
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {features.slice(0, 3).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${feature.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* For Students & Teachers */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              छात्रों और शिक्षकों के लिए
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-4">छात्रों के लिए</h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" />वॉइस में सवाल पूछें</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" />तुरंत जवाब पाएं</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" />गेम्स खेलकर सीखें</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" />अपनी प्रगति ट्रैक करें</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4">शिक्षकों के लिए</h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-purple-500" />कहानी जेनरेटर</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-purple-500" />शिक्षण सामग्री बनाएं</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-purple-500" />साप्ताहिक प्लान</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-purple-500" />विज़ुअल एड्स</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              उपयोगकर्ता क्या कहते हैं
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            आज ही शुरू करें अपनी शिक्षा यात्रा
          </h2>
          <p className="text-xl mb-8 opacity-90">
            सहायक के साथ सीखना हुआ आसान और मजेदार
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            अभी शुरू करें
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
