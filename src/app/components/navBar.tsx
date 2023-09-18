import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const NavBar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 nav" style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eaeaea' }}>
      <Link href="/" passHref>
        <Image src="/smokey.png" alt="Logo" height={50} width={50} />
      </Link>

      <Link href="https://discord.gg/9aefybCAt9" style={{ marginLeft: '1rem', textDecoration: 'none', color: '#7289da' }}>
        Join our Discord
      </Link>
    </nav>
  );
}

export default NavBar;