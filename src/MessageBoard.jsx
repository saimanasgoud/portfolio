// MessageBoard.jsx
import React, { useEffect, useState, useRef } from "react";
import { db } from "./firebase";
import {
  ref,
  push,
  onValue,
  update,
  remove,
  onDisconnect,
  serverTimestamp,
} from "firebase/database";

/* -----------------------
  Simple bad words filter:
  extend the list below as needed
-------------------------*/
const BAD_WORDS = ["badword", "idiot", "stupid"]; // add words you want to block/mask
function maskBadWords(text) {
  if (!text) return text;
  let res = text;
  BAD_WORDS.forEach((w) => {
    const re = new RegExp(`\\b${w}\\b`, "gi");
    res = res.replace(re, (m) => "*".repeat(m.length));
  });
  return res;
}

/* sanitize email for use as key (Firebase RTDB disallows . # $ [ ] ) */
function emailToKey(email = "") {
  return email.replace(/[.#$\[\]]/g, ",");
}

/* format date (no seconds), show full date */
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/* time ago helper */
function timeAgo(ts) {
  if (!ts) return "";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return "Just now";
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  const date = new Date(ts);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

/* Reaction types - add or remove as you like */
const REACTION_TYPES = ["likes", "dislikes", "love"];

/* Set admin email if you want a single admin to manage pins.
   If left empty, owners (m.email === userEmail) can pin their own messages.
   Example: const ADMIN_EMAIL = "admin@yourdomain.com";
*/
const ADMIN_EMAIL = ""; // <-- set your admin email here if you want

export default function MessageBoard() {
  // messages + UI
  const [messages, setMessages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // pagination: show first 10
  const [loading, setLoading] = useState(true);

  // posting & user
  const [showPostForm, setShowPostForm] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("mb_userName") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("mb_userEmail") || "");

  // popup to collect name+email (first-time)
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  // local reaction state (quick UI)
  const [userReactions, setUserReactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mb_userReactions")) || {};
    } catch {
      return {};
    }
  });

  // menus / modals
  const [openMenuId, setOpenMenuId] = useState(null);
  const [reportingMessageId, setReportingMessageId] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // editing
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // replies
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingReply, setEditingReply] = useState({ messageId: null, replyId: null, text: "" });

  // presence & typing
  const [onlineUsers, setOnlineUsers] = useState([]); // array of emailKeys
  const [typingMap, setTypingMap] = useState({}); // { messageId: [emailKey,...] }

  // profile modal
  const [profileEmail, setProfileEmail] = useState(null);
  const [profileData, setProfileData] = useState({ posts: [], stats: {} });

  // keep ref so onValue unsubscribe works reliably
  const messagesRefRef = useRef(null);

  // persist reactions locally
  useEffect(() => {
    try {
      localStorage.setItem("mb_userReactions", JSON.stringify(userReactions));
    } catch { }
  }, [userReactions]);

  /* -------------------------
     Presence: mark online / offline
     ------------------------- */
  useEffect(() => {
    if (!userEmail) return;
    const key = emailToKey(userEmail);
    const pRef = ref(db, `presence/${key}`);
    
    // set presence on connect
    const updatePresence = () => {
      update(pRef, {
        onlineAt: serverTimestamp(),
        name: userName || "",
        // lastActive: Date.now()
      });
    };
    
    updatePresence();
    const intervalId = setInterval(updatePresence, 30000); // Update every 30s
    
    // ensure removal on disconnect
    try {
      onDisconnect(pRef).remove();
    } catch (e) {
      console.warn("onDisconnect not supported in this environment");
    }
    
    // watch presence list and clean old entries
    const listRef = ref(db, "presence");
    const unsub = onValue(listRef, (snap) => {
      const data = snap.val() || {};
      const now = Date.now();
      // const activeUsers = Object.entries(data)
      //   .filter(([_, user]) => now - user.lastActive < 60000) // Consider users inactive after 1 minute
      //   .map(([key]) => key);
      // setOnlineUsers(activeUsers);
    });
    
    return () => {
      clearInterval(intervalId);
      unsub();
      remove(pRef); // Clean up presence when component unmounts
    };
  }, [userEmail, userName]);

  /* -------------------------
     Typing indicators: show for each message
     We will set typing/{messageId}/{emailKey}: true when typing,
     and remove it when stopped.
     ------------------------- */
  function setTyping(messageId, isTyping) {
    if (!userEmail) return;
    const key = emailToKey(userEmail);
    const tRef = ref(db, `typing/${messageId}/${key}`);
    if (isTyping) {
      update(tRef, { typing: true, name: userName || "", ts: Date.now() });
      try { onDisconnect(tRef).remove(); } catch { }
    } else {
      remove(tRef);
    }
  }

  // watch typing map
  useEffect(() => {
    const typingRoot = ref(db, "typing");
    const unsub = onValue(typingRoot, (snap) => {
      const data = snap.val() || {};
      const map = {};
      Object.entries(data).forEach(([msgId, users]) => {
        map[msgId] = Object.keys(users || {}).filter((k) => users[k] && users[k].typing);
      });
      setTypingMap(map);
    });
    return () => unsub();
  }, []);

  /* -------------------------
     Load messages (with reactions/replies/reports)
     ------------------------- */
  useEffect(() => {
    setLoading(true);
    const mRef = ref(db, "messages");
    messagesRefRef.current = mRef;
    const unsub = onValue(mRef, (snap) => {
      const data = snap.val();
      if (!data) {
        setMessages([]);
        setLoading(false);
        return;
      }
      const loaded = Object.entries(data).map(([id, msg]) => {
        const reactions = msg.reactions || {}; // reactions: { likes: {userKey: true}, love: {...} }
        const repliesMap = msg.replies || {};
        const replies = Object.entries(repliesMap).map(([rid, r]) => ({ id: rid, ...r }));
        replies.sort((a, b) => a.createdAt - b.createdAt); // oldest first for replies

        // compute counts
        const reactionCounts = {};
        REACTION_TYPES.forEach((type) => {
          reactionCounts[type] = reactions[type] ? Object.keys(reactions[type]).length : 0;
        });

        return {
          id,
          name: msg.name,
          email: msg.email,
          text: msg.text,
          createdAt: msg.createdAt,
          pinned: !!msg.pinned,
          reactionsMap: reactions,
          reactionCounts,
          replies,
          reportsMap: msg.reports || {},
        };
      });

      // sort pinned first then newest
      loaded.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.createdAt - a.createdAt;
      });

      setMessages(loaded);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  /* ---------------------------
     Posting / User collection
     ---------------------------*/
  const onClickPost = () => {
    if (!userName || !userEmail) {
      setTempName("");
      setTempEmail("");
      setShowUserPopup(true); //true
      setShowPostForm(true); //false
      return;
    }
    setShowPostForm(true); //true
    setShowUserPopup(false); //initially false
  };

  const saveUserDetails = () => {
    if (!tempName.trim() || !tempEmail.trim()) {
      alert("Please enter both name and email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(tempEmail.trim())) {
      alert("Please enter a valid email.");
      return;
    }
    setUserName(tempName.trim());
    setUserEmail(tempEmail.trim());
    localStorage.setItem("mb_userName", tempName.trim());
    localStorage.setItem("mb_userEmail", tempEmail.trim());
    setShowUserPopup(false);
    setShowPostForm(true);
  };

  const postMessage = async () => {
    const content = messageText.trim();
    if (!content) return;
    if (!userName || !userEmail) {
      alert("Please enter your name & email first.");
      setShowUserPopup(true);
      return;
    }
    const messagesRef = ref(db, "messages");
    await push(messagesRef, {
      name: userName,
      email: userEmail,
      text: maskBadWords(content),
      createdAt: Date.now(),
      reactions: {},
      reports: {},
      replies: {},
      pinned: false,
    });
    setMessageText("");
    setShowPostForm(true);
  };

  /* ---------------------------
     Edit / Delete message
     ---------------------------*/
  const startEditMessage = (m) => {
    if (m.email !== userEmail) {
      alert("You can only edit your own message.");
      return;
    }
    setEditingMessageId(m.id);
    setEditingText(m.text);
  };

  const saveEditMessage = async () => {
    if (!editingMessageId) return;
    const newText = maskBadWords(editingText.trim());
    if (!newText) {
      alert("Message cannot be empty.");
      return;
    }
    const messageRef = ref(db, `messages/${editingMessageId}`);
    await update(messageRef, { text: newText });
    setEditingMessageId(null);
    setEditingText("");
  };

  const deleteMessage = async (m) => {
    if (m.email !== userEmail) {
      alert("You can only delete your own message.");
      return;
    }
    if (!confirm("Delete this message?")) return;
    await remove(ref(db, `messages/${m.id}`));
  };

  /* ---------------------------
     Reactions (multi-type, single-per-user)
     DB shape: messages/{id}/reactions/{reactionType}/{userKey}: true
     ---------------------------*/
  const toggleReaction = async (messageId, type) => {
    if (!userEmail) {
      alert("Please enter your name & email to react.");
      setShowUserPopup(true);
      return;
    }
    if (!REACTION_TYPES.includes(type)) return;

    const key = emailToKey(userEmail);
    const m = messages.find((x) => x.id === messageId);
    if (!m) return;

    const updates = {};
    // if user already reacted with same type -> remove it
    const alreadyPicked = m.reactionsMap && m.reactionsMap[type] && m.reactionsMap[type][key];

    if (alreadyPicked) {
      updates[`messages/${messageId}/reactions/${type}/${key}`] = null;
    } else {
      // set this reaction
      updates[`messages/${messageId}/reactions/${type}/${key}`] = true;
      // remove any other reaction by this user on this message
      REACTION_TYPES.forEach((rt) => {
        if (rt !== type) updates[`messages/${messageId}/reactions/${rt}/${key}`] = null;
      });
    }

    await update(ref(db), updates);

    // optimistic local update (toggle)
    setUserReactions((prev) => {
      const next = { ...prev };
      if (next[messageId] === type) delete next[messageId];
      else next[messageId] = type;
      return next;
    });
  };

  /* ---------------------------
     Pin / Unpin message
     - Admin: set ADMIN_EMAIL constant at top
     - Otherwise: message owner can pin their own message
     ---------------------------*/
  const canPin = (m) => {
    if (!userEmail) return false;
    // Only owners can pin their own messages
    return m.email === userEmail;
  };

  const togglePin = async (m) => {
    if (!canPin(m)) {
      alert("Only admin can pin messages.");
      return;
    }
    await update(ref(db, `messages/${m.id}`), { pinned: !m.pinned });
  };

  /* ---------------------------
     Replies
     ---------------------------*/
  const startReply = (messageId) => {
    if (!userName || !userEmail) {
      alert("Enter name & email first to reply.");
      setShowUserPopup(true);
      return;
    }
    setReplyingTo(messageId);
    setReplyText("");
    // set typing for reply box
    setTyping(messageId, true);
  };

  const submitReply = async (messageId) => {
    const txt = replyText.trim();
    if (!txt) return;
    const repliesRef = ref(db, `messages/${messageId}/replies`);
    await push(repliesRef, {
      name: userName,
      email: userEmail,
      text: maskBadWords(txt),
      createdAt: Date.now(),
    });
    setReplyingTo(null);
    setReplyText("");
    setTyping(messageId, false);
  };

  const startEditReply = (messageId, reply) => {
    if (reply.email !== userEmail) {
      alert("You can only edit your own reply.");
      return;
    }
    setEditingReply({ messageId, replyId: reply.id, text: reply.text });
  };

  const saveEditReply = async () => {
    const { messageId, replyId, text } = editingReply;
    if (!messageId || !replyId) return;
    const newText = maskBadWords((text || "").trim());
    if (!newText) {
      alert("Reply cannot be empty.");
      return;
    }
    await update(ref(db, `messages/${messageId}/replies/${replyId}`), {
      text: newText,
    });
    setEditingReply({ messageId: null, replyId: null, text: "" });
  };

  const deleteReply = async (messageId, reply) => {
    if (reply.email !== userEmail) {
      alert("You can only delete your own reply.");
      return;
    }
    if (!confirm("Delete this reply?")) return;
    await remove(ref(db, `messages/${messageId}/replies/${reply.id}`));
  };

  /* ---------------------------
     Reports
     ---------------------------*/
  const openReport = (messageId) => {
    if (!userEmail) {
      alert("Please enter name & email to report.");
      setShowUserPopup(true);
      return;
    }
    setReportingMessageId(messageId);
    setReportReason("");
    setCustomReason("");
    setOpenMenuId(null);
  };

  const submitReport = async () => {
    const reasonToSend = reportReason === "Others" ? customReason.trim() : reportReason;
    if (!reasonToSend) {
      alert("Please select or enter a reason.");
      return;
    }
    if (!reportingMessageId) return;

    // push to global reports
    const repRef = ref(db, "reports");
    const newRepRef = await push(repRef, {
      messageId: reportingMessageId,
      reportedBy: userEmail,
      reporterName: userName,
      reason: reasonToSend,
      createdAt: Date.now(),
    });
    const repId = newRepRef.key;

    // link under message.reports
    await update(ref(db), { [`messages/${reportingMessageId}/reports/${repId}`]: true });

    setReportingMessageId(null);
    setReportReason("");
    setCustomReason("");
    alert("Report submitted. Thanks.");
  };

  const closeReportModal = () => {
    setReportingMessageId(null);
    setReportReason("");
    setCustomReason("");
  };

  /* ---------------------------
     Profile modal: gather posts + stats for a user
     ---------------------------*/
  const openProfile = (email) => {
    if (!email) return;
    setProfileEmail(email);
    // compute profile data from currently loaded messages
    const posts = messages.filter((m) => m.email === email);
    const stats = {
      postsCount: posts.length,
      totalLikes: posts.reduce((acc, p) => acc + (p.reactionCounts.likes || 0), 0),
      totalReactions: posts.reduce(
        (acc, p) => acc + REACTION_TYPES.reduce((a, t) => a + (p.reactionCounts[t] || 0), 0),
        0
      ),
    };
    setProfileData({ posts, stats });
  };
  const closeProfile = () => {
    setProfileEmail(null);
    setProfileData({ posts: [], stats: {} });
  };

  /* ---------------------------
     Pagination
     ---------------------------*/
  const loadMore = () => setVisibleCount((c) => c + 5);

  /* ---------------------------
     Utility: show email (menu action)
     ---------------------------*/
  // const showEmailFor = (email) => {
  //   alert(`Email: ${email}`);
  // };

  /* ---------------------------
     Render
     ---------------------------*/
  return (
    <section className="max-w-3xl mx-auto mt-25 p-1 bg-white rounded-lg shadow-lg relative">
      {/* Header: Community Status Bar */}
      <div className="flex items-center justify-between mb-4 p-3 bg-indigo-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-indigo-700">TalkZone</span>
          <span className="text-sm text-gray-600">Community Board</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-700">
            {/* Active Members: <strong>{onlineUsers.length}</strong> */}
          </span>
        </div>
      </div>

      {/* Message Creation Button */}
      {!showPostForm && (
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
          <button
            onClick={onClickPost}
            className="bg-indigo-600 text-white px-6 py-2.5 cursor-pointer rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">✍️</span>
            Post Message
          </button>
          <div className="text-sm text-gray-600 italic">Join the conversation!</div>
        </div>
      )}

      {/* First-time User Authentication */}
        {showUserPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30"></div>
            {/* make modal content scrollable when it overflows the viewport */}
            <div className="relative bg-white rounded-lg p-4 w-[92%] max-w-md shadow-lg z-60 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-3 text-indigo-700">TalkZone – Public Message Board</h2>
 
        <details className="mb-4 bg-gray-50 p-3 rounded border">
            <summary className="cursor-pointer font-bold text-green-500">Why Iam asking this</summary>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>It helps me to keep the space free from unwanted or anonymous activity.</li>
              <li>Ensures that reports are clear and easy to manage or Delete if required.</li>
              <li>Gives you the flexibility to remove your details whenever needed..</li>
            </ul>
          </details>
          <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-green-600 flex items-center gap-2">🛡️ Before You Post — A Quick Step</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">✅ <span>Your <span className="font-semibold text-indigo-700">name will be displayed</span> with your post — please enter it correctly.</span></li>
              <li className="flex items-start gap-2">📧 <span>Your email is used only for <span className="font-semibold text-green-700">verification</span> and to recognize you when you return.</span></li>
              <li className="flex items-start gap-2">🔒 <span>We keep your details <span className="font-semibold text-green-700">safe, secure & confidential</span>.</span></li>
              <li className="flex items-start gap-2">🧑‍💻 <span>You only need to enter your details <span className="font-semibold text-red-700">once</span> — next time we’ll greet you with “Welcome back!”.</span></li>
              <li className="flex items-start gap-2">🤝 <span>This helps maintain a <span className="font-semibold text-purple-700">trustworthy and respectful community</span>.</span></li>
            </ul>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-3">To keep this community genuine and respectful, please provide your <span className="font-semibold text-indigo-700">real name and email</span> before posting a message.</p>

          <div className="mb-4">
            <label className="flex items-center gap-3 mb-3">
              <span className="w-10 text-orange-500 font-medium">Name</span>
              <input
            type="text"
            placeholder="Will appear with every post you make."
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-300"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
              />
            </label>

            <label className="flex items-center gap-3">
              <span className="w-10 text-orange-500 font-medium">Email</span>
              <input
            type="email"
            placeholder="Verify your identity and avoid fake users."
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-300"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={() => setShowUserPopup(false)} className="px-4 py-2 cursor-pointer border rounded">Cancel</button>
            <button onClick={saveUserDetails} className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded">Save & Continue</button>
          </div>
            </div>
          </div>
        )}

        {/* Post form */}
      {showPostForm && !showUserPopup && (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          {/* User info bar */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm pl-30 font-semibold text-gray-800">{userName}</div>
                <div className="text-xs text-gray-500">{userEmail}</div>
              </div>
            </div>
            <button
              onClick={() => setShowUserPopup(true)}
              className="text-xs cursor-pointer text-indigo-600 hover:underline"
            >
              Update details
            </button>
            <button
                    onClick={async () => {
                    if (!confirm("Delete stored name & email from this device and remove your presence from the database?")) return;
                    const email = userEmail;
                    // clear local state & storage
                    setUserName("");
                    setUserEmail("");
                    try {
                      localStorage.removeItem("mb_userName");
                      localStorage.removeItem("mb_userEmail");
                    } catch (e) {}
                    // remove presence entry from RTDB (if any)
                    if (email) {
                      try {
                      await remove(ref(db, `presence/${emailToKey(email)}`));
                      } catch (e) {
                      // ignore errors silently
                      }
                    }
                    // close post form and show popup so user can re-enter if needed
                    setShowPostForm(false);
                    setShowUserPopup(true);
                    alert("Your details have been removed.");
                    }}
                    className="text-xs cursor-pointer text-red-600 hover:underline ml-2"
                    >
                    Delete details
                    </button>
          </div>

          

          {/* /* Message input */ }
                <div className="space-y-3">
                {/* <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                  <span className="animate-pulse">🔴 LIVE</span>
                  <span>Your message will be visible to everyone immediately</span>
                </div> */}
                <textarea
                  rows={4}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                  placeholder="Share your thoughts professionally and respectfully. Remember, your message will be visible to all users in real-time."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onFocus={() => setTyping("newMessage", true)}
                  onBlur={() => setTyping("newMessage", false)}
                />

                {/* Character count & guidelines */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>
                {messageText.length}/1000 characters
              </div>
              <div className="flex items-center gap-2">
                <span>💡</span>
                <span>Keep it friendly and constructive</span>
              </div>
            </div>

            {/* Preview (if message exists) */}
            {/* {messageText.trim() && (
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-xs font-medium text-gray-500 mb-1">Preview:</div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {maskBadWords(messageText)}
                </div>
              </div>
            )} */}

            {/* /* Action buttons */}
            <div className="flex items-center justify-between pt-3">
              <button
                onClick={() => setShowPostForm(false)}
                className="px-4 py-2 text-red-500 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessageText("")}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  disabled={!messageText.trim()}
                >
                  Clear
                </button>
                <button
                  onClick={postMessage}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={!messageText.trim()}
                >
                  {messageText.trim() ? (
                    <>
                      <span>Post Message</span>
                      <span>→</span>
                    </>
                  ) : (
                    // when there's no text (for example immediately after posting),
                    // show a friendly confirmation so "it looks like good"
                    <span className="flex items-center gap-2">
                      <span>Looks good</span>
                      <span className="text-green-200">✓</span>
                    </span>
                    )}
                  </button>

                  {/* Delete stored name/email (also removes presence in DB) */}
                  
                  </div>
                  </div>
        </div>
        </div>
                  )}
              {loading && <div className="text-center py-8 text-gray-500">Loading messages...</div>}

              {/* Messages list */}
      <div className="space-y-6">
        {messages.slice(0, visibleCount).map((m) => (
          <article key={m.id} className={`p-4 border rounded-lg shadow-sm ${m.pinned ? "bg-yellow-50" : "bg-indigo-50"} relative`}>
            <div className="flex items-start gap-3">
              {/* profile initial circle */}
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {m.name ? m.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="flex-1">
                {/* name + date on one line */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProfile(m.email)}
                        className="text-sm font-semibold text-gray-800 hover:underline"
                        title="View profile & posts"
                      >
                        {m.name}
                      </button>
                      <span className="text-xs text-gray-500" title={formatDate(m.createdAt)}>
                        • {timeAgo(m.createdAt)}
                      </span>
                      {m.pinned && <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-200 rounded text-yellow-800">Pinned</span>}
                    </div>

                    {/* message content or editing input */}
                    {editingMessageId === m.id ? (
                      <div className="mt-2">
                        <textarea
                          rows={3}
                          className="w-full p-2 border rounded"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button onClick={() => { setEditingMessageId(null); setEditingText(""); }} className="px-3 py-1 border cursor-pointer rounded">Cancel</button>
                          <button onClick={saveEditMessage} className="px-3 py-1 bg-indigo-600 cursor-pointer text-white rounded">Save</button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-gray-700 whitespace-pre-wrap">{m.text}</div>
                    )}
                  </div>

                  {/* three-dot menu */}
                  <div className="relative">
                    <button onClick={() => setOpenMenuId(openMenuId === m.id ? null : m.id)} className="px-2 text-black-900 cursor-pointer">⋮</button>
                    {openMenuId === m.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-10">
                        {/* <button onClick={() => showEmailFor(m.email)} className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Show Email</button> */}

                        {/* edit & delete only for owner */}
                        {m.email === userEmail && (
                          <>
                            <button onClick={() => startEditMessage(m)} className="block w-full px-4 py-2 text-left cursor-pointer text-sm hover:bg-gray-100">Edit</button>
                            <button onClick={() => deleteMessage(m)} className="block w-full px-4 py-2 text-left cursor-pointer text-sm hover:bg-gray-100 text-red-600">Delete</button>
                          </>
                        )}

                        {/* pin if allowed */}
                        {canPin(m) && (
                          <button onClick={() => togglePin(m)} className="block w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50">
                            {m.pinned ? "Unpin" : "Pin"}
                          </button>
                        )}

                        <button onClick={() => openReport(m.id)} className="block w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50 text-red-600">Report</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* typing indicator under header */}
                <div className="mt-1">
                  {typingMap[m.id] && typingMap[m.id].length > 0 && (
                    <div className="text-xs text-gray-500 italic">{typingMap[m.id].slice(0, 3).join(", ")} typing...</div>
                  )}
                </div>

                {/* replies list */}
                <div className="mt-3 space-y-2">
                  {m.replies && m.replies.map((r) => (
                    <div key={r.id} className="p-2 bg-white rounded border">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-semibold">{r.name}</div>
                          {editingReply.messageId === m.id && editingReply.replyId === r.id ? (
                            <div>
                              <textarea rows={2} className="w-full p-1 border rounded" value={editingReply.text} onChange={(e) => setEditingReply(prev => ({ ...prev, text: e.target.value }))} />
                              <div className="flex justify-end gap-2 mt-1">
                                <button onClick={() => setEditingReply({ messageId: null, replyId: null, text: "" })} className="px-2 py-1 border rounded cursor-pointer text-xs">Cancel</button>
                                <button onClick={saveEditReply} className="px-2 py-1 bg-indigo-600 cursor-pointer text-white rounded text-xs">Save</button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm">{r.text}</div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">{formatDate(r.createdAt)}</div>
                        </div>

                        <div className="ml-2 text-right">
                          {/* reply actions: edit/delete if owner */}
                          {r.email === userEmail && (
                            <>
                              <button onClick={() => startEditReply(m.id, r)} className="text-xs cursor-pointer text-indigo-600 mr-2">Edit</button>
                              <button onClick={() => deleteReply(m.id, r)} className="text-xs cursor-pointer text-red-600">Delete</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* reply input / actions */}
                <div className="mt-3 flex items-start gap-3">
                  <button onClick={() => { startReply(m.id); }} className="text-sm px-2 py-1 cursor-pointer border rounded">Reply</button>

                  <div className="flex items-center gap-3 ml-auto">
                    {/* reaction buttons (multi-type) */}
                    {REACTION_TYPES.map((rt) => (
                      <button
                        key={rt}
                        onClick={() => toggleReaction(m.id, rt)}
                        className={`flex items-center cursor-pointer gap-2 text-sm px-2 py-1 rounded ${userReactions[m.id] === rt ? "font-semibold" : ""}`}
                        title={rt}
                      >
                        <span>
                          {rt === "likes" ? "👍" : rt === "dislikes" ? "👎" : rt === "love" ? "❤️" : rt === "funny"}
                        </span>
                        <span>{m.reactionCounts[rt] || 0}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* show reply box if replying to this message */}
                {replyingTo === m.id && (
                  <div className="mt-3">
                    <textarea
                      rows={2}
                      className="w-full p-2 border rounded"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onFocus={() => setTyping(m.id, true)}
                      onBlur={() => setTyping(m.id, false)}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => { setReplyingTo(null); setReplyText(""); setTyping(m.id, false); }} className="px-3 py-1 border cursor-pointer rounded text-sm">Cancel</button>
                      <button onClick={() => submitReply(m.id)} className="px-3 py-1 cursor-pointer bg-indigo-600 text-white rounded text-sm" disabled={!replyText.trim()}>Reply</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Load more */}
        {messages.length > visibleCount && (
          <div className="text-center mt-4">
            <button onClick={loadMore} className="px-4 py-2 border cursor-pointer rounded">Load more</button>
          </div>
        )}
      </div>

      {/* Report modal */}
      {reportingMessageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative bg-white rounded-lg p-6 w-[92%] max-w-md shadow-lg z-60">
            <h3 className="text-lg text-red-500 font-semibold mb-3">Report Message</h3>
            <h4 className="text-sm text-gray-700 mb-3">
              🚨 Once reported, this message will be reviewed.
              If it contains inappropriate or harmful content, it will be permanently deleted.</h4><br></br>
            <div className="space-y-2">
              {["Abuse", "Fake Information", "Privacy Concern", "Spam", "Misspelling", "Others"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" name="reportReason" value={opt} checked={reportReason === opt} onChange={() => setReportReason(opt)} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {reportReason === "Others" && (
              <textarea placeholder="Write reason..." className="w-full mt-3 p-2 border rounded" rows={3} value={customReason} onChange={(e) => setCustomReason(e.target.value)} />
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={closeReportModal} className="px-3 py-1 border cursor-pointer rounded">Cancel</button>
              <button onClick={submitReport} className="px-3 py-1 bg-red-600 text-white cursor-pointer rounded" disabled={!reportReason || (reportReason === "Others" && !customReason.trim())}>
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile modal */}
      {profileEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={closeProfile}></div>
          <div className="relative bg-white rounded-lg p-6 w-[92%] max-w-lg shadow-lg z-60">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Profile — {profileEmail}</h3>
              <button onClick={closeProfile} className="text-gray-500">Close</button>
            </div>

            <div className="mt-3">
              <div className="text-sm text-gray-700">Posts: <strong>{profileData.stats.postsCount || 0}</strong></div>
              <div className="text-sm text-gray-700">Total likes: <strong>{profileData.stats.totalLikes || 0}</strong></div>
              <div className="text-sm text-gray-700">Total reactions: <strong>{profileData.stats.totalReactions || 0}</strong></div>
            </div>

            <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
              {profileData.posts.map((p) => (
                <div key={p.id} className="p-3 border rounded bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-gray-500" title={formatDate(p.createdAt)}>{timeAgo(p.createdAt)}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{p.text}</div>
                  <div className="mt-2 text-xs text-gray-500">Reactions: {REACTION_TYPES.map(rt => `${rt}:${p.reactionCounts[rt] || 0}`).join(" • ")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
