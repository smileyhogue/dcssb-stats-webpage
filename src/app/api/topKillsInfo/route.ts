import { NextRequest, NextResponse } from "next/server";

async function searchUser(nick: string){
  try {
    const formData = new FormData();
    formData.append("nick", nick);

    const response = await fetch(`${process.env.API_DOMAIN}/getuser`, {
      method: "POST",
      body: formData,
      next: { revalidate: 1 } 
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
    return ;
  }
}

async function getStats(nick: string, date: string){
  try {
    const formData = new FormData();
    formData.append("nick", nick);
    formData.append("date", date);
    const response = await fetch(`${process.env.API_DOMAIN}/stats`, {
      method: "POST",
      body: formData,
      next: { revalidate: 1 },
    });

    const data = await response.json();
    return data;
  }catch (error) {
    console.error(error);
    return;
  }
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