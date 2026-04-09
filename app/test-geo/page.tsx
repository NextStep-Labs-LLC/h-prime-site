"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface GeoData {
  city: string | null;
  slug: string | null;
  cityFound: boolean;
  testUrls: string[];
  debug: Record<string, unknown>;
}

export default function TestGeoPage() {
  const [data, setData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test-geo")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Geo Detection Test</h1>

      {loading && <p className="text-gray-500">Detecting location...</p>}

      {data && (
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Detection Result</h2>
            <dl className="space-y-2">
              <div className="flex gap-2">
                <dt className="font-medium">Detected City:</dt>
                <dd>{data.city || "Not detected"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Mapped Slug:</dt>
                <dd>{data.slug || "No match"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">City in Database:</dt>
                <dd>{data.cityFound ? "Yes" : "No"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Test URLs (with UTM params)</h2>
            <ul className="space-y-2">
              {data.testUrls.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Debug Info</h2>
            <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
              {JSON.stringify(data.debug, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="mt-8 inline-block text-blue-600 underline hover:text-blue-800"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
