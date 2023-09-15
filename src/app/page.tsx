import TopPlayers from "./components/topPlayers";
import UserSearch from "./components/userSearch";

// Define the main component for rendering the top kills data.
export default async function Page() {
  return (
    <main>
      <UserSearch />
      <TopPlayers />
    </main>
  );
}