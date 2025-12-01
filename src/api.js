export async function getAIRecommendations(prompt, products) {
  const res = await fetch("http://localhost:5000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, products })
  });

  return await res.json();
}
