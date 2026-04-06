import './App.css'
import {useEffect, useState} from "react";
import type {Cat} from "./shared/types/cat.ts";
import {fetchCats} from "./shared/api/api.ts";

function App() {
    const [cats, setCats] = useState<Cat[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCats()
            .then(setCats)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>Loading...</div>

  return (
      <main style={{ padding: '20px' }}>
          <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
              gap: '20px'
          }}>
              {cats.map(cat => (
                  <img
                      key={cat.id}
                      src={cat.url}
                      alt="cat"
                      style={{ width: '100%', height: '225px', objectFit: 'cover' }}
                  />
              ))}
          </div>
      </main>
  )
}

export default App
