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

export default function ServerCard({ data, index }: any) {
  const server = data;
  const missionTimeH = Math.floor(server.data.mission_time / 3600);
  const missionTimeM = Math.floor((server.data.mission_time % 3600) / 60);
  const missionTimeS = Math.floor((server.data.mission_time % 3600) % 60);
  const missionTime = missionTimeH + ":" + missionTimeM + ":" + missionTimeS;
  return (
    <Card key={index} className="top-kills-card p-1 rounded-md mb-4">
      <CardHeader className="rank text-lg font-semibold mb-2">
        <CardTitle>{server.server_name}</CardTitle>
        <CardDescription>
          {server.data.server_status === "Status.RUNNING"
            ? "Online"
            : "Offline"}
        </CardDescription>
      </CardHeader>
      {server.data.server_status === "Status.RUNNING" ? (
        <CardContent className="smoke-content top-kills-card-content content-center text-center p-2 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Server Name: {server.data.server_display_name}
          </h3>

          <p className="text-base">Current Map: {server.data.current_map}</p>
          <p className="text-base">
            Current Mission: {server.data.current_mission}
          </p>
          <p className="text-base">
            Current Players: {server.data.active_players} /{" "}
            {server.data.max_players}
          </p>
          <p className="text-base">Mission Time: {missionTime}</p>
          <hr className="my-2" />
          <h3 className="text-md font-semibold mb-2">Weather</h3>
          <p className="text-base">
            Cloud Base: {server.weather.clouds.base * 3.3} ft
          </p>
          <p className="text-base">
            Temperature: {server.weather.season.temperature} C
          </p>
            <p className="text-base">
                Wind Speed at 0ft: {(server.weather.wind.atGround.speed * 1.94384).toFixed(0)} kts @ {server.weather.wind.atGround.dir}
            </p>
            <p className="text-base">
                Wind Speed at 2000ft: {(server.weather.wind.at2000.speed * 1.94384).toFixed(0)} kts @ {server.weather.wind.at2000.dir}
            </p>
            <p className="text-base">
                Wind Speed at 8000ft: {(server.weather.wind.at8000.speed * 1.94384).toFixed(0)} kts @ {server.weather.wind.at8000.dir}
            </p>
        </CardContent>
      ) : (
        <CardContent className="smoke-content top-kills-card-content content-center text-center p-2 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Server is currently offline.
          </h3>
        </CardContent>
      )}
    </Card>
  );
}
