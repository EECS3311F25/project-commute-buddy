// src/pages/Forbidden.jsx
export default function Forbidden() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-2 text-red-600">403</h1>
      <p className="text-lg text-gray-600">
        You don’t have permission to access this page.
      </p>
    </div>
  );
}
