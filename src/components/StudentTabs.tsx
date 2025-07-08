
import { useState } from 'react';
import { Mic, BookOpen, Search, GamepadIcon, Palette, Heart, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceInterface from '@/components/VoiceInterface';
import InstantKnowledge from '@/components/InstantKnowledge';
import SchemeSearch from '@/components/SchemeSearch';
import GameGenerator from '@/components/GameGenerator';
import VisualAids from '@/components/VisualAids';
import MentalHealthAudio from '@/components/MentalHealthAudio';
import AIAssessment from '@/components/AIAssessment';

type StudentTab = 'voice' | 'knowledge' | 'schemes' | 'games' | 'visual' | 'mental-health' | 'assessment';

const StudentTabs = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>('voice');

  const tabs = [
    { id: 'voice' as StudentTab, label: 'वॉइस असिस्टेंट', icon: Mic },
    { id: 'knowledge' as StudentTab, label: 'ज्ञान केंद्र', icon: BookOpen },
    { id: 'schemes' as StudentTab, label: 'योजना खोज', icon: Search },
    { id: 'games' as StudentTab, label: 'गेम जेनरेटर', icon: GamepadIcon },
    { id: 'visual' as StudentTab, label: 'विज़ुअल एड्स', icon: Palette },
    { id: 'mental-health' as StudentTab, label: 'मानसिक स्वास्थ्य', icon: Heart },
    { id: 'assessment' as StudentTab, label: 'मूल्यांकन', icon: GraduationCap },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'voice':
        return <VoiceInterface />;
      case 'knowledge':
        return <InstantKnowledge />;
      case 'schemes':
        return <SchemeSearch />;
      case 'games':
        return <GameGenerator />;
      case 'visual':
        return <VisualAids />;
      case 'mental-health':
        return <MentalHealthAudio />;
      case 'assessment':
        return <AIAssessment />;
      default:
        return <VoiceInterface />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={`flex items-center space-x-2 text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                  : 'border-blue-200 hover:bg-blue-50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default StudentTabs;
