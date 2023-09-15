import React from "react";

type UserStatsData = {
  deaths: number;
  aakills: number;
  aakdr: number;
  lastSessionKills: number;
  lastSessionDeaths: number;
  killsByModule: { module: string; kills: number }[];
  kdrByModule: { module: string; kdr: number }[];
};

type UserStatsProps = {
  data: UserStatsData;
};

const UserStats: React.FC<UserStatsProps> = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl mb-2">Primary Stats</h3>
          <p>Deaths: {data.deaths}</p>
          <p>AA Kills: {data.aakills}</p>
          <p>AA KDR: {data.aakdr}</p>
          <p>Last Session Kills: {data.lastSessionKills}</p>
          <p>Last Session Deaths: {data.lastSessionDeaths}</p>
        </div>
        <div>
          <h3 className="text-xl mb-2">Kills By Module</h3>
          {data.killsByModule.map((module, index) => (
            <div key={index}>
              <strong>{module.module}:</strong> {module.kills}
            </div>
          ))}
        </div>
        <div className="col-span-2">
          <h3 className="text-xl mb-2">KDR By Module</h3>
          {data.kdrByModule.map((module, index) => (
            <div key={index}>
              <strong>{module.module}:</strong> {module.kdr.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserStats;