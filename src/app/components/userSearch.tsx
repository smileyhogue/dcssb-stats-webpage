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
import { searchUser } from "@/app/utils/searchUser";

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
      const searchedUser = await searchUser(query);
      const data = await searchedUser;
      if (data.length === 0) {
        setNoUser(true);
        return;
      }
      const nick = data[0].nick;
      const date = data[0].date;
      if (data[0].nick == null || data[0].date == null) {
        setNoUser(true);
      }
      console.log(nick, date);
      router.push(`/stats?nick=${nick}&date=${date}`);
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
