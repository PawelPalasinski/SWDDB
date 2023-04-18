// async function fetchSWDDB() {
//   const response = await fetch(`https://swdestinydb.com/api/public/cards/`);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch data: ${response.status}`);
//   }
//   const data = await response.json();
//   return data;
// }

// export default fetchSWDDB;

import axios from "axios";

const fetchSWDDB = async () => {
  try {
    const response = await axios.get(
      `https://swdestinydb.com/api/public/cards/`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(`Error fetching data:`, error.message);
    return undefined;
  }
};

export default fetchSWDDB;
