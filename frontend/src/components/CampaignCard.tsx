import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  creator: string;
  image?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  index: number;
}

const CampaignCard = ({ campaign, index }: CampaignCardProps) => {
  const progress = (campaign.raised / campaign.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-card border-primary/20 shadow-card hover:shadow-neon transition-all duration-300 overflow-hidden">
        {campaign.image && (
          <div className="h-48 overflow-hidden">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
            {campaign.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {campaign.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Arrecadado</span>
              <span className="text-primary font-medium">
                {campaign.raised.toLocaleString()} XLM
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-muted" 
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {progress.toFixed(1)}% da meta
              </span>
              <span className="text-muted-foreground">
                Meta: {campaign.target.toLocaleString()} XLM
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link to={`/campaign/${campaign.id}`}>
              <Button variant="neon" className="w-full">
                Ver Campanha
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CampaignCard;