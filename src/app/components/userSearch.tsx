"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState<{
    nick: string | null;
    date: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  const router = useRouter(); // <-- Use the useRouter hook

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/searchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick: query }),
        next: { revalidate: 1 },
      });

      if (!response.ok) {
        setNoUser(true);
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUserData(data);
      if ( data.nick == null || data.date == null) {
       setNoUser(true);
      }
      //After successfully fetching user data, navigate to /stats with query params
      router.push(`/stats?nick=${data.nick}&date=${data.date}`);
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
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-primary-orange text-white rounded-lg"
        >
          Search
        </button>
        {loading && <p>Loading...</p>}
        {noUser && <p>No user found</p>}
      </div>
  );
};

export default UserSearch;
