import React, { useState, useEffect } from "react";
import { db, ref, remove } from "./firebase"; // make sure you import your Firebase config

function emailToKey(email) {
  // simple conversion to safe key for RTDB
  return email.replace(".", "_");
}

function MessageDisply() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showPostForm, setShowPostForm] = useState(true);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [typing, setTyping] = useState({});


  useEffect(() => {
    setUserName(localStorage.getItem("name") || "");
    setUserEmail(localStorage.getItem("email") || "");
  }, []);

  const handleSendMessage = () => {
    if (!messageText) return alert("Please enter a message.");
    // here you can push the message to Firebase RTDB or your backend
    alert("Message submitted!");
    setMessageText("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {showPostForm && !showUserPopup && (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          {/* User info bar */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-green-500">{userName}</div>
                <div className="text-xs text-green-700">{userEmail}</div>
              </div>
            </div>
            <div className="flex gap-2">
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
                  setUserName("");
                  setUserEmail("");
                  try {
                    localStorage.removeItem("name");
                    localStorage.removeItem("email");
                  } catch (e) {}
                  if (email) {
                    try {
                      await remove(ref(db, `presence/${emailToKey(email)}`));
                    } catch (e) {}
                  }
                  setShowPostForm(false);
                  setShowUserPopup(true);
                  alert("Your details have been removed.");
                }}
                className="text-xs cursor-pointer text-red-600 hover:underline"
              >
                Delete details
              </button>
            </div>
          </div>

          {/* Message input */}
          <div className="space-y-3">
            <textarea
              rows={4}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
              placeholder="Share your thoughts professionally and respectfully. Remember, your message will be visible to all users in real-time."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onFocus={() => setTyping({ ...typing, newMessage: true })}
              onBlur={() => setTyping({ ...typing, newMessage: false })}
            />
            {/* Character count & guidelines */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>{messageText.length}/1000 characters</div>
              <div className="flex items-center gap-2">
                <span>💡</span>
                <span>Keep it friendly and constructive</span>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageDisply;
