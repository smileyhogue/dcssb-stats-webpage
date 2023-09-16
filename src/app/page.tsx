import TopPlayers from "./components/topPlayers";
import UserSearch from "./components/userSearch";
import NavBar from './components/navBar'

export default async function Page() {
  return (
    <main>
      <NavBar />
      <UserSearch />
      <TopPlayers />
    </main>
  );
}