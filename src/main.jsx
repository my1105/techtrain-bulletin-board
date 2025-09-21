import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewThread from "./NewThread";
import ThreadDetail from "./ThreadDetail";
import { createRoot } from "react-dom/client"; 
import App from "./App.jsx"; 


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/threads" />} />
      <Route path="/threads" element={<App />} />
      <Route path="/threads/new" element={<NewThread />} />
      <Route path="/threads/:thread_id" element={<ThreadDetail />} />
      </Routes>
  </BrowserRouter>
  );
