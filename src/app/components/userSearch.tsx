"use client";
import React, { useState } from "react";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState<{ nick: string | null, date: string | null } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/searchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick: query }),
        next: { revalidate: 1 } 
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }
    fetchUserData();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Enter a username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-2 p-2 border rounded-lg"
      />
      <button onClick={handleSearch} className="mt-2 px-4 py-2 bg-primary-orange text-white rounded-lg">
        Search
      </button>
      {loading && <p>Loading...</p>}
      {userData !== null && (
        <div className="mt-4">
          <h3>User Information</h3>
          <p>Name: {userData.nick}</p>
          <p>Date: {userData.date }</p>
          {/* Add more user information fields as needed */}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
