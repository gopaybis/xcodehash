'use client'
import React, { useState } from 'react'

export default function Home() {
  const [hash, setHash] = useState('')
  const [mode, setMode] = useState('0')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    setError('')

    try {
      const response = await fetch('https://crack.hackerbootcamp.asia:2053/cgi-bin/xcodecrack_api.cgi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash, mode }),
      })

      const data = await response.json()

      if (data.success) {
        const parts = data.result.split(':')
        setResult(parts.length > 1 ? parts[1] : data.result)
      } else {
        setError(data.error || 'Gagal memproses hash.')
      }
    } catch (err) {
      setError('Gagal terhubung ke API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">🔓 Crack X-code Hash</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Hash</label>
            <input
              type="text"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
              placeholder="Masukkan hash"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
            >
              <option value="0">MD5</option>
              <option value="1">SHA1</option>
              <option value="2">SHA256</option>
              <option value="3">SHA384</option>
              <option value="4">SHA512</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-xl"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Crack Sekarang'}
          </button>
        </form>

        {result && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-xl text-green-800">
            ✅ Hasil: <strong>{result}</strong>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-800">
            ❌ Error: {error}
          </div>
        )}
      </div>
    </main>
  )
}
