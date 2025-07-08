
import { useState } from 'react';
import { GraduationCap, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface AssessmentReport {
  score: number;
  totalQuestions: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  overallFeedback: string;
}

const AIAssessment = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [currentStep, setCurrentStep] = useState<'setup' | 'assessment' | 'report'>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const { toast } = useToast();

  const startAssessment = () => {
    if (!subject || !grade) {
      toast({
        title: "कृपया विषय और कक्षा चुनें",
        variant: "destructive",
      });
      return;
    }

    // Generate sample questions based on subject
    const sampleQuestions: Question[] = [
      {
        id: 1,
        question: `${subject} में सबसे महत्वपूर्ण अवधारणा कौन सी है?`,
        options: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
        correct: 0
      },
      {
        id: 2,
        question: `${subject} का व्यावहारिक उपयोग क्या है?`,
        options: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
        correct: 1
      },
      {
        id: 3,
        question: `${subject} की कौन सी शाखा सबसे रोचक है?`,
        options: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
        correct: 2
      },
      {
        id: 4,
        question: `${subject} में किस प्रकार की समस्याएं आती हैं?`,
        options: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
        correct: 0
      },
      {
        id: 5,
        question: `${subject} का भविष्य में क्या महत्व होगा?`,
        options: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
        correct: 1
      }
    ];

    setQuestions(sampleQuestions);
    setCurrentStep('assessment');
    toast({
      title: "मूल्यांकन शुरू हो गया!",
      description: "सभी प्रश्नों के उत्तर दें",
    });
  };

  const handleAnswer = (selectedOption: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: selectedOption
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateReport();
    }
  };

  const generateReport = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;

    // Generate AI-based report
    const mockReport: AssessmentReport = {
      score: Math.round(score),
      totalQuestions: questions.length,
      strengths: score >= 70 ? [
        `${subject} की बुनियादी अवधारणाओं की अच्छी समझ`,
        "समस्या समाधान की क्षमता",
        "विषय में रुचि दिखाते हैं"
      ] : [
        "प्रयास करने की इच्छा",
        "सीखने की चाह"
      ],
      weaknesses: score < 70 ? [
        `${subject} की बुनियादी अवधारणाओं को मजबूत करने की जरूरत`,
        "अधिक अभ्यास की आवश्यकता",
        "व्यावहारिक उदाहरणों पर फोकस करें"
      ] : [
        "कुछ विशिष्ट क्षेत्रों में सुधार संभव"
      ],
      recommendations: score >= 70 ? [
        `${subject} के उन्नत विषयों पर काम करें`,
        "प्रैक्टिकल प्रोजेक्ट्स पर फोकस करें",
        "अन्य छात्रों की मदद करें"
      ] : [
        `${subject} की बुनियादी किताबें पढ़ें`,
        "रोज़ाना 30 मिनट अभ्यास करें",
        "शिक्षक से अतिरिक्त मदद लें",
        "ऑनलाइन ट्यूटोरियल देखें"
      ],
      overallFeedback: score >= 80 ? "उत्कृष्ट प्रदर्शन! आप इस विषय में बहुत अच्छे हैं।" :
                       score >= 60 ? "अच्छा प्रदर्शन! थोड़े और अभ्यास से आप और बेहतर हो सकते हैं।" :
                       "चिंता न करें! नियमित अभ्यास से आप जरूर सुधार करेंगे।"
    };

    setReport(mockReport);
    setCurrentStep('report');
    toast({
      title: "रिपोर्ट तैयार हो गई!",
      description: `आपका स्कोर: ${mockReport.score}%`,
    });
  };

  const downloadReport = () => {
    if (!report) return;

    const reportContent = `
AI आधारित मूल्यांकन रिपोर्ट
=============================

विषय: ${subject}
कक्षा: ${grade}
स्कोर: ${report.score}/${report.totalQuestions * 20} (${report.score}%)

मजबूत क्षेत्र:
${report.strengths.map(s => `• ${s}`).join('\n')}

सुधार की आवश्यकता:
${report.weaknesses.map(w => `• ${w}`).join('\n')}

सुझाव:
${report.recommendations.map(r => `• ${r}`).join('\n')}

समग्र फीडबैक:
${report.overallFeedback}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-report-${subject}-${Date.now()}.txt`;
    a.click();

    toast({
      title: "रिपोर्ट डाउनलोड हो गई!",
      description: "फाइल आपके डाउनलोड फोल्डर में सेव हो गई",
    });
  };

  const resetAssessment = () => {
    setCurrentStep('setup');
    setAnswers({});
    setCurrentQuestion(0);
    setReport(null);
    setSubject('');
    setGrade('');
  };

  if (currentStep === 'setup') {
    return (
      <div className="space-y-6">
        <Card className="border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-indigo-800">
              <GraduationCap className="w-5 h-5" />
              <span>AI आधारित मूल्यांकन</span>
            </CardTitle>
            <p className="text-sm text-gray-600">
              अपनी पढ़ाई का मूल्यांकन करें और सुधार के सुझाव पाएं
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">विषय चुनें:</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="विषय चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="गणित">गणित</SelectItem>
                    <SelectItem value="विज्ञान">विज्ञान</SelectItem>
                    <SelectItem value="हिंदी">हिंदी</SelectItem>
                    <SelectItem value="अंग्रेजी">अंग्रेजी</SelectItem>
                    <SelectItem value="सामाजिक विज्ञान">सामाजिक विज्ञान</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">कक्षा चुनें:</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="कक्षा चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">कक्षा 6</SelectItem>
                    <SelectItem value="7">कक्षा 7</SelectItem>
                    <SelectItem value="8">कक्षा 8</SelectItem>
                    <SelectItem value="9">कक्षा 9</SelectItem>
                    <SelectItem value="10">कक्षा 10</SelectItem>
                    <SelectItem value="11">कक्षा 11</SelectItem>
                    <SelectItem value="12">कक्षा 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={startAssessment}
                className="bg-indigo-500 hover:bg-indigo-600 w-full"
              >
                मूल्यांकन शुरू करें
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'assessment') {
    const currentQ = questions[currentQuestion];
    return (
      <div className="space-y-6">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>प्रश्न {currentQuestion + 1} / {questions.length}</span>
              <span className="text-sm text-gray-500">{subject} - कक्षा {grade}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{currentQ.question}</h3>
              
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto"
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'report' && report) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-green-800">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>मूल्यांकन रिपोर्ट</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{report.score}%</div>
                <div className="text-sm">{report.score >= 70 ? '✅ उत्तीर्ण' : '❌ अनुत्तीर्ण'}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-lg font-medium text-gray-800">{report.overallFeedback}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3">💪 आपकी मजबूतियां:</h3>
                  <ul className="space-y-2">
                    {report.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-orange-700 mb-3">🎯 सुधार के क्षेत्र:</h3>
                  <ul className="space-y-2">
                    {report.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-orange-500">→</span>
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-3">📚 सुझाव और सिफारिशें:</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={downloadReport}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  रिपोर्ट डाउनलोड करें
                </Button>
                <Button 
                  onClick={resetAssessment}
                  variant="outline"
                  className="border-gray-300"
                >
                  नया मूल्यांकन करें
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default AIAssessment;
