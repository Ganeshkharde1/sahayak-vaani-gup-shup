
import { Card } from '@/components/ui/card';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isUser 
            ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
            : 'bg-gradient-to-r from-orange-400 to-orange-500'
        }`}>
          {message.isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        
        {/* Message Card */}
        <Card className={`p-4 shadow-md ${
          message.isUser 
            ? 'bg-blue-500 text-white border-blue-200' 
            : 'bg-white border-orange-200'
        }`}>
          <p className={`text-sm leading-relaxed ${
            message.isUser ? 'text-white' : 'text-gray-800'
          }`}>
            {message.text}
          </p>
          <p className={`text-xs mt-2 ${
            message.isUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString('hi-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
