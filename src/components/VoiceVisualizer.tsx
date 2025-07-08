
import { useEffect, useState } from 'react';

interface VoiceVisualizerProps {
  isRecording: boolean;
  isSpeaking: boolean;
  audioLevel: number;
}

const VoiceVisualizer = ({ isRecording, isSpeaking, audioLevel }: VoiceVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording || isSpeaking) {
      interval = setInterval(() => {
        setBars(prev => prev.map(() => {
          if (isRecording) {
            return Math.random() * audioLevel * 100 + 10;
          } else if (isSpeaking) {
            return Math.random() * 80 + 20;
          }
          return 0;
        }));
      }, 100);
    } else {
      setBars(Array(12).fill(0));
    }

    return () => clearInterval(interval);
  }, [isRecording, isSpeaking, audioLevel]);

  return (
    <div className="flex items-center justify-center space-x-1 h-20">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-3 rounded-full transition-all duration-150 ${
            isRecording 
              ? 'bg-gradient-to-t from-red-400 to-red-600' 
              : isSpeaking 
                ? 'bg-gradient-to-t from-green-400 to-green-600'
                : 'bg-gray-300'
          }`}
          style={{
            height: `${Math.max(height, 4)}px`,
            opacity: isRecording || isSpeaking ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
