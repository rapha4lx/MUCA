import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Wallet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { getWalletFromLocalStorage } from "../..//token-utils";
import { getCampaignById } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = id ? getCampaignById(id) : null;

  if (!campaign) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Campanha não encontrada</h1>
          <Link to="/">
            <Button variant="neon">Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = (campaign.raised / campaign.target) * 100;

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
              Voltar às Campanhas
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-card border-primary/20 shadow-card">
                {campaign.image && (
                  <div className="h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded-full">
                      {campaign.category}
                    </span>
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(campaign.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <CardTitle className="text-2xl md:text-3xl font-bold">
                    {campaign.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>Por {campaign.creator}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {campaign.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Donations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-card border-primary/20 shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Doações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {campaign.donations && campaign.donations.length > 0 ? (
                    <div className="space-y-4">
                      {campaign.donations.map((donation, index) => (
                        <motion.div
                          key={donation.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{donation.donor}</div>
                            <div className="text-sm text-muted-foreground">{new Date(donation.timestamp).toLocaleDateString('pt-BR')}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhuma doação ainda. Seja o primeiro!
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-card border-primary/20 shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Progresso da Campanha</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {progress.toFixed(1)}% da meta
                      </span>
                      <span className="text-primary font-medium">
                        {campaign.donations?.length || 0} apoiadores
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                        {campaign.raised.toLocaleString()} XLM
                      </div>
                      <div className="text-sm text-muted-foreground">
                        arrecadados de {campaign.target.toLocaleString()} XLM
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-primary/20" />

                  {/* QR Code */}
                  <div className="text-center space-y-4">
                    <h4 className="font-medium">Endereços Stellar</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {campaign.walletAddresses.map((w, idx) => (
                        <div key={w.address} className="p-4 bg-white rounded-lg flex flex-col items-center">
                          <QRCodeSVG
                            value={w.address}
                            size={120}
                            bgColor="#ffffff"
                            fgColor="#000000"
                          />
                          <div className="mt-2 text-xs text-muted-foreground break-all font-mono bg-muted/50 p-2 rounded w-full text-center">
                            {w.address}
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">Destinação: {w.percentage}%</div>
                          <div className="mt-2 w-full">
                            <Button variant="outline" size="sm" className="w-full" onClick={() => navigator.clipboard.writeText(w.address)}>
                              Copiar Endereço
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-primary/20" />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      variant="neon" 
                      size="lg" 
                      className="w-full"
                      onClick={() => console.log("Conectar carteira para doação")}
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      {(() => {
                        const w = getWalletFromLocalStorage();
                        if (!w) return 'Conectar Carteira';
                        return `${w.slice(0,6)}...${w.slice(-4)}`;
                      })()}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={() => {
                        const primary = campaign.walletAddresses && campaign.walletAddresses[0] ? campaign.walletAddresses[0].address : undefined;
                        if (primary) navigator.clipboard.writeText(primary);
                      }}
                    >
                      Copiar Endereço Principal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;