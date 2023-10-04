import { searchUser } from './searchUser';
import { GetStats } from './getStats';

async function searchForUser(nick: string): Promise<object | undefined> {
  const data = await searchUser(nick);
  return data;
}

async function getStats(
  nick: string,
  date: string
): Promise<object | undefined> {
  const data = await GetStats(nick, date);
  return data;
}

async function getTopKillData() {
  // TODO: What kind of type goes here? I tried : Promise<Array<object>> but it causes an error in topPlayers.tsx
  const apiEndpoint = `${process.env.API_DOMAIN}/topkills`;
  const res = await fetch(apiEndpoint, { next: { revalidate: 120 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const topKills = await res.json();
  let topPlayers: string[] = [];
  let topPlayersDate: string[] = [];

  topKills.forEach((element: any) => {
    topPlayers.push(element.fullNickname);
  });
  for (let index = 0; index < topPlayers.length; index++) {
    const userData = await searchForUser(topPlayers[index]);
    const userJSON = JSON.parse(JSON.stringify(userData));
    topPlayersDate.push(userJSON[0].date);
  }
  for (let index = 0; index < topPlayers.length; index++) {
    const statsData = await getStats(topPlayers[index], topPlayersDate[index]);
    topKills[index].stats = statsData;
  }
  return topKills;
}

export { getTopKillData };
