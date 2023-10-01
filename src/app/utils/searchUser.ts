'use server';

async function searchUser(nick: string): Promise<object | undefined> {
  try {
    const formData = new FormData();
    formData.append('nick', nick);

    const response = await fetch(`https://dcssbapi.twothreexray.com/getuser`, {
      method: 'POST',
      body: formData,
      next: { revalidate: 1 },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export { searchUser };
