import React from "react";

type TopKillsItem = {
  fullNickname: string;
  AAkills: number;
  deaths: number;
  AAKDR: number;
};

async function getData() {
  console.log("getServerSideProps");
  const res = await fetch("http://192.168.1.146:8085/topkills");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<TopKillsItem[]>;
}

export default async function Page() {
  const topKills = await getData();

  topKills.sort((a, b) => b.AAkills - a.AAkills);

  const top5Kills = topKills.slice(0, 5);

  return (
    <main className="container mx-auto p-4 bg-primary-main text-white">
      {top5Kills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {top5Kills.map((kill: TopKillsItem, index: number) => (
            <div
              key={index}
              className="bg-primary-orange p-1 rounded-lg"
            >
              <div className="bg-primary-gray text-black p-2 rounded-lg">
                {" "}
                <h3 className="text-lg font-semibold mb-2">
                  Name: {kill.fullNickname}
                </h3>
                <p className="text-base">Kills: {kill.AAkills}</p>
                <p className="text-base">Deaths: {kill.deaths}</p>
                <p className="text-base">KDR: {kill.AAKDR}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
