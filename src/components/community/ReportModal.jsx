import React, { useState } from 'react';
import { ShieldAlert, X, AlertTriangle, Ban, CheckCircle2 } from 'lucide-react';

export default function ReportModal({
  isOpen,
  onClose,
  targetUser,
  onConfirmBlock,
  onConfirmReport
}) {
  const [reason, setReason] = useState('Inappropriate communication');
  const [details, setDetails] = useState('');
  const [actionDone, setActionDone] = useState(false);

  if (!isOpen || !targetUser) return null;

  const handleReport = () => {
    onConfirmReport(targetUser.id, reason, details);
    setActionDone(true);
    setTimeout(() => {
      setActionDone(false);
      onClose();
    }, 1500);
  };

  const handleBlock = () => {
    onConfirmBlock(targetUser.id);
    setActionDone(true);
    setTimeout(() => {
      setActionDone(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-lg text-stone-900">
              Community Safety & Trust
            </h3>
            <p className="text-xs text-stone-500">Report or Block {targetUser.name}</p>
          </div>
        </div>

        {actionDone ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-bold text-stone-900 text-sm">Action Confirmed</h4>
            <p className="text-xs text-stone-500 mt-1">
              Your safety request has been processed. This user cannot contact you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
              PawPlan strictly enforces community safety in Pune. Exact home locations are never displayed. Mutual friend acceptance is required for chat.
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Reason for Report</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-hidden"
              >
                <option value="Inappropriate communication">Inappropriate or aggressive messages</option>
                <option value="Off-leash safety concern">Aggressive dog / Off-leash safety hazard</option>
                <option value="Fake profile">Fake or commercial spam profile</option>
                <option value="Uncomfortable meetup experience">Uncomfortable park meetup experience</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Additional Details (Optional)</label>
              <textarea
                rows="2"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Help us understand the issue..."
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-hidden"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleReport}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Submit Safety Report</span>
              </button>

              <button
                onClick={handleBlock}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Ban className="w-4 h-4" />
                <span>Block User Immediately</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
