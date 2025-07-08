
import { useState } from 'react';
import { Calendar, Download, BookOpen, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const WeeklyLessonPlanner = () => {
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [topics, setTopics] = useState('');
  const [duration, setDuration] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = async () => {
    if (!subject || !gradeLevel || !topics) {
      alert('कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI-powered lesson plan generation
    setTimeout(() => {
      const mockPlan = `साप्ताहिक पाठ योजना - ${subject} (कक्षा ${gradeLevel})

अवधि: ${duration || '1 सप्ताह'}
विषय: ${topics}

दिन 1 (सोमवार):
• परिचय और मुख्य अवधारणाएं
• गतिविधि: समूह चर्चा (20 मिनट)
• होमवर्क: बुनियादी अभ्यास प्रश्न

दिन 2 (मंगलवार):
• विस्तृत व्याख्या और उदाहरण
• गतिविधि: व्यावहारिक प्रदर्शन (30 मिनट)
• होमवर्क: केस स्टडी विश्लेषण

दिन 3 (बुधवार):
• अभ्यास सत्र और समस्या समाधान
• गतिविधि: जोड़ी में कार्य (25 मिनट)
• होमवर्क: अतिरिक्त अभ्यास

दिन 4 (गुरुवार):
• पुनरावलोचना और संदेह निवारण
• गतिविधि: प्रश्नोत्तर सत्र (20 मिनट)
• होमवर्क: पिछले सभी कार्यों की समीक्षा

दिन 5 (शुक्रवार):
• मूल्यांकन और फीडबैक
• गतिविधि: साप्ताहिक टेस्ट (40 मिनट)
• अगले सप्ताह की तैयारी

मुख्य उद्देश्य:
✓ छात्रों की ${topics} में समझ विकसित करना
✓ व्यावहारिक कौशल का विकास
✓ नियमित मूल्यांकन और फीडबैक

आवश्यक संसाधन:
• पाठ्यपुस्तक और संदर्भ सामग्री
• डिजिटल प्रेजेंटेशन टूल्स
• गतिविधि के लिए आवश्यक सामग्री

नोट: यह योजना छात्रों की आवश्यकताओं के अनुसार संशोधित की जा सकती है।`;
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = () => {
    if (!generatedPlan) return;

    const blob = new Blob([generatedPlan], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `साप्ताहिक_पाठ_योजना_${subject}_कक्षा${gradeLevel}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>साप्ताहिक पाठ योजना बनाएं</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">विषय</Label>
              <Input
                id="subject"
                placeholder="जैसे: गणित, विज्ञान, हिंदी..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="grade-level">कक्षा स्तर</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="कक्षा चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">कक्षा 1</SelectItem>
                  <SelectItem value="2nd">कक्षा 2</SelectItem>
                  <SelectItem value="3rd">कक्षा 3</SelectItem>
                  <SelectItem value="4th">कक्षा 4</SelectItem>
                  <SelectItem value="5th">कक्षा 5</SelectItem>
                  <SelectItem value="6th">कक्षा 6</SelectItem>
                  <SelectItem value="7th">कक्षा 7</SelectItem>
                  <SelectItem value="8th">कक्षा 8</SelectItem>
                  <SelectItem value="9th">कक्षा 9</SelectItem>
                  <SelectItem value="10th">कक्षा 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="topics">मुख्य विषय/टॉपिक</Label>
            <Textarea
              id="topics"
              placeholder="इस सप्ताह पढ़ाए जाने वाले मुख्य विषयों का उल्लेख करें..."
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="duration">अवधि (वैकल्पिक)</Label>
            <Input
              id="duration"
              placeholder="जैसे: 1 सप्ताह, 5 दिन..."
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleGeneratePlan}
            disabled={isGenerating || !subject || !gradeLevel || !topics}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white"
          >
            {isGenerating ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                पाठ योजना तैयार हो रही है...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                साप्ताहिक पाठ योजना बनाएं
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>आपकी साप्ताहिक पाठ योजना</span>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>डाउनलोड करें</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedPlan}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeeklyLessonPlanner;
