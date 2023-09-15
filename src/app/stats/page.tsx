// Your imports
"use client";
import '../globals.css';
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react"; // <-- Added useEffect
import UserSearch from "../components/userSearch";

export default function Stats() {
    const [userStats, setUserStats] = useState<{
      deaths?: number;
      aakills?: number;
      aakdr?: number;
      lastSessionKills?: number;
      lastSessionDeaths?: number;
      killsByModule?: { module: string; kills: number }[];
      kdrByModule?: { module: string; kdr: number }[];
    } | null>(null);
  
    const searchParams = useSearchParams();
    const nick = searchParams.get("nick");
    const date = searchParams.get("date");
  
    useEffect(() => {
      if (!nick || !date) return;
  
      const fetchUserData = async () => {
        const body = JSON.stringify({ nick: nick, date: date });
        const response = await fetch("/api/getStats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
          next: { revalidate: 1 },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        setUserStats(data);
      };
  
      fetchUserData();
    }, [nick, date]);
  
    if (!nick || !date) {
      return <div>Loading...</div>;
    }

  return (
    <main>
    <UserSearch />
    <div className="container mx-auto p-4">
      <h1>Stats</h1>
      <p>User: {nick}</p>

      {userStats && (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="top-kills-card p-1 rounded-md">
            <div className="top-kills-card-content p-2 rounded-md">
              <h3 className="text-lg font-semibold mb-2">General Stats</h3>
              <p className="text-base">Deaths: {userStats.deaths}</p>
              <p className="text-base">AA Kills: {userStats.aakills}</p>
              <p className="text-base">AA KDR: {userStats.aakdr}</p>
              <p className="text-base">
                Last Session Kills: {userStats.lastSessionKills}
              </p>
              <p className="text-base">
                Last Session Deaths: {userStats.lastSessionDeaths}
              </p>
            </div>
          </div>

          {userStats.killsByModule?.map((item, index) => {
            const kdrItem = userStats.kdrByModule?.find(
              (kdr) => kdr.module === item.module
            );
            return (
              <div key={index} className="top-kills-card p-1 rounded-md">
                <div className="top-kills-card-content p-2 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">{item.module}</h3>
                  <p className="text-base">Kills: {item.kills}</p>
                  <p className="text-base">KDR: {kdrItem?.kdr.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </main>
  );
}
