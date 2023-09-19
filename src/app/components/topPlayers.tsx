import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

type TopKillsItem = {
  fullNickname: string;
  AAkills: number;
  deaths: number;
  AAKDR: number;
};
async function getTopKillData() {
  const apiEndpoint = `${process.env.API_DOMAIN}/topkills`;
  const res = await fetch(apiEndpoint, { next: { revalidate: 120 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<TopKillsItem[]>;
}

export default async function TopPlayers() {
  const topKills = await getTopKillData();
  topKills.sort((a, b) => b.AAkills - a.AAkills);
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
            if (kill.fullNickname === "SmokeMagic") {
              return (
                <Card
                  key={index}
                  className="smoke top-kills-card p-1 rounded-md"
                >
                  <CardHeader className="smoke-content rank text-lg font-semibold mb-2">
                      <CardTitle>Rank #{index + 1}: </CardTitle>
                  </CardHeader>
                  <CardContent className="smoke-content top-kills-card-content content-center text-center p-2 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">
                      {kill.fullNickname}
                    </h3>

                    <p className="text-base">Kills: {kill.AAkills}</p>
                    <p className="text-base">Deaths: {kill.deaths}</p>
                    <p className="text-base">KDR: {kill.AAKDR.toFixed(2)}</p>
                  </CardContent>
                </Card>
              );
            } if (kill.fullNickname === "Angry Balls") {
              return (
                <Card
                  key={index}
                  className="scribbles top-kills-card p-1 rounded-md"
                >
                  <CardHeader className="scribbles-content rank text-lg font-semibold mb-2 [text-shadow:_1px_2px_10px_rgb(0_0_0_/_80%)]">
                      <CardTitle>Rank #{index + 1}: </CardTitle>
                  </CardHeader>
                  <CardContent className="scribbles-content top-kills-card-content content-center text-center p-2 rounded-md [text-shadow:_1px_2px_10px_rgb(0_0_0_/_80%)]">
                    <h3 className="text-lg font-semibold mb-2">
                      {kill.fullNickname}
                    </h3>

                    <p className="text-base">Kills: {kill.AAkills}</p>
                    <p className="text-base">Deaths: {kill.deaths}</p>
                    <p className="text-base">KDR: {kill.AAKDR.toFixed(2)}</p>
                  </CardContent>
                </Card>
              );
            }
            return (
              <Card key={index} className="top-kills-card p-1 rounded-md">
                <CardHeader className="rank text-lg font-semibold mb-2">
                  <CardTitle>Rank #{index + 1}: </CardTitle>
                </CardHeader>
                <CardContent className="top-kills-card-content content-center text-center p-2 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">
                    {" "}
                    {kill.fullNickname}
                  </h3>
                  <p className="text-base">Kills: {kill.AAkills}</p>
                  <p className="text-base">Deaths: {kill.deaths}</p>
                  <p className="text-base">KDR: {kill.AAKDR.toFixed(2)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
