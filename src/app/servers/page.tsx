import ServerCard from '@/app/components/serverCard';
import NavBar from '@/app/components/navBar';
import { Suspense } from 'react';

export default async function Servers() {
  const response = await fetch('https://dcssbapi.twothreexray.com/servers', {
    next: { revalidate: 120 },
  });
  const servers = await response.json();
  return (
    <>
      <NavBar />
      <h1 className="text-2xl font-bold">Servers</h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        {servers.map((server: any, index: number) => (
          <ServerCard key={index} data={server} />
        ))}
      </Suspense>
    </>
  );
}
