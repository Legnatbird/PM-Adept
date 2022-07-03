import axios from "axios";

export default async function getHistorical(date) {
  const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=7ed766c303f4457e8b0aa567384201f9`;
  const data = await axios(url);
  return data.data.rates;
}