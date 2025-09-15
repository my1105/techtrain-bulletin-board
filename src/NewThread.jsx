import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

function Toast({ message, onClose }) {
  useState(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div className="toast">
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
}

function NewThread() {
  const [newTitle, setNewTitle] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const MAX = 30;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length > MAX) {
      showToast(`タイトルは${MAX}文字以内で入力してください`);
      return; 
    }
    setNewTitle(value);
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    const trimmed = newTitle.trim();

    if (trimmed.length === 0) {
      showToast("タイトルを入力してください");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });
      if (!res.ok) throw new Error("スレッド作成に失敗しました");
      navigate("/threads");
    } catch (err) {
      showToast(err?.message ?? "通信エラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <h1>スレッドを新規作成</h1>

        <form className="new-thread-form" onSubmit={handleCreateThread}>
          <input
            type="text"
            value={newTitle}
            placeholder="スレッドタイトル"
            onChange={handleInputChange}
            aria-label="スレッドタイトル"
          />
          <div className="form-footer">
            <Link to="/threads" className="back-link">← トップに戻る</Link>
            <button
              type="submit"
              className={`create-button ${newTitle.trim().length > 0 ? "active" : ""}`}
              disabled={newTitle.trim().length === 0 || loading}
            >
              {loading ? "送信中..." : "作成"}
            </button>
          </div>
        </form>

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </main>
    </div>
  );
}

export default NewThread;
