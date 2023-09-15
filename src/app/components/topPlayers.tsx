// Define the data item received from the API.
type TopKillsItem = {
  fullNickname: string;
  AAkills: number;
  deaths: number;
  AAKDR: number;
};
// fetch data from API endpoint.
async function getTopKillData() {
  const apiEndpoint = `${process.env.API_DOMAIN}/topkills`;
  // Make an HTTP GET request to the specified URL.
  const res = await fetch(apiEndpoint, { next: { revalidate: 120 } });
  // Check if the response is successful.
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Parse the response body as JSON and return it as a Promise of an array of TopKillsItem.
  return res.json() as Promise<TopKillsItem[]>;
}
// Define the main component for rendering the top kills data.
export default async function TopPlayers() {
  // Fetch the top kills data asynchronously.
  const topKills = await getTopKillData();
  // Sort the top kills data in descending order based on AAkills (most kills first).
  topKills.sort((a, b) => b.AAkills - a.AAkills);
  // Take the top kills for display. - default to 5
  var topPlayers = 5;
  if (process.env.TOP_PLAYERS) {
    topPlayers = +process.env.TOP_PLAYERS!;
  }
  const topCountKills = topKills.slice(0, topPlayers);
  return (
    <>
      <p className="container text-center mx-auto text-2xl font-semibold pt-4">Top Players</p>
      {topCountKills.length > 0 ? (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {topCountKills.map((kill: TopKillsItem, index: number) => (
            <div key={index} className="top-kills-card p-1 rounded-md">
              <div className="top-kills-card-content p-2 rounded-md">
                <h3 className="rank text-lg font-semibold mb-2">
                  Rank #{index + 1}:{" "}
                </h3>
                <h3 className="text-lg font-semibold mb-2">
                  {" "}
                  {kill.fullNickname}
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
    </>
  );
}
