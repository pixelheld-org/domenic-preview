import { NextResponse } from "next/server";

export const revalidate = 86400; // revalidate once per day

export interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  relativePublishTimeDescription: string;
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
}

export interface ReviewsResponse {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Google Places API not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("Google Places API error:", res.status, body);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: res.status }
      );
    }

    const data = await res.json();

    const response: ReviewsResponse = {
      rating: data.rating ?? 0,
      userRatingCount: data.userRatingCount ?? 0,
      reviews: data.reviews ?? [],
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("Google Places fetch failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
