import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gradient-card border-primary/20 shadow-neon text-center">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-neon rounded-xl shadow-neon flex items-center justify-center">
              <span className="text-3xl text-white">404</span>
            </div>
            <CardTitle className="text-2xl bg-gradient-neon bg-clip-text text-transparent">
              Página Não Encontrada
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Ops! A página que você está procurando não existe no universo blockchain.
            </p>
            
            <Link to="/">
              <Button variant="neon" size="lg" className="w-full">
                <Home className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
