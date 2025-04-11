const quoteBox = document.getElementById("quote");
const button = document.getElementById("inspire-btn");
const loader = document.getElementById("loader");

// Replace with your OpenRouter API key (from https://openrouter.ai/)
const API_KEY = "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";

button.addEventListener("click", async () => {
  quoteBox.textContent = "";
  loader.classList.remove("hidden");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "You are an AI that generates short, original, deeply inspirational quotes in under 25 words."
          },
          {
            role: "user",
            content: "Give me one unique motivational quote."
          }
        ]
      })
    });

    const data = await response.json();
    const quote = data.choices[0].message.content.trim();
    quoteBox.textContent = quote;
  } catch (err) {
    quoteBox.textContent = "⚠️ Failed to get quote. Please try again.";
    console.error(err);
  }

  loader.classList.add("hidden");
});
