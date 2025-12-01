import { useState } from "react";

function RecommendationForm({ products, setRecommendedIds }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function getRecommendations() {
    if (!prompt.trim()) return;

    setLoading(true);

    const res = await fetch("/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, products })
    });

    const data = await res.json();
    setRecommendedIds(data.recommended || []);
    setLoading(false);
  }

  return (
    <div>
      <textarea
        placeholder="Write your preference... e.g., 'I want a cheap men's shirt'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="3"
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={getRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>
    </div>
  );
}

export default RecommendationForm;
