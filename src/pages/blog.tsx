import { useUser } from "@/context/userContext";

const Blog = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Blog</h2>
        <p className="text-black">Welcome to the blog, {user?.username}!</p>
      </div>
    </div>
  );
};

export default Blog;
