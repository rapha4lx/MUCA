import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Rocket, Target, FileText, Tag } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

interface CampaignForm {
  title: string;
  description: string;
  target: string;
  category: string;
  walletAddresses?: { address: string; percentage: number }[];
}

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CampaignForm>({
    title: "",
    description: "",
    target: "",
    category: "",
    // default to 1 wallet receiving 95% (platform reserve 5%)
    walletAddresses: [{ address: "", percentage: 95 }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CampaignForm, value: string) => {
    // If target changes, recompute wallet percentages according to new platform fee
    if (field === 'target') {
      const targetStr = value || '';
      const parsed = Number(targetStr) || 0;
      setForm(prev => {
        const fee = getPlatformFeePct(parsed);
        const wallets = prev.walletAddresses && prev.walletAddresses.length > 0 ? [...prev.walletAddresses] : [{ address: '', percentage: 0 }];
        const alloc = distributePercent(100 - fee, wallets.length);
        const newList = wallets.map((w, i) => ({ ...w, percentage: alloc[i] }));
        return { ...prev, target: targetStr, walletAddresses: newList };
      });
      return;
    }

    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Determine platform fee percent based on target tiers
  const getPlatformFeePct = (targetValue: number) => {
    if (targetValue <= 1000 && targetValue > 0) return 1; // 1%
    if (targetValue <= 10000 && targetValue > 0) return 0.5; // 0.5%
    if (targetValue > 10000) return 0.25; // 0.25%
    // default when no target set
    return 1;
  };

  // Distribute totalPercent (e.g., 99 or 95) into `count` parts, result in array summing exactly to totalPercent (2 decimals)
  const distributePercent = (totalPercent: number, count: number) => {
    if (count <= 0) return [];
    const totalCents = Math.round(totalPercent * 100);
    const base = Math.floor(totalCents / count);
    const remainder = totalCents - base * count;
    const arr: number[] = [];
    for (let i = 0; i < count; i++) {
      const cents = base + (i < remainder ? 1 : 0);
      arr.push(Number((cents / 100).toFixed(2)));
    }
    return arr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate wallets rules:
    // - max 3 wallets
    // - total distribution must be ~95% (we reserve 5%)
    // - each wallet must be <= (95 / count)
    const wallets = form.walletAddresses || [];
    if (wallets.length > 3) {
      alert('O número máximo de carteiras é 3.');
      setIsSubmitting(false);
      return;
    }

    const targetValue = Number(form.target) || 0;
    const fee = getPlatformFeePct(targetValue);
    const available = 100 - fee;
    const sum = wallets.reduce((acc, w) => acc + Number(w.percentage || 0), 0);
    const tolerance = 0.5; // allow small rounding differences
    if (wallets.length > 0 && Math.abs(sum - available) > tolerance) {
      alert(`A soma das porcentagens das carteiras deve ser aproximadamente ${available}% (taxa da plataforma: ${fee}%). Atualmente: ${sum.toFixed(2)}%`);
      setIsSubmitting(false);
      return;
    }

    if (wallets.length > 0) {
      const maxPer = available / wallets.length;
      for (const w of wallets) {
        const perc = Number(w.percentage || 0);
        if (perc < 0) {
          alert('Porcentagens não podem ser negativas.');
          setIsSubmitting(false);
          return;
        }
        if (perc - maxPer > 1e-6) {
          alert(`Cada carteira deve receber no máximo ${maxPer.toFixed(2)}% quando há ${wallets.length} carteiras (taxa da plataforma: ${fee}%).`);
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Mock submission
    console.log("Dados da campanha:", {
      ...form,
      target: parseFloat(form.target),
      timestamp: new Date().toISOString(),
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    
    // Redirect to campaign page (mock ID)
    navigate("/campaign/new-campaign");
  };

  const updateWallet = (index: number, key: 'address' | 'percentage', value: string | number) => {
    setForm(prev => {
      const list = prev.walletAddresses ? [...prev.walletAddresses] : [];
      list[index] = { ...list[index], [key]: key === 'percentage' ? Number(value) : value } as any;
      return { ...prev, walletAddresses: list };
    });
  };

  const addWallet = () => {
    setForm(prev => {
      const list = [...(prev.walletAddresses || [])];
      if (list.length >= 3) return prev; // don't add more than 3
      list.push({ address: '', percentage: 0 });
      // distribute 95% equally
      const per = 95 / list.length;
      const newList = list.map(w => ({ ...w, percentage: Number(per.toFixed(2)) }));
      return { ...prev, walletAddresses: newList };
    });
  };

  const removeWallet = (index: number) => {
    setForm(prev => {
      const list = (prev.walletAddresses || []).filter((_, i) => i !== index);
      if (list.length === 0) return { ...prev, walletAddresses: [{ address: '', percentage: 95 }] };
      const per = 95 / list.length;
      const newList = list.map(w => ({ ...w, percentage: Number(per.toFixed(2)) }));
      return { ...prev, walletAddresses: newList };
    });
  };

  const categories = [
    "Tecnologia",
    "Educação", 
    "Arte & NFT",
    "FinTech",
    "Sustentabilidade",
    "Gaming",
    "DeFi",
    "Outros"
  ];

  // Recompute wallet percentages when target or wallet count changes
  useEffect(() => {
    const parsed = Number(form.target) || 0;
    const fee = getPlatformFeePct(parsed);
    const wallets = form.walletAddresses && form.walletAddresses.length > 0 ? [...form.walletAddresses] : [{ address: '', percentage: 0 }];
    const alloc = distributePercent(100 - fee, wallets.length);
    const newList = wallets.map((w, i) => ({ ...w, percentage: alloc[i] }));
    setForm(prev => ({ ...prev, walletAddresses: newList }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.target]);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/">
            <Button variant="ghost" className="text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-neon rounded-xl shadow-neon flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Criar Nova Campanha
              </span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Transforme sua ideia em realidade com o poder do crowdfunding blockchain
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-card border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Detalhes da Campanha
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Título da Campanha
                    </Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Ex: Desenvolvimento de DApp para Microfinanças"
                      className="bg-input/50 border-primary/20 focus:border-primary"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Categoria
                    </Label>
                    <Select value={form.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger className="bg-input/50 border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Descrição
                    </Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Descreva sua campanha, seus objetivos e como os fundos serão utilizados..."
                      className="bg-input/50 border-primary/20 focus:border-primary min-h-32 resize-none"
                      required
                    />
                  </div>

                  {/* Target */}
                  <div className="space-y-2">
                    <Label htmlFor="target" className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Meta de Arrecadação (XLM)
                    </Label>
                    <Input
                      id="target"
                      type="number"
                      value={form.target}
                      onChange={(e) => handleChange("target", e.target.value)}
                      placeholder="50000"
                      className="bg-input/50 border-primary/20 focus:border-primary"
                      min="1"
                      step="1"
                      required
                    />
                    <div className="text-sm text-muted-foreground">
                      Quantidade em Stellar Lumens (XLM) que você deseja arrecadar
                    </div>
                  </div>

                  {/* Submit Button */}
                  {/* Wallet Addresses */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">Carteiras de Recebimento</Label>
                      <div className="text-sm text-muted-foreground">
                        Máximo de 3 carteiras. A taxa da plataforma depende da meta:
                        <ul className="list-disc ml-5">
                          <li>Até 1.000 → 1%</li>
                          <li>Até 10.000 → 0,5%</li>
                          <li>Acima de 10.000 → 0,25%</li>
                        </ul>
                        A distribuição disponível (100% - taxa) será dividida igualmente entre as carteiras.
                      </div>
                    <div className="space-y-2">
                      {(form.walletAddresses || []).map((w, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            placeholder="Endereço Stellar (G... )"
                            value={w.address}
                            onChange={(e) => updateWallet(idx, 'address', e.target.value)}
                            className="flex-1 bg-input/50 border-primary/20"
                          />
                          <Input
                            type="number"
                            placeholder="%"
                            value={w.percentage}
                            readOnly
                            className="w-24 bg-input/50 border-primary/20 text-center"
                          />
                          <Button variant="ghost" onClick={() => removeWallet(idx)}>Remover</Button>
                        </div>
                      ))}
                      <div>
                        <Button variant="outline" size="sm" onClick={addWallet} disabled={(form.walletAddresses || []).length >= 3}>Adicionar Carteira</Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Taxa da plataforma: {getPlatformFeePct(Number(form.target) || 0)}% — distribuição disponível: { (100 - getPlatformFeePct(Number(form.target) || 0)).toFixed(2) }%</div>

                  <motion.div
                    className="pt-4"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="neon"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Criando Campanha...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5 mr-2" />
                          Criar Campanha
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-gradient-card border-primary/20 shadow-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-primary mb-3">💡 Dicas para uma campanha de sucesso:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Seja claro e específico sobre seus objetivos</li>
                  <li>• Inclua um cronograma realista do projeto</li>
                  <li>• Demonstre transparência nos gastos planejados</li>
                  <li>• Mantenha contato regular com seus apoiadores</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;