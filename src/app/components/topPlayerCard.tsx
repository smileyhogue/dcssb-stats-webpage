import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/app/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";

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

interface TopPlayerCardProps {
    index: number;
    kill: any;
}

export default function TopPlayerCard({ index, kill }: TopPlayerCardProps) {
      return (
        <>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Card
                key={index}
                className="top-kills-card p-1 rounded-md"
              >
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
                  <p className="text-base">
                    KDR: {kill.AAKDR.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    @{kill.fullNickname}
                  </h4>
                  {kill.stats.killsByModule?.map((item: any, index: any) => {
                    const kdrItem = kill.stats.kdrByModule?.find(
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
                          {kdrItem && (
                            <p className="text-base">
                              Deaths: {item.kills / kdrItem?.kdr}
                            </p>
                          )}
                          <p className="text-base">
                            KDR: {kdrItem?.kdr.toFixed(2)}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </>
)};
