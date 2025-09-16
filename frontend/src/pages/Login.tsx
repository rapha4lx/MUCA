import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Wallet, Mail, Zap, Shield, Globe } from "lucide-react";
import useAuth from "../hooks/use-auth";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, loginWithEmail, loginWithFreighter } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleWalletConnect = async () => {

    const result = await loginWithFreighter();
    if (result.success) {
      toast({ title: "Login efetuado", description: "Autenticado via Freighter" });
      navigate("/");
    } else {
      toast({ title: "Falha no login", description: result.message || "Erro ao autenticar via Freighter" });
    }
  };

  const handleEmailLogin = async () => {
    const emailEl = document.getElementById("email") as HTMLInputElement | null;
    const passEl = document.getElementById("password") as HTMLInputElement | null;
    const email = emailEl?.value || "";
    const password = passEl?.value || "";
    const result = await loginWithEmail(email, password);
    if (result.success) {
      toast({ title: "Login efetuado", description: "Autenticado com email" });
      navigate("/");
    } else {
      toast({ title: "Falha no login", description: result.message || "Erro ao autenticar com email" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-animated opacity-20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-neon">
            <CardHeader className="text-center space-y-4">
              {/* Logo */}
              <motion.div
                className="mx-auto w-16 h-16 bg-gradient-neon rounded-xl shadow-neon flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                CryptoFund
              </CardTitle>
              
              <p className="text-muted-foreground">
                Entre na nova era do crowdfunding descentralizado
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Wallet Connect Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleWalletConnect}
                  variant="wallet"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Conectar com Carteira Stellar
                </Button>
              </motion.div>

              <div className="relative">
                <Separator className="bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-4 text-sm text-muted-foreground">
                    ou
                  </span>
                </div>
              </div>

              {/* Email Login Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-input/50 border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-input/50 border-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <Button
                  onClick={handleEmailLogin}
                  variant="glowing"
                  size="lg"
                  className="w-full"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Entrar com Email
                </Button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-4 space-y-3"
              >
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Segurança blockchain garantida</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Transações globais instantâneas</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Taxas ultra baixas na rede Stellar</span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;