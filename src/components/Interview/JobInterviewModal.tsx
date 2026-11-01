import React, { useState } from 'react';
import { X, Volume2, Briefcase, Sparkles, Play, CheckCircle2, Award, MessageSquare } from 'lucide-react';
import { JOB_INTERVIEW_TRACKS } from '../../services/jobInterviewService';
import type { InterviewTrack } from '../../services/jobInterviewService';
import { sounds } from '../../services/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSpeakText: (text: string, rate?: number) => void;
  onStartLiveInterviewTrack: (track: InterviewTrack, questionIndex?: number) => void;
  onSendAnswerToChat: (answerText: string) => void;
}

export const JobInterviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSpeakText,
  onStartLiveInterviewTrack,
  onSendAnswerToChat
}) => {
  const [selectedTrack, setSelectedTrack] = useState<InterviewTrack>(JOB_INTERVIEW_TRACKS[0]);

  if (!isOpen) return null;

  const handlePracticeQuestion = (idx: number) => {
    sounds.playClick();
    onStartLiveInterviewTrack(selectedTrack, idx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-[#0e152d] to-[#080d1c] border-2 border-indigo-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl shrink-0">
              💼
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-extrabold text-slate-100">
                  قسم إجراء المقابلة الشخصية للتوظيف
                </h2>
                <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  Job Interview Simulator Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تدرب على أسئلة المقابلة الشخصية، استمع للإجابات النموذجية (منهجية STAR)، وأجرِ مقابلة حية مع اللورد منقوري
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Selector Pills */}
        <div className="my-3 space-y-2.5 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {JOB_INTERVIEW_TRACKS.map((track) => {
              const active = track.id === selectedTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedTrack(track);
                  }}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-indigo-500 to-amber-500 text-slate-950 shadow-lg scale-[1.01]'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span className="text-base">{track.icon}</span>
                  <span>{track.titleAr}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Track Info & Start Full Mock Interview Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-3 sm:px-4">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-xs sm:text-sm text-slate-100">
                  {selectedTrack.titleAr} ({selectedTrack.titleEn})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {selectedTrack.questions.length} أسئلة متدرجة
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {selectedTrack.descriptionAr}
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onStartLiveInterviewTrack(selectedTrack, 0);
                onClose();
              }}
              className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ابدأ المقابلة الحية من السؤال 1</span>
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
          {selectedTrack.questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-900/75 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 space-y-3 transition-all shadow-md"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    Q{q.stepNumber}
                  </span>
                  <div>
                    <div className="text-[11px] font-bold text-amber-400 mb-0.5">
                      سؤال لجنة التوظيف (Interviewer Question):
                    </div>
                    <h3 className="font-english font-bold text-sm sm:text-base text-slate-100 leading-snug">
                      "{q.questionEn}"
                    </h3>
                    <p className="text-xs text-indigo-200/90 mt-1">
                      {q.questionAr}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onSpeakText(q.questionEn, 0.92);
                  }}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 cursor-pointer"
                  title="استمع لسؤال المقابلة بصوت اللورد منقوري"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>سماع السؤال</span>
                </button>
              </div>

              {/* Coaching Note & Power Keywords */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
                <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>💡 نصيحة التوظيف: {q.interviewerNoteAr}</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-slate-400">كلمات القوة:</span>
                  {q.powerKeywords.map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sounds.playClick();
                        onSpeakText(kw, 0.8);
                      }}
                      title="اضغط لسماع نطق الكلمة المفتاحية"
                      className="text-[10px] font-english px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 cursor-pointer"
                    >
                      🔊 {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample STAR Answer Box */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>نموذج إجابة احترافية مقترحة (Model Answer):</span>
                  </span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onSpeakText(q.sampleAnswerEn, 0.9);
                    }}
                    className="text-[11px] text-emerald-300 hover:text-emerald-200 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>استمع للإجابة النموذجية</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-english text-slate-100 leading-relaxed font-medium">
                  "{q.sampleAnswerEn}"
                </div>
                <div className="text-xs text-amber-200/85">
                  {q.sampleAnswerAr}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onSendAnswerToChat(q.sampleAnswerEn);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>أرسل الإجابة النموذجية في الدردشة</span>
                </button>

                <button
                  onClick={() => handlePracticeQuestion(idx)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>اسألني هذا السؤال حياً الآن</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
