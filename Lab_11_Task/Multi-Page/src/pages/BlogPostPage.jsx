import { useParams, useNavigate } from "react-router-dom";

const blogs = {
  1: { title: "First Post", content: "This is the first blog post." },
  2: { title: "Second Post", content: "This is the second blog post." },
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs[id];

  if (!blog) return <p>Post not found.</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};
export default BlogPostPage;
