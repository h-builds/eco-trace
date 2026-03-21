import { EventsApiResponse } from "./types";

export const API_BASE_URL = "/api";

export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchEvents(assetId?: string): Promise<EventsApiResponse> {
  const base = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const url = new URL(`${base}${API_BASE_URL}/events`);
  if (assetId) {
    url.searchParams.append("asset_id", assetId);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = "Network response was not ok";
    try {
      const errorBody = await response.json();
      if (typeof errorBody === "object" && errorBody !== null && "error" in errorBody) {
        errorMessage = errorBody.error as string;
      }
    } catch {
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json();
}
