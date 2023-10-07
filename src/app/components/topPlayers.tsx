import TopPlayerCard from './topPlayerCard';
import { getTopKillData } from '@/app/utils/topPlayers';

type TopKillsItem = {
  fullNickname: string;
  AAkills: number;
  deaths: number;
  AAKDR: number;
  stats: {
    deaths: number;
    aakills: number;
    aakdr: number;
    lastSessionKills: number;
    lastSessionDeaths: number;
    killsByModule: { module: string; kills: number }[];
    kdrByModule: { module: string; kdr: number }[];
  };
};

async function TopPlayers() {
  const topKills = await getTopKillData();
  topKills.sort((a: any, b: any) => b.AAkills - a.AAkills);
  // Take the top kills for display. - default to 5
  var topPlayers = 5;
  if (process.env.TOP_PLAYERS) {
    topPlayers = +process.env.TOP_PLAYERS!;
  }
  const topCountKills = topKills.slice(0, topPlayers);
  return (
    <>
      <p className="container text-center mx-auto text-2xl font-semibold pt-4">
        Top Players
      </p>
      {topCountKills.length > 0 ? (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {topCountKills.map((kill: TopKillsItem, index: number) => {
            return <TopPlayerCard key={index} index={index} kill={kill} />;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default TopPlayers;
