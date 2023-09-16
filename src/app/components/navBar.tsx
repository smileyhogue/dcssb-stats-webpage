import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const NavBar: React.FC = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eaeaea' }}>
      {/* Logo linking back to the home page */}
      <Link href="/" passHref>
        <Image src="/smokey.png" alt="Logo" height={50} width={50} />
      </Link>

      {/* Link to the Discord */}
      <Link href="https://discord.gg/9aefybCAt9" style={{ marginLeft: '1rem', textDecoration: 'none', color: '#7289da' }}>
        Join our Discord
      </Link>
    </nav>
  );
}

export default NavBar;