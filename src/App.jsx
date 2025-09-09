import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [threads, setThreads] = useState([]);


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/threads`)
      .then((res) => {
        if (!res.ok) throw new Error("APIリクエストに失敗しました");
        return res.json();
      })
      .then((data) => setThreads(data));
  }, [API_BASE_URL]);


  return (
    <div className="app">

      <header className="header">
        <div className="header-left">掲示板</div>
        <div className="header-right">
          <a href="#" className="new-thread-link">スレッドを立てる</a>
        </div>
      </header>

      <main className="container">
        <h1>新着スレッド</h1>
        <div className="thread-list">
          {threads.map((thread) => (
            <div key={thread.id} className="thread-card">
              <p className="thread-title">{thread.title}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
