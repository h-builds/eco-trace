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

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
  } catch (err: unknown) {
    console.error("Network failure during fetchEvents:", err);
    throw new ApiError("A network error occurred while reaching the server. Please check your connection.", 0);
  }

  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    try {
      const errorBody = await response.json();
      if (typeof errorBody === "object" && errorBody !== null && "error" in errorBody) {
        errorMessage = errorBody.error as string;
      }
    } catch (err: unknown) {
      console.error("Failed to parse backend error response:", err);
      errorMessage = "The server returned an invalid response format.";
    }
    
    console.error(`Traceable Backend Failure: [${response.status}] ${errorMessage}`);
    
    if (response.status >= 500) {
      throw new ApiError("An internal server error occurred while retrieving event history.", response.status);
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json();
}
