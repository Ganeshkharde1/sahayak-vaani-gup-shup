
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import { BookOpen } from 'lucide-react';
import UserModeSelector from '@/components/UserModeSelector';
import StudentTabs from '@/components/StudentTabs';
import TeacherPanel from '@/components/TeacherPanel';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [userMode, setUserMode] = useState<'student' | 'teacher'>('student');

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  if (!showDashboard) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-orange-400">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">सहायक</h1>
                <p className="text-sm text-gray-600">आपका AI शिक्षा सहायक</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* User Mode Selection */}
        <UserModeSelector userMode={userMode} onModeChange={setUserMode} />

        {/* Content based on user mode */}
        {userMode === 'student' ? (
          <StudentTabs />
        ) : (
          <TeacherPanel />
        )}
      </div>
    </div>
  );
};

export default Index;
