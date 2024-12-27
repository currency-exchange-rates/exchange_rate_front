import {CurrencyInfoResponse} from "../types";

export const baseURL = "http://127.0.0.1:5000";

export default function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export async function request<T>(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${baseURL}${endpoint}`);
  return checkResponse<T>(res);
}

export const getInitialInfo = (currencyName: string): Promise<any> => {
  return request<CurrencyInfoResponse>(`/api/v1/exchange/exchange-rates/${currencyName}`);
}