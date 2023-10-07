import ServerCard from '@/app/components/serverCard';
import NavBar from '@/app/components/navBar';
import { Suspense } from 'react';
import { revalidateTag } from 'next/cache';

export default async function Servers() {
  const response = await fetch('https://dcssbapi.twothreexray.com/servers', {
    next: { tags: ['servers'], revalidate: 60 },
  });
  const servers = await response.json();
  if (servers[0]) {
    revalidateTag('servers');
  }
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
