import { useEffect, useState } from "react";
import Header from "./components/Header"; 
import "./App.css";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/threads`)
      .then((res) => {
        if (!res.ok) throw new Error("APIリクエストに失敗しました");
        return res.json();
      })
      .then((data) => setThreads(data));
  });


  return (
    <div className="app">
      <Header />

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
