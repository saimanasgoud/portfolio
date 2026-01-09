import React, { useState, useEffect, useRef } from "react";

const COLORS = { user: "#facc15", computer: "#22c55e" };
const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
const JOKES = [
  "You WON! The computer is updating its résumé 😭😂",
  "Booyah! You crushed it! 🎉🔥",
  "Winner Winner Chicken Dinner! 🍗🏆",
  "You beat AI! Scientists want to study your brain 🧠🔥",
  "Computer defeated! Someone call tech support 😵‍💻",
  "Winner! Your mouse just requested your autograph 🐭✍️",
  "Raktha pingari roi 🐍 busakotatandi roi 🐉",
];

const CrazyTicTacToe = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [userSymbol, setUserSymbol] = useState("X");
  const [computerSymbol, setComputerSymbol] = useState("O");

  const [difficulty, setDifficulty] = useState("Medium");
  const [tempDifficulty, setTempDifficulty] = useState("Medium");

  const [firstTurn, setFirstTurn] = useState("user");
  const [tempFirstTurn, setTempFirstTurn] = useState("user");

  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [joke, setJoke] = useState("");
  const [showText, setShowText] = useState(false);
  const [message, setMessage] = useState("");

  // Track scores
  const [scores, setScores] = useState({
    wins: { Easy: 0, Medium: 0, Hard: 0 },
    losses: 0,
    draws: 0,
    playedGames: 0
  });

  const [showWinsDetail, setShowWinsDetail] = useState(false);
  const [feedback, setFeedback] = useState("");

  const screenRef = useRef(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (screenRef.current) {
      const { width, height } = screenRef.current.getBoundingClientRect();
      setScreenSize({ width, height });
    }
  }, [screenRef.current]);

  const checkWinner = (b) => {
    for (let pattern of WIN_PATTERNS) {
      const [a, b1, c] = pattern;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return [b[a], pattern];
    }
    return b.includes(null) ? null : ["Draw", []];
  };

  const findWinningMove = (b, symbol) => {
    for (let pattern of WIN_PATTERNS) {
      const line = pattern.map(i => b[i]);
      if (line.filter(v => v === symbol).length === 2 && line.includes(null)) return pattern[line.indexOf(null)];
    }
    return null;
  };

  const computerMove = () => {
    if (winner) return;
    const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
    if (!empty.length) return;

    let move;
    if (difficulty === "Hard") {
      move = findWinningMove(board, computerSymbol) || findWinningMove(board, userSymbol);
    }
    if (!move && difficulty === "Medium") move = findWinningMove(board, userSymbol);
    if (!move) move = empty[Math.floor(Math.random() * empty.length)];

    const newBoard = [...board];
    newBoard[move] = computerSymbol;
    setBoard(newBoard);
    setIsUserTurn(true);
  };

  const hardReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setJoke("");
    const computerStarts = tempFirstTurn === "computer";
    setFirstTurn(tempFirstTurn);
    setDifficulty(tempDifficulty);
    setIsUserTurn(!computerStarts);
    if (computerStarts) setTimeout(computerMove, 500);
  };

  const handleClick = (i) => {
    if (!board[i] && isUserTurn && !winner) {
      const newBoard = [...board];
      newBoard[i] = userSymbol;
      setBoard(newBoard);
      setIsUserTurn(false);
    }
  };

  useEffect(() => {
    if (!isUserTurn && !winner) setTimeout(computerMove, 500);

    const result = checkWinner(board);
    if (result && !winner) {
      setWinner(result[0]);
      setWinningLine(result[1]);

      setScores(prev => {
        let newScores = { ...prev, playedGames: prev.playedGames + 1 };

        if (result[0] === userSymbol) {
          newScores.wins = { ...prev.wins, [difficulty]: prev.wins[difficulty] + 1 };
        } else if (result[0] === "Draw") {
          newScores.draws += 1;
        } else {
          newScores.losses += 1;
        }

        return newScores;
      });

      if (result[0] === userSymbol) {
        setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
      }
    }
  }, [board, isUserTurn]);

  useEffect(() => {
    if (!isUserTurn && !winner) setTimeout(computerMove, 500);
    const result = checkWinner(board);
    if (result && !winner) {
      setWinner(result[0]);
      setWinningLine(result[1]);
      if (result[0] === userSymbol) {
        setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
        setScores(prev => (({
          ...prev,
          wins: { ...prev.wins, [difficulty]: prev.wins[difficulty] + 1 }
        })));
      } else if (result[0] === "Draw") {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      } else {
        setScores(prev => ({ ...prev, losses: prev.losses + 1 }));
      }
    }
  }, [board, isUserTurn]);

  const saveSettings = () => {
    setDifficulty(tempDifficulty);
    setFirstTurn(tempFirstTurn);
    setIsUserTurn(tempFirstTurn === "user");
    setComputerSymbol(userSymbol === "X" ? "O" : "X");
    setShowSettings(false);
    hardReset();
  };

  const resetAllScores = () => {
    setScores({ wins: { Easy: 0, Medium: 0, Hard: 0 }, losses: 0, draws: 0 });
    setFeedback("");
  };

  return (
    <div ref={screenRef} className="flex mb-5 flex-col items-center justify-center p-1 mt-15 font-sans relative text-gray-900">

      {/* Landing Page */}
      {showLanding && (
        <div className="flex flex-col items-center gap-6 mt-10">
          <h1 className="text-4xl font-extrabold text-center drop-shadow-lg">🎮 Crazy Tic-Tac-Toe</h1>
          <h2 className="text-2xl font-semibold text-center">Triad Tactics – Refers to forming three-in-a-row strategically.</h2>
          <div className="flex gap-6 mt-4">
            <button onClick={() => {
              setShowLanding(false);
              setShowGame(true);
              setIsUserTurn(tempFirstTurn === "user");
              setComputerSymbol(userSymbol === "X" ? "O" : "X");
                hardReset();
                setMessage("");
              }} className="bg-green-500 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-600 transition transform hover:scale-105 cursor-pointer">
                Lets begin 😎
              </button>
              <button
                onClick={() => setMessage(prev => prev ? "" : "No problem 😴, see you later!")}
                className="bg-gray-400 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-gray-500 transition transform hover:scale-105 cursor-pointer"
              >
                play Later 😴
              </button>
              </div>
              {message && (
              <p className="mt-4 text-pink-500 font-semibold text-lg">
                {message}
              </p>
              )}
            </div>
            )}

            {/* Game UI */}
      {showGame && (
        <div className="w-100 max-w-ls p-4 bg-white mt-10 rounded-2xl shadow-2xl">

          {/* Settings Button */}
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowSettings(true)} className="bg-blue-500 px-2 py-1 rounded-lg text-white hover:bg-blue-600 cursor-pointer shadow-md">
              ⚙️ Settings
            </button>
          </div>

          {/* Game Info Panel */}
          <div className="flex justify-evenly mt-5 mb-5 bg-yellow-100 rounded-lg p-3 gap-4 items-center mb-2 text-sm text-gray-700">
            <div>Mode: {difficulty}</div>
            <div>First Turn: {firstTurn === "user" ? "YOU 🧑" : "AI 🤖"}</div>
            <div>Symbol: {userSymbol}</div>
          </div>

          {/* Turn Indicator */}
          <div className="flex justify-center items-center gap-3 mb-3 font-semibold">
            {winner ? (
              <span className="text-lg font-bold">Game Over</span>
            ) : isUserTurn ? (
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: COLORS.user }}></span>🧑 Your Turn</div>
            ) : (
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: COLORS.computer }}></span>🤖 Computer Turn</div>
            )}
          </div>

          {/* Board */}
          <div className="grid grid-cols-3 ml-5 gap-5">
            {board.map((cell, i) => (
              <div key={i} onClick={() => handleClick(i)}
                className={`w-20 h-20 flex items-center justify-center rounded-lg shadow-md cursor-pointer text-4xl font-bold transition-all duration-300 hover:scale-105 ${winningLine.includes(i) ? "ring-4 ring-red-500 animate-pulse" : ""}`}
                style={{ backgroundColor: cell === userSymbol ? COLORS.user : cell === computerSymbol ? COLORS.computer : "#f8fafc" }}>
                {cell}
              </div>
            ))}
          </div>

          {/* Winner Message */}
          {winner && (
            <div className="mt-8 text-center font-bold text-xl">
              {winner === "Draw"
                ? "It's a Draw! 🤝"
                : winner === userSymbol
                  ? joke
                  : "Computer Wins 😎"}

              <div className="mt-4 flex items-center justify-center space-x-2">
                <h4 className="text-lg font-semibold">Want to play again?</h4>
                
                <button
                  className="px-4 py-1 text-sm bg-green-200 border rounded-lg cursor-pointer hover:bg-green-300 transition"
                  onClick={hardReset}
                >
                  Restart
                </button>
              </div>

           <p className="text-sm font-normal italic bg-blue-50 p-2 mt-5 text-left rounded-lg">
            You can customize your preferences anytime through the <strong className="text-blue-700">"⚙️ Settings"</strong> menu.</p>
            </div>

            
          )}

          {/* Settings Panel */}
          {showSettings && (
              <div className="fixed inset-0 z-50 bg-black/ backdrop-blur-sm flex justify-end items-start">
              <div className="relative ml-auto bg-white w-80 p-6 h-full overflow-y-auto shadow-4xl rounded-l-3xl">
                <h2 className="text-2xl font-bold mb-4">⚙️ Game Settings</h2>

                {/* Navigation */}
                <button className="flex-1 px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => { setShowSettings(false); setShowGame(false); setShowLanding(true); }}>🏠 Return Home</button>
                <button className="px-4 py-2 mb-2 flex-1 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={hardReset}>🎮 Restart Game</button>

                <div className="border-t border-gray-300 my-2"></div>
                <div className="mb-4">Hit save button to apply the changes</div>

                {/* Scores */}
                <button
                  onClick={() => setShowWinsDetail(!showWinsDetail)}
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-yellow-100 text-green-600 font-bold hover:bg-yellow-300 transition cursor-pointer"
                >
                Show me the glory 🏆
                </button>

                {showWinsDetail && (
                  <div className="mb-3 border rounded-lg p-3 bg-gray-50 shadow-sm">
                    <p className="font-medium text-purple-500">Easy Wins: {scores.wins.Easy}</p>
                    <p className="font-medium text-purple-700">Medium Wins: {scores.wins.Medium}</p>
                    <p className="font-medium text-purple-800">Hard Wins: {scores.wins.Hard}</p>
                    <p className="font-medium text-red-500">Total Losses: {scores.losses}</p>
                    <p className="font-medium text-blue-500">Total Draws: {scores.draws}</p>
                    <p className="font-medium text-green-600">Games Played: {scores.playedGames}</p>

                  </div>
                )}

                {/* Game Options */}
                <div className="mb-3 text-pink-500 gap-4">
                  <label className="font-semibold text-purple-600 mt-2 block mb-1">Difficulty Level:</label>
                  <select
                    value={tempDifficulty}
                    onChange={e => setTempDifficulty(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border cursor-pointer focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="" disabled>Select</option>
                    <option value="Easy">Chill & Win 🏖️ (Easy)</option>
                    <option value="Medium">Think Big 🤔 (Medium)</option>
                    <option value="Hard">Brain-Breaker 💥 (Hard)</option>
                  </select>
                </div>

                <div className="mb-3 text-pink-500 gap-4">
                  <label className="font-semibold text-purple-600 mt-2">Who Starts First:</label>
                  <select value={tempFirstTurn} onChange={e => setTempFirstTurn(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border cursor-pointer">
                    <option value="" disabled>Select</option>
                    <option value="user">YOU 🧑</option>
                    <option value="computer">AI 🤖</option>
                  </select>
                </div>

                <div className="mb-3 text-pink-500 gap-4">
                  <label className="font-semibold text-purple-600 mt-2">Choose Your Symbol:</label>
                  <select value={userSymbol} onChange={e => {
                    const newUserSymbol = e.target.value;
                    setUserSymbol(newUserSymbol);
                    setComputerSymbol(newUserSymbol === "X" ? "O" : "X");
                  }}
                    className="w-full text-pink-500 px-3 py-2 rounded-lg border cursor-pointer">
                    <option value="" disabled>Select</option>                    
                    <option value="X">X</option>
                    <option value="O">O</option>
                  </select>
                </div>

                {/* Feedback */}
                <div className="mb-3">
                  <button
                    onClick={() => setShowText(prev => !prev)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Feedback
                  </button>

                  {showText && (
                    <ul className="mt-2 text-gray-700 font-medium space-y-1">
                      <li className="mt-2 text-gray-700 font-medium text-red-500">Have suggestions or issues? Your feedback helps us improve! 🛠️</li>
                      <li className="mt-2 text-gray-700 font-medium text-red-500">You can write a feedback message on <strong className="text-green-500">"Let's Connect ✨"</strong></li>
                    </ul>
                  )}
                </div>
                <style>{`button { cursor: pointer; }`}</style>

                <div className="border-t border-gray-300 my-2"></div>

                {/* Actions */}
                <button onClick={() => { setShowSettings(false); setShowGame(false); setShowLanding(true) }} className="w-full px-4 py-2 mb-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 cursor-pointer">❌ Exit Game</button>

                {/* Save / Cancel */}
                <div className="flex justify-between mt-4">
                  <button onClick={saveSettings} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">💾 Save</button>
                  <button onClick={() => setShowSettings(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer">❌ Cancel</button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default CrazyTicTacToe;
