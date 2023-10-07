import TopPlayers from './components/topPlayers';
import UserSearch from './components/userSearch';
import NavBar from './components/navBar';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <UserSearch />
        <Suspense fallback={<p>Loading feed...</p>}>
          <TopPlayers />
        </Suspense>
      </main>
    </>
  );
}
