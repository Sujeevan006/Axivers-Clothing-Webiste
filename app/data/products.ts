export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'flagship' | 'minimalist' | 'technical';
  categoryLabel: string;
  tagline: string;
  description: string;
  images: string[];
  fabricSpec: string;
  careInstructions: string;
  sizes: string[];
}

export const productsDatabase: Product[] = [
  {
    id: 'piping-crewneck',
    name: 'Premium Piping Crewneck',
    price: 4000,
    category: 'flagship',
    categoryLabel: 'Flagship',
    tagline: 'Elevated essentials for the modern lifestyle.',
    description: 'A masterclass in modern minimalist streetwear. This deep solid black T-shirt is redefined with custom-inserted crisp white piping details inside the sleeve cuffs and along the bottom hem. Finished with clean, subtle white chest embroidery and our signature geometric back logo.',
    images: ['/images/pdp_front.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '60% Combed Ring-Spun Cotton / 40% Modal blend, heavy 190 GSM.',
    careInstructions: 'Machine wash cold inside out. Flat dry in shade. Iron low.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'white-piping-crewneck',
    name: 'White Piping Crewneck',
    price: 4000,
    category: 'flagship',
    categoryLabel: 'Flagship',
    tagline: 'Clean, light, and detailed.',
    description: 'Our flagship crewneck reimagined in crisp white cotton-modal. Features custom-inserted black piping detail on cuffs and bottom hem, and subtle black embroidered branding.',
    images: ['/images/pdp_white_piping.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '60% Combed Ring-Spun Cotton / 40% Modal blend, heavy 190 GSM.',
    careInstructions: 'Machine wash cold. Flat dry. Iron low.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'boxy-black-tee',
    name: 'Heavyweight Boxy Tee',
    price: 4200,
    category: 'minimalist',
    categoryLabel: 'Minimalist',
    tagline: 'Streetwear drape in premium heavy cotton.',
    description: 'An oversized, boxy fit tee built from high-density combed cotton. Heavyweight structure that holds its shape, detailed with a low-profile centered chest embroidery.',
    images: ['/images/pdp_boxy_black.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '100% Combed Ring-Spun Cotton, 240 GSM ultra-heavy weight.',
    careInstructions: 'Machine wash cold, air dry, do not iron print.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'polo-piping-black',
    name: 'Piping Collar Polo',
    price: 4800,
    category: 'flagship',
    categoryLabel: 'Flagship',
    tagline: 'Athletic luxury meets classic collar design.',
    description: 'A premium black polo shirt engineered for a refined athletic fit. Elevated with custom white piping detail inserted along the edge of the collar and sleeve cuffs.',
    images: ['/images/pdp_polo_black.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '60% Combed Cotton / 40% Modal knit blend, breathable and structured.',
    careInstructions: 'Machine wash cold, flat dry, iron low on reverse.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'active-tech-tee',
    name: 'Active Modal Tech Tee',
    price: 4500,
    category: 'technical',
    categoryLabel: 'Technical',
    tagline: 'Moisture-wicking, cool-touch performance.',
    description: 'Engineered for active lifestyles. Built with a high-percentage beechwood modal blend, providing natural temperature regulation, fast moisture-wicking, and a silky smooth drape.',
    images: ['/images/pdp_detail.jpg', '/images/pdp_front.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '30% Combed Cotton / 70% Micro-Modal yarn, quick-dry, 160 GSM lightweight.',
    careInstructions: 'Gentle wash cold, tumble dry low, do not iron logo.',
    sizes: ['S', 'M', 'L', 'XL'],
  }
];
