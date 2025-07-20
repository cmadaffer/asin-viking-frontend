
import React, { useState } from "react";

function App() {
  const [asins, setAsins] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkGating = async () => {
    setLoading(true);
    const response = await fetch("https://asin-viking-backend.onrender.com/check-asins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        asins: asins.split(/\s|,/).filter(Boolean),
        marketplace_id: "ATVPDKIKX0DER"
      })
    });
    const data = await response.json();
    setResults(data.results);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ASIN Viking Gating Checker</h1>
      <textarea
        rows={4}
        cols={50}
        value={asins}
        onChange={(e) => setAsins(e.target.value)}
        placeholder="Enter ASINs separated by spaces or commas"
      />
      <br />
      <button onClick={checkGating} disabled={loading}>
        {loading ? "Checking..." : "Check Gating Status"}
      </button>
      <ul>
        {results.map((r) => (
          <li key={r.asin}>{r.asin}: {r.status} ({r.restriction_type || "None"})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
