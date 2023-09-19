"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useEffect } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { ToastAction } from "@/app/components/ui/toast";
import { Terminal} from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [noSearch, setnoSearch] = useState(false);

  const router = useRouter(); // <-- Use the useRouter hook

  const { toast } = useToast();

  useEffect(() => {
    if (noSearch) {
      toast({
        variant: "destructive",
        title: "No search query",
        description: `Please enter a username to search for.`,
        action: (
          <ToastAction onClick={handleRefresh} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }

    if (noUser) {
      toast({
        variant: "destructive",
        title: "No user found",
        description: `User \"${query}\" does not exist. Please try again.`,
        action: (
          <ToastAction onClick={handleRefresh} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  }, [noUser, toast, noSearch, query]);

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
      if (data.nick == null || data.date == null) {
        setNoUser(true);
        handleRefresh();
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
    setnoSearch(false);
  };

  const handleSearch = () => {
    setNoUser(false);
    if (query.trim() === "") {
      setnoSearch(true);
      return;
    }
    setnoSearch(false);
    FetchUserData();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setNoUser(false);
    setnoSearch(false);
  };
  return (
    <div className="container content-center text-center">
      <h2>User Search</h2>
      <div className="flex">
        <Input
          type="text"
          placeholder="Enter a username"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="mt-2 p-2"
        />
        <Button type="submit" onClick={handleSearch} className="mt-2 px-4">
          Search
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {noUser && (
        <Alert className="mt-2 p-2">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            User &quot;{query}&quot; does not exist. Please try again.
          </AlertDescription>
        </Alert>
      )}
      {noSearch && (
        <Alert className="mt-2 p-2">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Please enter a username to search for.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UserSearch;
