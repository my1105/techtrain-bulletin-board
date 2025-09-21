import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "./components/Header";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MAX_LENGTH = 120;

const ThreadDetail = () => {
  const { thread_id } = useParams();
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [threadTitle, _setThreadTitle] = useState(location.state?.title ?? "");
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const res = await fetch(`${API_BASE_URL}/threads/${thread_id}/posts?offset=0`);
        if (!res.ok) throw new Error("投稿の取得に失敗しました");

        const data = await res.json();
        setPosts(data.posts ?? []);

      } catch (err) {
        setError(err.message ?? "データの取得に失敗しました");
      }
    };

    fetchPosts();
  }, [thread_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || newPost.length > MAX_LENGTH) return;

    try {
      const res = await fetch(`${API_BASE_URL}/threads/${thread_id}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: newPost }),
      });

      if (!res.ok) throw new Error("投稿に失敗しました");

      setNewPost("");
      const updated = await fetch(`${API_BASE_URL}/threads/${thread_id}/posts`);
      const updatedData = await updated.json();
      setPosts(updatedData.posts ?? []);
    } catch (err) {
      alert(err.message ?? "投稿エラー");
    }
  };

  if (error) return <div className="center error">エラー: {error}</div>;

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Link to="/" className="back-link">← スレッド一覧に戻る</Link>
        <h1>{threadTitle || "タイトルなし"}</h1>

        <div className="thread-layout" style={{ display: "flex", gap: "5rem" }}>

          <div style={{ flex: 2 }}>
            {posts.length === 0 ? (
              <p>まだ投稿がありません。</p>
            ) : (
              <ul className="thread-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {posts.map((p) => (
                  <li key={p.id} className="thread-card">
                    <p
                      className="post-body"
                      style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {p.post}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="投稿しよう!"
                rows={6}
                style={{ width: "100%", padding: "1rem" }}
              />

              {newPost.length > MAX_LENGTH && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>
                  120文字以内で入力してください
                </p>
              )}

              <button
                type="submit"
                className={`create-button ${newPost.trim().length > 0 && newPost.length <= MAX_LENGTH ? "active" : ""}`}
                disabled={newPost.trim().length === 0 || newPost.length > MAX_LENGTH}
              >
                投稿する
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThreadDetail;
