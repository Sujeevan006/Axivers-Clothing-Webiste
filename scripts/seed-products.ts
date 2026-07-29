import { productsDatabase } from '../app/data/products';
import { db } from '../lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Migration & Seed Script
 * Inserts default products from app/data/products.ts into Firestore.
 * Prevents duplicates by checking if the product ID or slug already exists.
 */
export async function seedProductsToFirestore() {
  console.log('🌱 Starting product seeding process to Firestore...');
  let addedCount = 0;
  let skippedCount = 0;

  for (const item of productsDatabase) {
    try {
      const docRef = doc(db, 'products', item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(`[SKIP] Product "${item.name}" (ID: ${item.id}) already exists in Firestore.`);
        skippedCount++;
      } else {
        const newProductData = {
          name: item.name,
          slug: item.id,
          description: item.description,
          category: item.category || 'flagship',
          categoryLabel: item.categoryLabel || 'Flagship',
          tagline: item.tagline || '',
          price: item.price,
          compareAtPrice: item.price + 500,
          sizes: item.sizes || ['S', 'M', 'L', 'XL'],
          colors: ['Black', 'White'],
          stock: 50, // Default initial inventory
          images: item.images || ['/images/pdp_front.jpg'],
          fabricSpec: item.fabricSpec || '',
          careInstructions: item.careInstructions || '',
          featured: true,
          active: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(docRef, newProductData);
        console.log(`[ADDED] Product "${item.name}" (ID: ${item.id}) inserted successfully into Firestore!`);
        addedCount++;
      }
    } catch (error) {
      console.error(`[ERROR] Failed to seed product "${item.name}":`, error);
    }
  }

  console.log(`\n🎉 Seeding finished: ${addedCount} added, ${skippedCount} skipped.`);
}

// Execute if run directly via tsx/node
if (require.main === module) {
  seedProductsToFirestore()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
