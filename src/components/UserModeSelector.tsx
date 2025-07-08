
import { Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserModeSelectorProps {
  userMode: 'student' | 'teacher';
  onModeChange: (mode: 'student' | 'teacher') => void;
}

const UserModeSelector = ({ userMode, onModeChange }: UserModeSelectorProps) => {
  return (
    <div className="flex space-x-4 mb-8">
      <Button
        onClick={() => onModeChange('student')}
        variant={userMode === 'student' ? 'default' : 'outline'}
        className={`flex items-center space-x-2 ${
          userMode === 'student' 
            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' 
            : 'border-blue-200 hover:bg-blue-50'
        }`}
      >
        <GraduationCap className="w-4 h-4" />
        <span>छात्र</span>
      </Button>
      
      <Button
        onClick={() => onModeChange('teacher')}
        variant={userMode === 'teacher' ? 'default' : 'outline'}
        className={`flex items-center space-x-2 ${
          userMode === 'teacher' 
            ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white' 
            : 'border-purple-200 hover:bg-purple-50'
        }`}
      >
        <Users className="w-4 h-4" />
        <span>शिक्षक</span>
      </Button>
    </div>
  );
};

export default UserModeSelector;
