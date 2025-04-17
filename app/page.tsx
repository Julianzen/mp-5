'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [shortAlias, setShortAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (shortAlias) {
      setShortUrl(`${window.location.origin}/${shortAlias}`);
    }
  }, [shortAlias]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setShortAlias('');
    setShortUrl('');

    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ alias, url }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setShortAlias(data.alias);
    }
  }

  return (
      <main className="bg-blue-400 p-8">
        <header>
          <h2 className="text-4xl font-semibold p-4">The URL Short-inator</h2>
        </header>
        <div className="flex flex-col justify-center items-center bg-blue-200 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="border p-2 w-full"
          />
          <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="alias"
              className="border p-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            Shorten
          </button>
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}

        {shortUrl && (
            <div className="mt-4">
              Shortened URL:{' '}
              <a href={shortUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </div>
        )}
          </div>
      </main>
  );
}