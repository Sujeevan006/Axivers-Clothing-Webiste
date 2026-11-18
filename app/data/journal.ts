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
    slug: 'the-art-of-mercerized-cotton',
    title: 'The Art of 180 GSM Mercerized Cotton: Redefining Everyday Essentials',
    category: 'Fabric & Technology',
    readTime: '4 min read',
    publishedAt: 'October 2026',
    excerpt: 'Mercerization is a specialized finishing treatment that alters the molecular structure of cotton cellulose. Here is why it elevates our 180 GSM single jersey into an enduring everyday luxury.',
    coverImage: '/images/flagship-tee-black.jpg',
    content: {
      lead: 'In developing the inaugural Axivers flagship crewneck, conventional cotton simply did not deliver the level of luster, structural recovery, and smooth hand-feel our design philosophy demanded.',
      paragraphs: [
        'Pure 100% long-staple cotton is treated under controlled tension in an alkaline bath during the mercerization process. This round-shapes the natural kidney-bean cross-section of cotton fibers and un-twists their natural convolutions.',
        'The optical result is a distinctive, refined surface sheen that reflects ambient light uniformly, bringing deep chromatic depth to our solid Onyx Black knit.',
        'At 180 GSM, the single jersey knit achieves an ideal balance: substantial enough to drape cleanly over the torso without clinging, yet breathable and fluid for warm tropical and metropolitan environments alike.',
        'Unlike synthetic coatings that wash off over time, mercerization is a permanent structural enhancement that preserves the garment’s lustrous appearance and tactile softness.'
      ],
      quote: '“Mercerized cotton represents the intersection of natural fiber comfort and meticulous textile finishing.”',
    },
    relatedProductSlug: 'flagship-tee-black',
  },
  {
    slug: 'how-to-style-minimalist-athletic-luxury',
    title: 'Modern Silhouette Guide: How to Style Athletic Luxury Essentials',
    category: 'Style Guides',
    readTime: '3 min read',
    publishedAt: 'October 2026',
    excerpt: 'From tailoring to drape, mastering monochrome athletic luxury requires understanding proportions, subtle accents, and restrained silhouettes.',
    coverImage: '/images/editorial-men-black.jpg',
    content: {
      lead: 'Athletic luxury is not sportswear. It is the art of applying high-grade tailoring principles and ergonomic comfort to clean, elevated everyday silhouettes.',
      paragraphs: [
        'When dressing in monochrome palettes like Onyx Black, visual interest comes from textural contrast, precise ribbing, and subtle finishing details rather than loud logos.',
        'Pair our Signature Crewneck with relaxed tailored trousers, raw denim, or structured shorts. The contrasting gray rib-knit collar anchors the neckline, while the tipped ribbing on the sleeve cuffs provides an intentional flash of clean white contrast at the outer hem.',
        'For layering, the refined 180 GSM weight sits smoothly under unstructured blazers or overshirts without adding unnecessary bulk around the arms or chest.'
      ],
      quote: '“True luxury speaks quietly. When the silhouette and textile are considered, simplicity commands the room.”',
    },
    relatedProductSlug: 'flagship-tee-black',
  },
  {
    slug: 'made-in-sri-lanka-the-global-garment-hub',
    title: 'Behind the Brand: Why Colombo is the Hidden Epicenter of Modern Fashion',
    category: 'Behind the Brand',
    readTime: '5 min read',
    publishedAt: 'October 2026',
    excerpt: 'Sri Lanka has long engineered technical garments for the world’s most prestigious athletic labels. Axivers brings that caliber directly home.',
    coverImage: '/images/editorial-pedestal-black.png',
    content: {
      lead: 'For over four decades, Sri Lanka has been quietly revered across international fashion capitals as the gold standard for high-end apparel engineering.',
      paragraphs: [
        'Global leaders in athletic luxury and designer fashion choose Sri Lankan facilities because of our country’s technical knitting precision, ethical manufacturing standards, and skilled artisan workforce.',
        'Axivers Clothing (Pvt) Ltd was founded to bring that world-class capability directly to the forefront under an independent Sri Lankan luxury label. By conducting product development, precision cutting, and assembly in Colombo, we maintain rigorous oversight of every stitch line, seam tension, and trim placement.',
        'Our artisans take pride in crafting garments that rival the benchmark quality of international fashion capitals, proudly carrying the identification: Made in Sri Lanka.'
      ],
      quote: '“Our ambition is to prove that Sri Lankan craftsmanship can set the benchmark for elevated everyday apparel worldwide.”',
    },
    relatedProductSlug: 'flagship-tee-black',
  },
  {
    slug: 'anatomy-of-the-signature-cuff',
    title: 'Product Story: The Anatomy of Our Signature Tipped Sleeve & Rib Collar',
    category: 'Product Stories',
    readTime: '3 min read',
    publishedAt: 'September 2026',
    excerpt: 'A deep dive into why our master blueprint specifies yarn-dyed tipped ribbing with an outer-edge white stripe and spandex-reinforced crewneck collar.',
    coverImage: '/images/editorial-women-black.png',
    content: {
      lead: 'A premium T-shirt lives or dies by its neckline and sleeve cuffs. Here is the engineering behind the Axivers flagship construction.',
      paragraphs: [
        'Standard commercial T-shirt collars frequently stretch and lose their circular recovery after a few wears. To ensure resilience, our contrasting gray crewneck incorporates 3–5% spandex within the 1×1 rib construction, retaining its crisp frame around the collarbone throughout the garment’s lifespan.',
        'On the sleeves, earlier prototypes tested manually inserted piping, which risked uneven tension. The master specification replaced this with yarn-dyed black ribbing featuring a crisp white stripe positioned strictly at the absolute outer edge of the cuff.',
        'Knitted as a continuous tipped-rib element, this eliminates bulky internal seams, rests flush against the bicep, and provides a distinctive signature identity exclusive to Axivers.'
      ],
      quote: '“Subtle design signatures require the most disciplined technical construction.”',
    },
    relatedProductSlug: 'flagship-tee-black',
  },
];