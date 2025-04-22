import { Link } from "react-router-dom";

const blogs = [
  { id: "1", title: "First Post" },
  { id: "2", title: "Second Post" },
];

const BlogListPage = () => (
  <div>
    <h2>Blog Posts</h2>
    <ul>
      {blogs.map((post) => (
        <li key={post.id}>
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);
export default BlogListPage;
