import TopPlayers from "./components/topPlayers";
import UserSearch from "./components/userSearch";
import NavBar from './components/navBar'

// Define the main component for rendering the top kills data.
export default async function Page() {
  return (
    <main>
      <NavBar />
      <UserSearch />
      <TopPlayers />
    </main>
  );
}