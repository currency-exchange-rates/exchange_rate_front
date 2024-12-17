export async function fetchCurrencyRates(apiUrl: string): Promise<{ [key: string]: number }> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.rates;
}
