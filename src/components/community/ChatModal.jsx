import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Shield,
  MapPin,
  Calendar,
  Sparkles,
  ShieldAlert,
  CheckCheck,
  Smile,
  Compass
} from 'lucide-react';

export default function ChatModal({
  isOpen,
  onClose,
  targetUser,
  messages = [],
  onSendMessage,
  onOpenReportModal
}) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  if (!isOpen || !targetUser) return null;

  const userMessages = messages[targetUser.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages, isTyping]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      text: textToSend.trim(),
      timestamp: 'Just now',
      read: true
    };

    onSendMessage(targetUser.id, newMsg);
    setInputText('');

    // Simulate friendly reply after 1.5s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        `That sounds lovely! ${targetUser.pet.name} will be thrilled to meet you. See you around the grass lawn!`,
        `Perfect! I'll carry extra hydration bowls. Sunset walks in Pune this week have been wonderful.`,
        `Count us in! Let's meet near the main gate. Looking forward to our pack stroll! 🐾`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMsg = {
        id: `msg-reply-${Date.now()}`,
        senderId: targetUser.id,
        text: randomReply,
        timestamp: 'Just now',
        read: true
      };

      onSendMessage(targetUser.id, replyMsg);
    }, 1800);
  };

  const quickMeetups = [
    `Meet at Jogger’s Park tomorrow at 6:15 PM?`,
    `Are you going for the Sunday morning Vetal Tekdi trek?`,
    `Let's do a short 20-min sniff walk around the lane!`
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[580px] sm:h-[620px] shadow-2xl border border-stone-200 flex flex-col justify-between overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-stone-200/80 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={targetUser.avatar}
                alt={targetUser.name}
                className="w-10 h-10 rounded-full object-cover border border-stone-300"
              />
              <img
                src={targetUser.pet.photo}
                alt={targetUser.pet.name}
                className="w-5 h-5 rounded-full object-cover absolute -bottom-1 -right-1 border border-white"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm text-stone-900">{targetUser.name}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                  with {targetUser.pet.name}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                {targetUser.neighborhood} • {targetUser.distance}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onOpenReportModal(targetUser)}
              title="Report or Block User"
              className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safety Banner */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-900">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mutual Friend Chat • Exact home locations stay private</span>
          </div>
          <span className="font-bold text-emerald-800">Verified</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]">
          {userMessages.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              <p className="font-bold text-stone-600">No messages yet with {targetUser.name}</p>
              <p className="mt-1">Say hello and coordinate a joint walk in Pune!</p>
            </div>
          ) : (
            userMessages.map((msg) => {
              const isMe = msg.senderId === 'current-user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1 flex items-center gap-1">
                    {msg.timestamp}
                    {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                  </span>
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 text-stone-400 text-xs bg-white px-3 py-2 rounded-2xl w-fit border border-stone-200 shadow-2xs">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-stone-500 ml-1">{targetUser.name} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Meetup Suggestions */}
        <div className="px-3 pt-2 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-semibold text-stone-600">
          <span className="text-[10px] text-stone-400 uppercase font-bold shrink-0">Quick Plan:</span>
          {quickMeetups.map((qm, i) => (
            <button
              key={i}
              onClick={() => handleSend(qm)}
              className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200/60 shrink-0 text-left transition-colors truncate max-w-[210px]"
            >
              {qm}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${targetUser.name} & ${targetUser.pet.name}...`}
            className="flex-1 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-bold transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
