import { useState } from "react";
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
}

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CampaignForm>({
    title: "",
    description: "",
    target: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CampaignForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
            <Button variant="ghost" className="text-primary hover:text-primary/80">
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