import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ThermometerSun,
  ShieldCheck,
  Flame,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { PUNE_WEATHER_SUMMARY } from '../../data/mockData';

export default function AiAssistantModal({
  isOpen,
  onClose,
  activePet
}) {
  const [messages, setMessages] = useState([
    {
      id: 'ai-init',
      sender: 'ai',
      text: `Hello Aarav! I'm your PawPlan Outdoor Copilot. Currently monitoring weather in Pune (${PUNE_WEATHER_SUMMARY.temp}, ${PUNE_WEATHER_SUMMARY.condition}). How can I help you and ${activePet?.name || 'Sheru'} today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Is the pavement safe for dog paws right now in Pune?',
    'What should I pack for a Vetal Tekdi morning trek?',
    'How do I handle street dog packs while walking my pet?',
    'Recommend a shaded park for an energetic Indie dog'
  ];

  const handleSend = async (question = inputText) => {
    if (!question.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const advice = await aiService.getPetOutdoorAdvice(activePet, PUNE_WEATHER_SUMMARY);

      // Tailored responses for common Pune questions
      let replyText = advice;
      const lower = question.toLowerCase();

      if (lower.includes('pavement') || lower.includes('safe') || lower.includes('hot')) {
        replyText = `🐾 **Pune Pavement Advisory**: Right now at ${PUNE_WEATHER_SUMMARY.temp}, ground temperatures are moderate and safe! However, during sunny afternoons (12 PM - 3:30 PM), asphalt in Pune can exceed 48°C. Stick to grassy verges at Empress Garden or Jogger’s Park.`;
      } else if (lower.includes('tekdi') || lower.includes('trek') || lower.includes('hill')) {
        replyText = `⛰️ **Vetal Tekdi Trek Checklist for ${activePet?.name || 'Sheru'}**:\n1. 500ml water + collapsible silicon bowl.\n2. 2-meter sturdy nylon leash (steep slopes near ARAI quarry).\n3. Keep calm around peacocks and wild birds.\n4. Thorough paw and underbelly check for burrs post-walk.`;
      } else if (lower.includes('street dog') || lower.includes('pack')) {
        replyText = `🐕 **Managing Street Dog Packs in Pune**:\n1. Never run or pull your pet aggressively; dogs mirror human tension.\n2. Keep a handful of dog biscuits in your walk pouch to toss to the side if a pack approaches.\n3. Walk tall, keep yourself between your dog and the local pack, and take a wide berth on lanes with active litters.`;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[600px] shadow-2xl border border-stone-200 flex flex-col justify-between overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200/80 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-stone-900 text-base">PawPlan AI Copilot</span>
                <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-2 py-0.2 rounded-full flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-teal-700" />
                  Ollama / Llama3 Ready
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Outdoor wellbeing & safety assistant for {activePet?.name || 'your pet'} in Pune
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-2xs whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-300 text-stone-700 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-stone-400 text-xs bg-white px-3 py-2 rounded-2xl w-fit border border-stone-200">
              <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-stone-500">Thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-3 pt-2 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-semibold text-stone-600">
          <span className="text-[10px] text-stone-400 uppercase font-bold shrink-0">Ask:</span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-teal-50 hover:text-teal-900 border border-stone-200/60 shrink-0 text-left transition-colors truncate max-w-[210px]"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat input */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI pet outdoor advice for Pune..."
            className="flex-1 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || loading}
            className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white font-bold transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
