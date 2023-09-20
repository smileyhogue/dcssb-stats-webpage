import { NextRequest, NextResponse } from "next/server";

async function searchUser(nick: string){
  const response = await fetch(`${process.env.APP_URL}/api/searchUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nick: nick }),
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
}

async function getStats(nick: string, date: string){
  let apiEndpoint: string;
  if (process.env.VERCEL_URL) {
    apiEndpoint = `https://${process.env.VERCEL_URL}/api/getStats`;
  } else {
    apiEndpoint = `${process.env.APP_URL}/api/getStats`;
  }
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nick: nick, date:date }),
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
}

export async function GET(request: Request, response: Response) {
    const apiEndpoint = `${process.env.API_DOMAIN}/topkills`;
    const res = await fetch(apiEndpoint, { next: { revalidate: 120 } });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const topKills = await res.json();
    let topPlayers: string[] =  [];
    let topPlayersDate: string[] =  [];

    topKills.forEach((element: any) => {
      topPlayers.push(element.fullNickname);
    });

    for (let index = 0; index < topPlayers.length; index++) {
      const userData = await searchUser(topPlayers[index]);
      const userJSON = JSON.parse(JSON.stringify(userData));
      topPlayersDate.push(userJSON.date);
    };
    for (let index = 0; index < topPlayers.length; index++) {
      const statsData = await getStats(topPlayers[index], topPlayersDate[index]);
      topKills[index].stats = statsData;
    }
    return NextResponse.json(topKills);
}

export const dynamic = "force-dynamic";