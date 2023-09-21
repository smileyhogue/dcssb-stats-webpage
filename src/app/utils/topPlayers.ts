import { searchUser } from "./searchUser";
import { GetStats } from "./getStats";

async function searchForUser(nick: string){
    const data = await searchUser(nick);
    return data;
  }
  
  async function getStats(nick: string, date: string){
    const data = await GetStats(nick, date);
    return data;
  }

  async function getTopKillData() {
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
        const userData = await searchForUser(topPlayers[index]);
        const userJSON = JSON.parse(JSON.stringify(userData));
        topPlayersDate.push(userJSON[0].date);
      };
      console.log("topPlayersDate: ", topPlayersDate);
      for (let index = 0; index < topPlayers.length; index++) {
        const statsData = await getStats(topPlayers[index], topPlayersDate[index]);
        topKills[index].stats = statsData;
      }
      // return topKills as JSON
      //console.log("topKills: ", topKills);
      return topKills;
  }

export { getTopKillData }