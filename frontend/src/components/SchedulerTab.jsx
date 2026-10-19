import React, { useState } from 'react';

export default function SchedulerTab({ interviews, onScheduleNew }) {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    jobTitle: 'Senior Full-Stack Engineer (MERN)',
    interviewerName: 'Engineering Lead',
    scheduledDate: '2026-10-22',
    timeSlot: '14:00 - 15:00 UTC',
    type: 'Technical Architecture'
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.candidateEmail) return;
    onScheduleNew(formData);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Autonomous Calendar Sync</span>
          <h2 className="text-xl font-extrabold text-slate-900">Smart Interview Coordinator & Virtual Room</h2>
          <p className="text-xs text-slate-500 mt-0.5">Two-way Google Workspace & Outlook sync with real-time Google Meet and in-app scorecard</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <i className="fa-solid fa-calendar-check"></i> Calendar Availability Engine Active
        </div>
      </div>

      {bookingSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between animate-fade-in shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
            Interview booked successfully! Google Meet video room generated and calendar invites dispatched to both parties.
          </div>
          <button onClick={() => setBookingSuccess(false)} className="text-emerald-700 hover:text-emerald-900">&times;</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <i className="fa-solid fa-calendar-plus text-indigo-600"></i> Dispatch Interview Booking
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Candidate Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">Candidate Email</label>
              <input
                type="email"
                required
                placeholder="e.g. alex@example.com"
                value={formData.candidateEmail}
                onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">Target Position</label>
              <select
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Senior Full-Stack Engineer (MERN)">Senior Full-Stack Engineer (MERN)</option>
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Lead Product Manager (HR Tech)">Lead Product Manager (HR Tech)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Date</label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Time Slot</label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="10:00 - 11:00 UTC">10:00 - 11:00 UTC</option>
                  <option value="14:00 - 15:00 UTC">14:00 - 15:00 UTC</option>
                  <option value="16:00 - 17:00 UTC">16:00 - 17:00 UTC</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">Interview Round</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Initial Recruiter Screen">Initial Recruiter Screen</option>
                <option value="Technical Architecture">Technical Architecture</option>
                <option value="Pair Programming">Pair Programming</option>
                <option value="Executive Culture Fit">Executive Culture Fit</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-paper-plane"></i> Confirm Booking & Send Invites
            </button>
          </form>
        </div>

        {/* Scheduled List with Working Google Meet & In-App Room */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center justify-between">
            <span>Upcoming Interview Schedule</span>
            <span className="text-xs font-normal text-slate-500">{interviews.length} Scheduled</span>
          </h3>

          <div className="space-y-3">
            {interviews.map((iv, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-bold text-slate-900 text-sm">{iv.candidateName}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                      {iv.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{iv.jobTitle} &bull; Interviewer: {iv.interviewerName}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-700 mt-2 font-mono">
                    <span className="text-indigo-600"><i className="fa-regular fa-calendar mr-1"></i>{iv.scheduledDate}</span>
                    <span>&bull;</span>
                    <span className="text-indigo-600"><i className="fa-regular fa-clock mr-1"></i>{iv.timeSlot}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* In-App Meeting Room */}
                  <button
                    onClick={() => setActiveRoom(iv)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-video text-xs"></i> In-App Room
                  </button>

                  {/* Real Instant Google Meet Room */}
                  <a
                    href="https://meet.google.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs"
                    title="Opens a real live instant Google Meet call in a new tab"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i> Google Meet (Live)
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 flex items-center gap-2">
            <i className="fa-solid fa-info-circle text-indigo-600"></i>
            <span><strong>Recruiter Note:</strong> Click <strong>"Google Meet (Live)"</strong> to launch a real working Google Meet room in a new browser tab, or <strong>"In-App Room"</strong> for the integrated scorecard console.</span>
          </div>
        </div>
      </div>

      {/* In-App Live Meeting Room Modal */}
      {activeRoom && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-fade-in text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Interview Assessment Room: {activeRoom.candidateName}</h3>
                  <p className="text-xs text-slate-500">{activeRoom.jobTitle} &bull; {activeRoom.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i> Open Google Meet
                </a>
                <button onClick={() => setActiveRoom(null)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center transition">
                  &times;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Video Mockup */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between min-h-[300px]">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <i className="fa-solid fa-circle text-[8px]"></i> Candidate Video Connected
                  </span>
                  <span className="font-mono text-slate-500">1080p &bull; 00:15:20</span>
                </div>

                <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                    {activeRoom.candidateName.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{activeRoom.candidateName}</h4>
                    <p className="text-xs text-slate-400">Candidate Audio & Video Streaming</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-800/80">
                  <button className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-microphone"></i></button>
                  <button className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-video"></i></button>
                  <button className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-display"></i></button>
                  <button onClick={() => setActiveRoom(null)} className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5">
                    <i className="fa-solid fa-phone-slash"></i> Complete & End
                  </button>
                </div>
              </div>

              {/* Scorecard */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-clipboard-check text-indigo-600"></i> Interviewer Scorecard
                </h4>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Technical Depth:</span>
                    <div className="flex gap-1 text-amber-400">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star text-slate-300"></i>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Problem Solving:</span>
                    <div className="flex gap-1 text-amber-400">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Communication:</span>
                    <div className="flex gap-1 text-amber-400">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-slate-700">
                  <strong className="text-indigo-700 block mb-1">AI Prompt for Interviewer:</strong>
                  "Ask candidate how they handle schema migrations and caching invalidation in high-traffic collections."
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Interviewer Notes</label>
                  <textarea
                    rows={3}
                    defaultValue="Exhibits strong systems architecture comprehension. Communication is clear and articulate."
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={() => setActiveRoom(null)}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
                >
                  Save Scorecard & Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
