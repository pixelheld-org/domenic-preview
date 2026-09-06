const FALLBACK_RATING = 4.9;
const FALLBACK_COUNT = 47;

const FALLBACK_AVATARS: AvatarData[] = [
  { name: "Maria S.", photoUri: null },
  { name: "Thomas K.", photoUri: null },
  { name: "Sandra W.", photoUri: null },
  { name: "Michael B.", photoUri: null },
  { name: "Anna L.", photoUri: null },
];

export type AvatarData = { name: string; photoUri: string | null };

export type ReviewSummary = {
  rating: number;
  count: number;
  avatars: AvatarData[];
};

export async function fetchReviewSummary(): Promise<ReviewSummary> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      rating: FALLBACK_RATING,
      count: FALLBACK_COUNT,
      avatars: FALLBACK_AVATARS,
    };
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=de`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) {
      return {
        rating: FALLBACK_RATING,
        count: FALLBACK_COUNT,
        avatars: FALLBACK_AVATARS,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json();

    const avatars: AvatarData[] = (data.reviews ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((r: any) => r.rating === 5)
      .slice(0, 5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => ({
        name: r.authorAttribution?.displayName ?? "Anonym",
        photoUri: r.authorAttribution?.photoUri ?? null,
      }));

    return {
      rating: data.rating ?? FALLBACK_RATING,
      count: data.userRatingCount ?? FALLBACK_COUNT,
      avatars: avatars.length > 0 ? avatars : FALLBACK_AVATARS,
    };
  } catch {
    return {
      rating: FALLBACK_RATING,
      count: FALLBACK_COUNT,
      avatars: FALLBACK_AVATARS,
    };
  }
}
