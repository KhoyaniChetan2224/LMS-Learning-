import React, { useEffect, useRef, useState } from "react";

// Single-file React component for a colorful Google-Meet-like page
// - Uses Tailwind CSS for styling
// - Camera & Microphone toggle
// - Role selection (Admin, Teacher, Student)
// - Generate / copy / share meeting link
// - Basic local preview using getUserMedia

export default function GoogleMeetPage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [meetingId, setMeetingId] = useState(generateMeetingId());
  const [role, setRole] = useState("Student");
  const [link, setLink] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Clean up stream on unmount
    return () => stopMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update link whenever meetingId or role changes
    setLink(buildMeetingLink(meetingId, role));
  }, [meetingId, role]);

  async function startMedia() {
    try {
      const constraints = {
        video: cameraOn ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false,
        audio: micOn,
      };

      // If both are off, stop and return
      if (!cameraOn && !micOn) {
        stopMedia();
        setStatusMessage("Camera and microphone are off.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current && cameraOn) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatusMessage("You're live locally (preview only).");
    } catch (err) {
      console.error(err);
      setStatusMessage("Could not access camera/microphone — check permissions.");
    }
  }

  function stopMedia() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      try {
        videoRef.current.srcObject = null;
      } catch (e) {}
    }
  }

  // Toggle handlers
  async function toggleCamera() {
    setCameraOn((prev) => {
      const next = !prev;
      // If turning on, also start media
      setTimeout(() => {
        // use the latest states inside startMedia
        startMedia();
      }, 0);
      return next;
    });
  }

  async function toggleMic() {
    setMicOn((prev) => {
      const next = !prev;
      setTimeout(() => startMedia(), 0);
      return next;
    });
  }

  function handleRoleChange(e) {
    setRole(e.target.value);
  }

  function regenerateMeeting() {
    const id = generateMeetingId();
    setMeetingId(id);
    setStatusMessage("New meeting created.");
  }

  function copyLink() {
    if (!link) return;
    navigator.clipboard
      .writeText(link)
      .then(() => setStatusMessage("Meeting link copied to clipboard!"))
      .catch(() => setStatusMessage("Copy failed. Please copy manually."));
  }

  async function nativeShare() {
    if (!navigator.share) {
      setStatusMessage("Web Share API not available in this browser.");
      return;
    }
    try {
      await navigator.share({ title: "Join my meeting", text: `Join as ${role}`, url: link });
      setStatusMessage("Share dialog opened.");
    } catch (err) {
      setStatusMessage("Share cancelled or failed.");
    }
  }

  function toggleSharingPanel() {
    setIsSharing((s) => !s);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-pink-50 text-gray-800 antialiased p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <div className="rounded-2xl p-6 bg-stone-500 text-white shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-10 h-10 p-1 bg-white/20 rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 12l4 3V9l-4 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <h1 className="text-2xl font-extrabold">Google Meet</h1>
              <p className="text-sm opacity-90">Create a meeting, toggle camera & mic, and share with Admin/Teacher/Student</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full">Meeting ID: <span className="font-mono ml-2">{meetingId}</span></div>
            <button onClick={regenerateMeeting} className="px-3 py-1 rounded-full bg-white/30 hover:bg-white/40">New</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Video preview & controls */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="rounded-xl border-2 border-dashed border-indigo-100 overflow-hidden relative bg-black/5">
                {/* Video preview */}
                {cameraOn ? (
                  <video ref={videoRef} className="w-full h-80 object-cover bg-black" playsInline muted />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center flex-col text-center p-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white mb-4">YOU</div>
                    <p className="text-sm text-gray-600">Camera is off. Click camera icon to enable preview.</p>
                  </div>
                )}

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs bg-white/80 px-2 py-1 rounded-full">Preview</span>
                  <span className="text-xs bg-white/80 px-2 py-1 rounded-full">Role: <strong className="ml-1">{role}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={toggleCamera} className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-shadow shadow-sm ${cameraOn ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {cameraOn ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 10l4 3V9l-4 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="3" y="5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5h12v14H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 8l4 3v2l-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span>{cameraOn ? "Camera On" : "Camera Off"}</span>
                  </button>

                  <button onClick={toggleMic} className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-shadow shadow-sm ${micOn ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {micOn ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="8" y="1" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span>{micOn ? "Mic On" : "Mic Off"}</span>
                  </button>

                  <button onClick={() => { setCameraOn(false); setMicOn(false); stopMedia(); }} className="px-4 py-2 rounded-2xl bg-gray-50 text-gray-700">Stop</button>
                </div>

                <div className="text-sm text-gray-600">{statusMessage}</div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-r from-white to-indigo-50 border border-indigo-100">
                  <h3 className="font-semibold">Meeting Controls</h3>
                  <p className="text-xs text-gray-600 mt-2">Use the buttons to toggle your camera & mic. This demo handles local preview only.</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => { setCameraOn(true); setMicOn(true); startMedia(); }} className="px-3 py-2 rounded-md bg-indigo-600 text-white font-semibold">Start Both</button>
                    <button onClick={() => { setCameraOn(true); setMicOn(false); startMedia(); }} className="px-3 py-2 rounded-md bg-pink-500 text-white font-semibold">Start Camera Only</button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white to-pink-50 border border-pink-100">
                  <h3 className="font-semibold">Local Audio Level</h3>
                  <p className="text-xs text-gray-600 mt-2">This demo doesn't show live metering, but you could connect an analyser node for visuals.</p>
                  <div className="mt-3 h-6 bg-white rounded-full border border-gray-200 flex items-center px-3"> <div className="text-xs text-gray-500">No meter</div></div>
                </div>
              </div>
            </div>

            <aside className="md:col-span-1 bg-gradient-to-b from-white to-indigo-50 rounded-xl p-4 shadow-inner">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <select value={role} onChange={handleRoleChange} className="w-full px-3 py-2 rounded-lg border focus:outline-none">
                  <option>Admin</option>
                  <option>Teacher</option>
                  <option>Student</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Share Meeting</label>
                <div className="flex gap-2">
                  <button onClick={toggleSharingPanel} className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold">Share</button>
                  <button onClick={copyLink} className="px-3 py-2 rounded-lg border">Copy</button>
                </div>
                {isSharing && (
                  <div className="mt-3 p-3 bg-white rounded-lg border">
                    <div className="text-xs text-gray-500 mb-2">Meeting link (role-aware)</div>
                    <input className="w-full px-3 py-2 rounded-md border" value={link} readOnly />
                    <div className="flex gap-2 mt-3">
                      <button onClick={copyLink} className="px-3 py-2 rounded-md bg-green-600 text-white">Copy</button>
                      <button onClick={nativeShare} className="px-3 py-2 rounded-md bg-blue-600 text-white">Open Share</button>
                    </div>
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-500">Tip: Admins can moderate, Teachers can present, Students join muted by default.</div>
              </div>

              <div className="rounded-lg p-3 bg-white/60 border">
                <h4 className="font-semibold">Invite Quick Links</h4>
                <ul className="mt-2 text-sm space-y-2">
                  <li>
                    <a href={buildMeetingLink(meetingId, "Admin")} className="text-indigo-700 underline">Invite Admin</a>
                  </li>
                  <li>
                    <a href={buildMeetingLink(meetingId, "Teacher")} className="text-pink-600 underline">Invite Teacher</a>
                  </li>
                  <li>
                    <a href={buildMeetingLink(meetingId, "Student")} className="text-gray-700 underline">Invite Student</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Right column: participants + chat stub */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-3">Participants</h3>

          <div className="space-y-3">
            <ParticipantCard name="You" role={role} active={cameraOn || micOn} />
            <ParticipantCard name="Alice" role="Teacher" active={true} />
            <ParticipantCard name="Bob" role="Student" active={false} />
            <ParticipantCard name="Clara" role="Student" active={false} />
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Chat (stub)</h4>
            <div className="h-40 border rounded-lg p-3 bg-gray-50 overflow-auto">Chat functionality not implemented in this demo.</div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-center text-sm text-gray-500">Made with ❤️ — demo Google-Meet style page (no server signaling)</footer>
    </div>
  );
}

function ParticipantCard({ name, role, active }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white border">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${active ? "bg-gradient-to-tr from-green-400 to-green-600 text-white" : "bg-gray-100 text-gray-700"}`}>
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{role}</div>
          </div>
          <div className="text-xs text-gray-400">{active ? "Live" : "Idle"}</div>
        </div>
      </div>
    </div>
  );
}

// Helper utilities
function buildMeetingLink(id, role) {
  // In a real app this would be a proper URL. For demo we build a friendly link.
  const base = window?.location?.origin || "https://example.com";
  return `${base}/join/${encodeURIComponent(id)}?role=${encodeURIComponent(role)}`;
}

function generateMeetingId() {
  // Simple short id generator (not cryptographically secure). Use uuid npm package for production.
  return `m-${Math.random().toString(36).slice(2, 9)}`;
}
