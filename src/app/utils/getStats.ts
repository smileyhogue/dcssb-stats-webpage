export async function GetStats(
  nick: string,
  date: string
): Promise<object | undefined> {
  try {
    const formData = new FormData();
    formData.append('nick', nick);
    formData.append('date', date);

    const response = await fetch(`${process.env.API_DOMAIN}/stats`, {
      method: 'POST',
      body: formData,
      next: { revalidate: 1 },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}
