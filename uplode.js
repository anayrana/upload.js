import fetch from "node-fetch";

const SHEET_ID = process.env.SHEET_ID;  // Your Google Sheet ID
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/Sheet1`;

const MEILI_URL = process.env.MEILI_URL;  // Railway MeiliSearch URL
const MEILI_KEY = process.env.MEILI_KEY;  // Master Key
const INDEX_NAME = process.env.INDEX_NAME;  // Example: manhwa

async function uploadData() {
  try {
    // Fetch Google Sheet data as JSON
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    console.log(`Fetched ${data.length} rows from Google Sheet`);

    // Upload data to MeiliSearch
    const upload = await fetch(`${MEILI_URL}/indexes/${INDEX_NAME}/documents`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MEILI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await upload.json();
    console.log("Upload result:", result);

  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

uploadData();
