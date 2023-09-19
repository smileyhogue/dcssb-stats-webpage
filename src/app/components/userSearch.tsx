"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useEffect } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { ToastAction } from "@/app/components/ui/toast";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState<{
    nick: string | null;
    date: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  const router = useRouter(); // <-- Use the useRouter hook

  const { toast } = useToast();

  useEffect(() => {
    if (noUser) {
      toast({
        variant: "destructive",
        title: "No user found",
        description: `User \"${query}\" does not exist. Please try again.`,
        action: <ToastAction onClick={handleRefresh} altText="Try again">Try again</ToastAction>,
      });
    }
  }, [noUser, toast]);

  const FetchUserData = async () => {
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
      if (data.nick == null || data.date == null) {
        setNoUser(true);
        setQuery("");
      }
      router.push(`/stats?nick=${data.nick}&date=${data.date}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setQuery("");
    setNoUser(false);
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }
    FetchUserData();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="container content-center text-center">
      <h2>User Search</h2>
      <div className="flex">
        <Input
          type="text"
          placeholder="Enter a username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-2 p-2"
        />
        <Button type="submit" onClick={handleSearch} className="mt-2 px-4">
          Search
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {noUser && <p>No user found</p>}
    </div>
  );
};

export default UserSearch;
