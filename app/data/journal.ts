export interface JournalArticle {
  slug: string;
  title: string;
  category: 'Fabric & Technology' | 'Style Guides' | 'Behind the Brand' | 'Product Stories' | 'Collection Announcements';
  readTime: string;
  publishedAt: string;
  excerpt: string;
  coverImage: string;
  content: {
    lead: string;
    paragraphs: string[];
    quote?: string;
  };
  relatedProductSlug?: string;
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'the-science-of-60-40-cotton-modal',
    title: 'The Science of 60/40 Cotton-Modal: Why It Outperforms 100% Cotton',
    category: 'Fabric & Technology',
    readTime: '4 min read',
    publishedAt: 'October 2026',
    excerpt: 'Traditional 100% cotton shrinks and stiffens. Synthetic polyester traps heat. Here is why blending combed cotton with beechwood modal creates the ultimate luxury everyday textile.',
    coverImage: '/images/fabric-tech-bg.png',
    content: {
      lead: 'In the search for the quintessential everyday T-shirt, most brands defaults to either 100% conventional cotton or synthetic athletic polyester. Both come with significant trade-offs.',
      paragraphs: [
        'Pure 100% cotton, while naturally breathable, suffers from fiber friction, pilling, shrinkage, and progressive stiffening over repeated laundry cycles. On the other hand, fully synthetic poly blends often build static, retain body odors, and feel artificial against the skin.',
        'At Axivers, our textile engineers developed a custom 60/40 ratio: 60% combed ring-spun cotton and 40% regenerated beechwood modal fibers. Modal is an ultra-fine cellulosic bio-fiber spun from sustainably managed European beechwood pulp.',
        'Because modal fibers have an exceptionally smooth circular cross-section, they glide over each other without surface friction. This grants the fabric its signature silky drape that resists wrinkling, maintains deep color saturation, and never loses its softness after washing.',
        'Combined with combed cotton for structural breathability, the resulting 190 GSM knit offers the best of both worlds: natural comfort with engineered athletic performance.'
      ],
      quote: '“We designed 60/40 cotton-modal not as an experiment, but as an enduring solution to the flaws of conventional everyday tees.”',
    },
    relatedProductSlug: 'piping-crewneck',
  },
  {
    slug: 'how-to-style-minimalist-athletic-luxury',
    title: 'Modern Silhouette Guide: How to Style Athletic Luxury Essentials',
    category: 'Style Guides',
    readTime: '3 min read',
    publishedAt: 'October 2026',
    excerpt: 'From tailoring to drape, mastering monochrome athletic luxury requires understanding proportions, sleeve cuts, and fabric weights.',
    coverImage: '/images/cat-men-bg.png',
    content: {
      lead: 'Athletic luxury is not gym wear. It is the art of applying high-performance fabric principles to elevated, clean everyday silhouettes.',
      paragraphs: [
        'When dressing in monochrome palettes like Onyx Black, Carbon Slate, or Optic White, visual interest comes from texture and cut rather than loud logos.',
        'Pair our Flagship Contrast Piping Crewneck with relaxed tailored trousers or clean denim. The subtle white piping along the sleeve cuffs provides an intentional flash of contrast that anchors your footwear and accessories.',
        'For casual streetwear days, lean into the 240 GSM Minimalist Heavyweight Boxy Tee. Its dropped shoulders and structured chest create a strong architectural frame that does not cling to the midsection.'
      ],
      quote: '“True style whispers. When your fabric drape is immaculate, you don’t need overt branding to make an impression.”',
    },
    relatedProductSlug: 'boxy-black-tee',
  },
  {
    slug: 'made-in-sri-lanka-the-global-garment-hub',
    title: 'Behind the Brand: Why Colombo is the Hidden Epicenter of Modern Fashion',
    category: 'Behind the Brand',
    readTime: '5 min read',
    publishedAt: 'October 2026',
    excerpt: 'Sri Lanka has long engineered technical garments for the world’s most prestigious athletic labels. Axivers brings that caliber directly home.',
    coverImage: '/images/HeroBg.png',
    content: {
      lead: 'For over four decades, Sri Lanka has been quietly revered across international fashion capitals as the gold standard for high-end apparel engineering.',
      paragraphs: [
        'Global titans in athletic wear and luxury lingerie choose Sri Lankan facilities because of our country’s unparalleled precision, ethical manufacturing standards, and cutting-edge knitting capabilities.',
        'Axivers Clothing (Pvt) Ltd was created to bring that world-class capability directly to the forefront under a home-grown luxury label. By sourcing, knitting, cutting, and stitching every single garment in Colombo, we maintain obsessive control over every millimeter of piping and seam tension.',
        'Our artisans take pride in creating garments that can sit in the most prestigious boutiques of London, Tokyo, or New York, while remaining rooted in the craft heritage of Sri Lanka.'
      ],
      quote: '“Our ambition is to prove that Sri Lankan craftsmanship can set the benchmark for athletic luxury worldwide.”',
    },
    relatedProductSlug: 'white-piping-crewneck',
  },
  {
    slug: 'introducing-flagship-contrast-piping',
    title: 'Product Story: The Anatomy of Our Signature Contrast Piping',
    category: 'Product Stories',
    readTime: '3 min read',
    publishedAt: 'September 2026',
    excerpt: 'A deep dive into the engineering challenge of inserting custom piping into stretch-knit hems without puckering or stiffness.',
    coverImage: '/images/pdp_detail.jpg',
    content: {
      lead: 'Inserting rigid woven piping into a fluid 60/40 stretch knit is notoriously difficult in garment manufacturing. Here is how we solved it.',
      paragraphs: [
        'Standard piping often shrinks at a different rate than the main body fabric, causing unsightly bunching or pulling around the cuffs after the first wash.',
        'Our technicians engineered a custom micro-rib piping insert that expands and contracts in exact synchronization with our 190 GSM cotton-modal knit.',
        'The result is a clean, sharp, razor-straight accent that frames the arms and hemline, creating a tailored, sculpted silhouette that stays crisp through countless wears.'
      ],
      quote: '“Subtle design details require the most complex manufacturing discipline.”',
    },
    relatedProductSlug: 'piping-crewneck',
  },
];
