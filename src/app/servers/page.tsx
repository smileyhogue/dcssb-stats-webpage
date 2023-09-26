import ServerCard from '@/app/components/ui/serverCard';
import NavBar from '@/app/components/navBar';

export default async function Servers() {
    const response = await fetch("https://dcssbapi.twothreexray.com/servers");
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