import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </div>
  );
}
export default App;
