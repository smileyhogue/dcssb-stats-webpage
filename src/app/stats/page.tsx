import "../globals.css";
import { GetStats } from "@/app/utils/getStats";
import React from "react";
import UserSearch from "../components/userSearch";
import NavBar from "../components/navBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { NextRequest } from "next/server";

export default async function Stats(request: any) {
  // convert request to json
  const query = JSON.parse(JSON.stringify(request));
  const nick = query.searchParams.nick;
  const date = query.searchParams.date;
  if (!nick || !date) return;
  const data = await GetStats(nick, date);

  return (
    <main>
      <UserSearch />
      <div className="container text-center mx-auto text-2xl font-semibold pt-4">
        <h1>Stats User: {nick}</h1>

        {data && (
          <div className="flex justify-center flex-wrap p-4 items-stretch">
            {" "}
            <Card className="top-kills-card m-2 flex-none flex-grow p-1 rounded-md flex flex-col">
              <CardHeader className="rank text-lg font-semibold mb-2">
                <CardTitle>General Stats</CardTitle>
              </CardHeader>
              <CardContent className="top-kills-card-content p-2 rounded-md flex-grow">
                <p className="text-base">Deaths: {data.deaths}</p>
                <p className="text-base">AA Kills: {data.aakills}</p>
                <p className="text-base">AA KDR: {data.aakdr}</p>
                <p className="text-base">
                  Last Session Kills: {data.lastSessionKills}
                </p>
                <p className="text-base">
                  Last Session Deaths: {data.lastSessionDeaths}
                </p>
              </CardContent>
            </Card>
            {data.killsByModule?.map((item: any, index: any) => {
              const kdrItem = data.kdrByModule?.find(
                (kdr: any) => kdr.module === item.module
              );
              return (
                <Card
                  key={index}
                  className="top-kills-card m-2 flex-none flex-grow p-1 rounded-md flex flex-col"
                >
                  <CardHeader className="rank text-lg font-semibold mb-2">
                    <CardTitle>{item.module}</CardTitle>
                  </CardHeader>
                  <CardContent className="top-kills-card-content p-2 rounded-md flex-grow">
                    <p className="text-base">Kills: {item.kills}</p>
                    {kdrItem && <p className="text-base">Deaths: {item.kills/kdrItem?.kdr}</p>}
                    <p className="text-base">KDR: {kdrItem?.kdr.toFixed(2)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
