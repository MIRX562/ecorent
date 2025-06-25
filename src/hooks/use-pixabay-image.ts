"use client";
import { useEffect, useState } from "react";

const PIXABAY_API_KEY = "50978905-d1ce30881d322635459928df1";

export function usePixabayImage(query: string, fallbackUrl: string) {
  const [url, setUrl] = useState(fallbackUrl);

  useEffect(() => {
    let ignore = false;
    async function fetchImage() {
      if (!query) return;
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
            query
          )}&image_type=photo&per_page=3`
        );
        const data = await res.json();
        if (!ignore && data.hits && data.hits.length > 0) {
          setUrl(data.hits[0].webformatURL);
        }
      } catch {
        // ignore error, fallback to original
      }
    }
    fetchImage();
    return () => {
      ignore = true;
    };
  }, [query, fallbackUrl]);

  return url;
}
