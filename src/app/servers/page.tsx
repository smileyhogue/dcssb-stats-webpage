import ServerCard from '@/app/components/serverCard';

export default async function Servers() {
    const response = await fetch("https://dcssbapi.twothreexray.com/servers", { next: { revalidate: 120 } });
    const servers = await response.json();
    return (
      <>
          <NavBar />
          <h1 className="text-2xl font-bold">Servers</h1>
            {servers.map((server: any, index: number) => (
                <ServerCard key={index} data={server}/>
            ))}
      </>
    );
}