import { useUser } from '@/context/userContext';
import Link from 'next/link';

const Home = () => {
  const { user, loading, logout } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Welcome to the App</h1>
        {user ? (
          <div className="text-center">
            <p className="mb-4">Hello, {user.username}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-center space-x-4">
            <Link href="/login" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Go to Login
            </Link>
            <Link href="/signup" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {user ? (
        <div className="flex space-x-4">
          <Link href="/speech" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">
            Text to Speech
          </Link>
          <Link href="/speech-to-text" className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Go to speech to text
          </Link>
        </div>
      ) : '' }
    </div>
  );
};

export default Home;
