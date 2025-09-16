import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getWalletFromLocalStorage, removeWalletFromLocalStorage } from "../../token-utils";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Criar Campanha", path: "/create" },
    { name: "Explorar", path: "/explore" },
  ];

  const wallet = getWalletFromLocalStorage();
  const shortened = wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : null;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-primary/20 bg-card/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center shadow-neon">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            CryptoFund
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-neon rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {location.pathname !== "/login" && (
            wallet ? (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono">{shortened}</span>
                <Button size="sm" variant="ghost" onClick={() => { removeWalletFromLocalStorage(); window.location.href = '/login'; }}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="wallet" size="sm">
                  Conectar Carteira
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;