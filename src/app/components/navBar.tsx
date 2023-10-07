// TODO: persistent state for servers button
'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/app/components/ui/navigation-menu';
import CheckServersEndpoint from '@/app/utils/checkServersAPI';

const NavBar: React.FC = () => {
  const { setTheme } = useTheme();
  // create useEffect to check if endpoint is live
  const [endpointIsLive, setEndpointIsLive] = React.useState(false);
  React.useEffect(() => {
    CheckServersEndpoint().then((res) => setEndpointIsLive(res));
  }, []);

  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between">
      <NavigationMenu className="p-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" passHref>
              <Image src="/smokey.png" alt="Logo" height={50} width={50} />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button className="px-3">
              <Link
                href="https://discord.gg/9aefybCAt9"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord
              </Link>
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Button className="px-3">
              <Link
                href="https://tacview.twothreexray.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tacview
              </Link>
            </Button>
          </NavigationMenuItem>

          {/* Show Servers if API is up */}
          {endpointIsLive && (
            <NavigationMenuItem>
              <Button className="px-3">
                <Link href="/servers">Servers</Link>
              </Button>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun /> &nbsp; Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon /> &nbsp; Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Monitor /> &nbsp; System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
