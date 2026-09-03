// Intégration Gemini API - case recherche IA
const GEMINI_API_KEY = 'VOTRE_CLE_API_GEMINI'; // ← Obtenez-la gratuitement sur https://aistudio.google.com/app/apikey

async function geminiSearch(query) {
    const prompt = `Tu es un expert en investigation incendie (métaux, fils électriques, batteries, véhicules).
CONTEXTE TECHNIQUE :
${buildContextFromDatabase()}

QUESTION : ${query}
Réponds en français, de façon précise et technique, en citant les températures et aspects visuels pertinents.`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
    );
    if (!response.ok) throw new Error(`API ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function buildContextFromDatabase() {
    let ctx = 'MÉTAUX : ' + FIRE_DATABASE.metals.map(m => `${m.name} ${m.meltingPointC}°C`).join(', ') + '.\n';
    ctx += 'CAS : ' + FIRE_DATABASE.fireCauses.map(c => `${c.title} (${c.temperature})`).join(' ; ') + '.\n';
    ctx += 'FILS : ' + Object.values(FIRE_DATABASE.wireAnalysis).map(w => `${w.title} : ${w.identification}`).join(' ; ');
    return ctx;
}
