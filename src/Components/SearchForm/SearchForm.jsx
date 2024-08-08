import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [status, setStatus] = useState("");
  const [launch, setLaunch] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ status, launch, type });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Original Launch:</label>
        <input
          type="text"
          value={launch}
          onChange={(e) => setLaunch(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
