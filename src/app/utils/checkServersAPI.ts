'use server';
export default async function CheckServersEndpoint(): Promise<boolean> {
  const response = await fetch('https://dcssbapi.twothreexray.com/servers', {
    next: { revalidate: 120 },
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
