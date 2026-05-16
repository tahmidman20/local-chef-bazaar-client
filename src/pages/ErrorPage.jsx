import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-xl font-semibold mb-2">Something went wrong.</p>
        <p className="text-gray-600 mb-6">
          {error.statusText || error.message || "An unexpected error occurred."}
        </p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90 transition duration-200"
            style={{ backgroundColor: "#ff5a5f" }} // Assuming secondary color or custom
          >
            Try Again
          </button>
          <Link
            to="/"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
