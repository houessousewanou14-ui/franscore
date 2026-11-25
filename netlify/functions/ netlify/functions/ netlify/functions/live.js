exports.handler = async function () {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Clé API manquante" })
    };
  }

  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": apiKey
        }
      }
    );

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur de connexion à l'API" })
    };
  }
};
