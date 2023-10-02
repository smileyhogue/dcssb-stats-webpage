import TopPlayers from "./components/topPlayers";
import UserSearch from "./components/userSearch";

export default async function Page() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <UserSearch />
        <TopPlayers />
      </main>
    </>
  );
}