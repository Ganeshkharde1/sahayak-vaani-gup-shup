
import { useState } from 'react';
import { MessageSquare, FileText, Upload, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TeacherQuery from '@/components/TeacherQuery';
import StoryDisplay from '@/components/StoryDisplay'; 
import DifferentiatedMaterials from '@/components/DifferentiatedMaterials';
import WeeklyLessonPlanner from '@/components/WeeklyLessonPlanner';

const TeacherPanel = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'planner'>('story');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [storyQuery, setStoryQuery] = useState<string>('');
  const [showStory, setShowStory] = useState(false);

  const handleStoryGenerated = (story: string, query: string) => {
    setGeneratedStory(story);
    setStoryQuery(query);
    setShowStory(true);
  };

  const handleCloseStory = () => {
    setShowStory(false);
    setGeneratedStory('');
    setStoryQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Teacher Tab Navigation */}
      <div className="flex space-x-4">
        <Button
          onClick={() => setActiveTab('story')}
          variant={activeTab === 'story' ? 'default' : 'outline'}
          className={`flex items-center space-x-2 ${
            activeTab === 'story' 
              ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white' 
              : 'border-purple-200 hover:bg-purple-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>कहानी जेनरेटर</span>
        </Button>
        
        <Button
          onClick={() => setActiveTab('materials')}
          variant={activeTab === 'materials' ? 'default' : 'outline'}
          className={`flex items-center space-x-2 ${
            activeTab === 'materials' 
              ? 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white' 
              : 'border-indigo-200 hover:bg-indigo-50'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>शिक्षण सामग्री</span>
        </Button>

        <Button
          onClick={() => setActiveTab('planner')}
          variant={activeTab === 'planner' ? 'default' : 'outline'}
          className={`flex items-center space-x-2 ${
            activeTab === 'planner' 
              ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' 
              : 'border-blue-200 hover:bg-blue-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>साप्ताहिक योजना</span>
        </Button>
      </div>

      {/* Content based on active teacher tab */}
      {activeTab === 'story' ? (
        <>
          <TeacherQuery onStoryGenerated={handleStoryGenerated} />
          
          {/* Show generated story */}
          {showStory && (
            <StoryDisplay 
              story={generatedStory}
              query={storyQuery}
              onClose={handleCloseStory}
            />
          )}
        </>
      ) : activeTab === 'materials' ? (
        <DifferentiatedMaterials />
      ) : (
        <WeeklyLessonPlanner />
      )}
    </div>
  );
};

export default TeacherPanel;
