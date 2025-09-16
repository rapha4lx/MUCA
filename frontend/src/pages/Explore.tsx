import { useMemo, useState } from "react";
import Header from "@/components/Header";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Explore = () => {
  const [category, setCategory] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const categories = useMemo(() => {
    const setCat = new Set<string>();
    mockCampaigns.forEach(c => setCat.add(c.category));
    return Array.from(setCat);
  }, []);

  const filtered = useMemo(() => {
    return mockCampaigns.filter(c => {
      if (category && c.category !== category) return false;
      const min = minValue ? Number(minValue) : 0;
      const max = maxValue ? Number(maxValue) : Infinity;
      return c.raised >= min && c.raised <= max;
    });
  }, [category, minValue, maxValue]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Explorar Projetos</h1>

        <div className="flex gap-4 mb-6 flex-wrap">
          <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 bg-card border rounded">
            <option value="">Todas Categorias</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <Input placeholder="Min arrecadado" value={minValue} onChange={e => setMinValue(e.target.value)} />
          <Input placeholder="Max arrecadado" value={maxValue} onChange={e => setMaxValue(e.target.value)} />

          <Button onClick={() => { setCategory(""); setMinValue(""); setMaxValue(""); }} variant="ghost">Limpar</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
