async function fetchSWDDB() {
  const response = await fetch(`https://swdestinydb.com/api/public/cards/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export default fetchSWDDB;
