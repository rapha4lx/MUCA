export interface Campaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  creator: string;
  walletAddress: string;
  image?: string;
  category: string;
  createdAt: string;
  donations?: Donation[];
}

export interface Donation {
  id: string;
  donor: string;
  amount: number;
  hash: string;
  timestamp: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Desenvolvimento de DApp para Microfinanças",
    description: "Criando uma plataforma descentralizada para facilitar microcrédito em comunidades carentes usando blockchain Stellar.",
    target: 50000,
    raised: 32500,
    creator: "DevTeam Stellar",
    walletAddress: "GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    category: "Tecnologia",
    createdAt: "2024-01-15",
    donations: [
      {
        id: "d1",
        donor: "Anonymous",
        amount: 1000,
        hash: "abc123...",
        timestamp: "2024-01-20 14:30"
      },
      {
        id: "d2", 
        donor: "CryptoSupporter",
        amount: 5000,
        hash: "def456...",
        timestamp: "2024-01-19 09:15"
      },
      {
        id: "d3",
        donor: "BlockchainFan",
        amount: 2500,
        hash: "ghi789...",
        timestamp: "2024-01-18 16:45"
      }
    ]
  },
  {
    id: "2",
    title: "Educação Blockchain para Jovens",
    description: "Programa educacional para ensinar blockchain e criptomoedas para jovens em escolas públicas.",
    target: 25000,
    raised: 18750,
    creator: "EduCrypto",
    walletAddress: "GCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "Educação",
    createdAt: "2024-01-10",
    donations: [
      {
        id: "d4",
        donor: "EduLover",
        amount: 3000,
        hash: "jkl012...",
        timestamp: "2024-01-21 11:20"
      }
    ]
  },
  {
    id: "3",
    title: "Marketplace NFT Sustentável",
    description: "Criação de um marketplace de NFTs focado em arte digital sustentável e com baixo consumo energético na rede Stellar.",
    target: 75000,
    raised: 45000,
    creator: "GreenNFT",
    walletAddress: "GDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
    category: "Arte & NFT",
    createdAt: "2024-01-05",
    donations: [
      {
        id: "d5",
        donor: "ArtCollector",
        amount: 10000,
        hash: "mno345...",
        timestamp: "2024-01-22 08:30"
      },
      {
        id: "d6",
        donor: "NFTEnthusiast",
        amount: 7500,
        hash: "pqr678...",
        timestamp: "2024-01-21 19:45"
      }
    ]
  },
  {
    id: "4",
    title: "Sistema de Pagamentos P2P",
    description: "Desenvolvendo um sistema de pagamentos peer-to-peer usando a rede Stellar para facilitar transações internacionais.",
    target: 100000,
    raised: 67500,
    creator: "PaymentLabs",
    walletAddress: "GEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    category: "FinTech",
    createdAt: "2023-12-28",
    donations: [
      {
        id: "d7",
        donor: "FinTechInvestor",
        amount: 15000,
        hash: "stu901...",
        timestamp: "2024-01-23 13:15"
      }
    ]
  }
];

export const getCampaignById = (id: string): Campaign | undefined => {
  return mockCampaigns.find(campaign => campaign.id === id);
};