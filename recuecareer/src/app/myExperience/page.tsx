"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type ExtractOut = {
  techRequirements: string[];
  generalRequirements: string[];
  error?: string;
};

export default function RequirementsPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [tech, setTech] = useState<string[]>([]);
  const [gen, setGen] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null); setTech([]); setGen([]);

    try { new URL(url); } catch { setLoading(false); setErr("Enter a valid URL"); return; }

    try {
      const r = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: ExtractOut = await r.json();
      if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`);
      setTech(data.techRequirements);
      setGen(data.generalRequirements);
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="z-50 h-screen grid grid-cols-4 mt-10 gap-64">
      <motion.button
      className=" text-center h-4 w-fit bg-Secondary p-4 rounded-xl"
      initial={{ scale: 1}}
      whileHover={{ scale: 0.5}}
      >
      hello
      </motion.button>

      <div className="items-center justify-center z-50 p-4 backdrop-blur-xl">
      <h1>Job Requirements Extractor</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input className="text-center"type="url" required value={url} onChange={e=>setUrl(e.target.value)} placeholder="Your URL" />
        <button className="" disabled={loading}>{loading ? "Extracting…" : "Extract"}</button>
      </form>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
        <section>
          <h2>Tech</h2>
          {tech.length ? <ul>{tech.map((t,i)=><li key={i}>{t}</li>)}</ul> : <p style={{color:"#666"}}>—</p>}
        </section>
        <section>
          <h2>General</h2>
          {gen.length ? <ul>{gen.map((g,i)=><li key={i}>{g}</li>)}</ul> : <p style={{color:"#666"}}>—</p>}
        </section>
      </div>
    </div>
      
    </main>
    
  );
}

