import { getStore } from "@netlify/blobs";

const KEY = "messages";
const MAX = 1000;

export default async (req) => {
  // strong consistency is VERPLICHT — met de standaard (eventual) consistency
  // krijg je verouderde data terug en verdwijnen berichten stil als mensen
  // snel achter elkaar posten. Niet verwijderen.
  const store = getStore({ name: "quantexa-chat", consistency: "strong" });

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch {}
    const text = (body.text || "").toString().trim().slice(0, 280);
    if (!text) return Response.json({ error: "empty" }, { status: 400 });

    const list = (await store.get(KEY, { type: "json" })) || [];
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      text,
      created_at: Date.now()
    };
    list.push(item);
    await store.setJSON(KEY, list.slice(-MAX));
    return Response.json({ ok: true, message: item });
  }

  const list = (await store.get(KEY, { type: "json" })) || [];
  return new Response(JSON.stringify(list), {
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/messages" };
