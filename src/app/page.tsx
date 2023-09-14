// Define the data item received from the API.
type TopKillsItem = {
  fullNickname: string;
  AAkills: number;
  deaths: number;
  AAKDR: number;
};

interface Props {
  topKills: TopKillsItem[];
  numColumns: number;
}

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
export default async function Page() {
  // Fetch the top kills data asynchronously.
  const topKills = await getTopKillData();

  // Sort the top kills data in descending order based on AAkills (most kills first).
  topKills.sort((a, b) => b.AAkills - a.AAkills);

  // Take the top 5 kills for display.
  const top5Kills = topKills.slice(0, 5);

  // Render the UI with the top 5 kills data.
  const containerClassName = `container mx-auto p-4 ${process.env.PRIMARY_BACKGROUND_COLOR} ${process.env.TEXT_COLOR}`;
  const cardContainerClassName = `${process.env.CARD_BACKGROUND_COLOR} p-1 rounded-lg`;
  const cardTextClassName = `${process.env.CARD_TEXT_COLOR} p-2 rounded-lg`;

  return (
    <main className={containerClassName}>
      {top5Kills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {top5Kills.map((kill: TopKillsItem, index: number) => (
            <div key={index} className={cardContainerClassName}>
              <div className={cardTextClassName}>
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
