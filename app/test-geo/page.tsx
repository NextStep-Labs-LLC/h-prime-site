'use client';

import { useEffect, useState } from 'react';

interface GeoDebugData {
  city: string | null;
  region: string | null;
  country: string | null;
  citySlug: string | null;
  cityFound: boolean;
  timestamp: string;
  requestUrl: string;
  testUrls: {
    basic: string;
    withBrand: string;
    noBrand: string;
  };
  debug?: {
    searchAttempts: string[];
    totalCitiesInDatabase: number;
    testCitiesCount: number;
    testCities: Array<{ name: string; slug: string }>;
    telAvivMatches: Array<{ name: string; slug: string }>;
    cityNameInMapping: boolean;
    mappingKeys: string[];
  };
}

export default function TestGeoPage() {
  const [geoData, setGeoData] = useState<GeoDebugData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch geolocation data from API
    fetch('/api/test-geo')
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting location...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-bold text-lg mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Geolocation Debug Tool
          </h1>
          <p className="text-gray-600">
            Testing IP-based city detection for Google Ads redirect
          </p>
          <div className="mt-4 text-sm text-gray-500">
            ⚠️ This page is for testing only and is not indexed by search engines
          </div>
        </div>

        {/* Geolocation Data */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📍 Your Detected Location
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-600 font-medium">City:</span>
              <span className={`text-lg font-bold ${geoData?.city ? 'text-orange-600' : 'text-red-600'}`}>
                {geoData?.city || 'Not detected'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-600 font-medium">State/Region:</span>
              <span className="text-lg font-bold text-gray-900">
                {geoData?.region || 'Unknown'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-600 font-medium">Country:</span>
              <span className="text-lg font-bold text-gray-900">
                {geoData?.country || 'Unknown'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-600 font-medium">City Slug (URL):</span>
              <span className={`text-lg font-mono ${geoData?.citySlug ? 'text-blue-600' : 'text-gray-400'}`}>
                {geoData?.citySlug || 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600 font-medium">City in Database:</span>
              <span className={`text-lg font-bold ${geoData?.cityFound ? 'text-orange-600' : 'text-orange-600'}`}>
                {geoData?.cityFound ? '✅ Yes' : '⚠️ No'}
              </span>
            </div>
          </div>
        </div>

        {/* What Happens */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🎯 Redirect Behavior
          </h2>
          
          {geoData?.cityFound ? (
            <div className="bg-orange-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-orange-600 text-2xl mr-3">✅</div>
                <div>
                  <h3 className="font-bold text-green-900 mb-2">City-Specific Landing Page</h3>
                  <p className="text-green-800 mb-3">
                    When you click on a Google Ad, you'll be redirected to a landing page 
                    personalized for <strong>{geoData.city}</strong>.
                  </p>
                  <p className="text-sm text-orange-700 font-mono bg-orange-100 p-2 rounded">
                    /cities/{geoData.citySlug}/services/[appliance]-repair
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-orange-600 text-2xl mr-3">⚠️</div>
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">General Landing Page (Fallback)</h3>
                  <p className="text-orange-800 mb-3">
                    Your city was not detected or is not in our service area. 
                    You'll see a general Denver Metro area landing page instead.
                  </p>
                  <p className="text-sm text-orange-700 font-mono bg-orange-100 p-2 rounded">
                    /services/[appliance]-repair
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Test URLs */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🔗 Test Redirect URLs
          </h2>
          <p className="text-gray-600 mb-4">
            Click these links to test the redirect functionality (simulates Google Ads clicks):
          </p>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Refrigerator Repair (no brand):</div>
              <a 
                href={geoData?.testUrls.basic} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-mono text-sm break-all underline"
              >
                {geoData?.testUrls.basic}
              </a>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Dryer Repair (no brand):</div>
              <a 
                href={geoData?.testUrls.noBrand} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-mono text-sm break-all underline"
              >
                {geoData?.testUrls.noBrand}
              </a>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Refrigerator Repair (Samsung brand):</div>
              <a 
                href={geoData?.testUrls.withBrand} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-mono text-sm break-all underline"
              >
                {geoData?.testUrls.withBrand}
              </a>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-xl font-bold mb-4">🔧 Technical Details</h2>
          <div className="space-y-2 text-sm font-mono">
            <div><span className="text-gray-400">Timestamp:</span> {geoData?.timestamp}</div>
            <div><span className="text-gray-400">Request URL:</span> {geoData?.requestUrl}</div>
            <div><span className="text-gray-400">Edge Runtime:</span> Vercel Edge Network</div>
            <div><span className="text-gray-400">Geolocation API:</span> @vercel/edge</div>
            <div><span className="text-gray-400">Total Cities:</span> {geoData?.debug?.totalCitiesInDatabase || 362}</div>
          </div>
        </div>

        {/* Debug Information */}
        {geoData?.debug && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-lg p-8 mt-6">
            <h2 className="text-xl font-bold text-yellow-900 mb-4">
              🐛 Debug Information
            </h2>
            
            <div className="space-y-4">
              {/* Search Attempts */}
              <div className="bg-white rounded p-4">
                <h3 className="font-bold text-gray-900 mb-2">Search Attempts:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {geoData.debug.searchAttempts.map((attempt, i) => (
                    <li key={i} className="text-gray-700 font-mono">{attempt}</li>
                  ))}
                </ul>
              </div>

              {/* Test Cities */}
              <div className="bg-white rounded p-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  Test Cities in Database ({geoData.debug.testCitiesCount}):
                </h3>
                {geoData.debug.testCities.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {geoData.debug.testCities.map((city, i) => (
                      <li key={i} className="text-gray-700">
                        <span className="font-bold">{city.name}</span> → <span className="font-mono text-blue-600">{city.slug}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-red-600 font-bold">⚠️ NO TEST CITIES FOUND!</p>
                )}
              </div>

              {/* Tel Aviv Matches */}
              <div className="bg-white rounded p-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  Tel Aviv Matches in Database:
                </h3>
                {geoData.debug.telAvivMatches.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {geoData.debug.telAvivMatches.map((city, i) => (
                      <li key={i} className="text-orange-700 font-bold">
                        <span>{city.name}</span> → <span className="font-mono">{city.slug}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-red-600 font-bold">⚠️ NO TEL AVIV MATCHES FOUND!</p>
                )}
              </div>

              {/* Mapping Keys */}
              <div className="bg-white rounded p-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  "Tel" or "Aviv" Keys in Mapping:
                </h3>
                {geoData.debug.mappingKeys.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {geoData.debug.mappingKeys.map((key, i) => (
                      <li key={i} className="text-blue-700 font-mono">{key}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-red-600 font-bold">⚠️ NO KEYS WITH "TEL" OR "AVIV"!</p>
                )}
              </div>

              {/* City in Mapping */}
              <div className="bg-white rounded p-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  City "{geoData.city}" in mapping:
                </h3>
                <p className={`font-bold text-lg ${geoData.debug.cityNameInMapping ? 'text-orange-600' : 'text-red-600'}`}>
                  {geoData.debug.cityNameInMapping ? '✅ YES' : '❌ NO'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
