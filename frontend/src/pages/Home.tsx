import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, Zap } from "lucide-react";
import Header from "@/components/Header";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/data/mockData";

const Home = () => {
  const totalRaised = mockCampaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalCampaigns = mockCampaigns.length;
  const totalBackers = mockCampaigns.reduce((sum, campaign) => sum + (campaign.donations?.length || 0), 0);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <div className="flex flex-col items-center">
                {/* Big letters row (no squares) */}
                <div className="flex items-end gap-6 md:gap-10 pb-2">
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-6xl md:text-8xl font-extrabold bg-gradient-neon bg-clip-text text-transparent leading-none"
                  >
                    M
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="text-6xl md:text-8xl font-extrabold bg-gradient-neon bg-clip-text text-transparent leading-none"
                  >
                    U
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="text-6xl md:text-8xl font-extrabold bg-gradient-neon bg-clip-text text-transparent leading-none"
                  >
                    C
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="text-6xl md:text-8xl font-extrabold bg-gradient-neon bg-clip-text text-transparent leading-none"
                  >
                    A
                  </motion.span>
                </div>
                {/* Labels under each letter */}
                <div className="flex items-center gap-10 text-sm small:text-base">
                  <div className="text-foreground text-center">Money</div>
                  <div className="text-foreground text-center">Unified</div>
                  <div className="text-foreground text-center">Crowdfunding</div>
                  <div className="text-foreground text-center">Available</div>
                </div>
              </div>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforme ideias em ações reais. 
              Apoie vaquinhas e causas sociais com segurança e transparência na Stellar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button variant="neon" size="xl" className="w-full sm:w-auto">
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Campanha
                </Button>
              </Link>
              <Button variant="glowing" size="xl" className="w-full sm:w-auto">
                <Zap className="w-5 h-5 mr-2" />
                Explorar Projetos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
                {totalRaised.toLocaleString()} XLM
              </div>
              <div className="text-muted-foreground">Total Arrecadado</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
                {totalCampaigns}
              </div>
              <div className="text-muted-foreground">Campanhas Ativas</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
                {totalBackers}+
              </div>
              <div className="text-muted-foreground">Apoiadores</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Campanhas em Destaque
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra projetos inovadores que estão moldando o futuro da tecnologia blockchain
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockCampaigns.map((campaign, index) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Link to="/create">
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
        >
          <Button variant="floating" size="floating" className="shadow-neon">
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      </Link>
    </div>
  );
};

export default Home;