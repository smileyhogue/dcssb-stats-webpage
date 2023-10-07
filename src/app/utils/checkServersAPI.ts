'use server';
import { revalidateTag } from 'next/cache';

export default async function CheckServersEndpoint(): Promise<boolean> {
  const response = await fetch('https://dcssbapi.twothreexray.com/servers', {
    next: { tags: ['serverEndpoint'], revalidate: 120 },
  });
  if (response.ok) {
    revalidateTag('serverEndpoint');
    return true;
  } else {
    revalidateTag('serverEndpoint');
    return false;
  }
}
