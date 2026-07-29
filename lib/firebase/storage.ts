import { storage } from './client';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Uploads a file blob or File object to Firebase Storage under `products/` folder
 * Returns public download URL.
 */
export async function uploadProductImage(file: File, folder = 'products'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const storageRef = ref(storage, filename);
  
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

/**
 * Deletes an image from Firebase Storage by its full download URL or path.
 */
export async function deleteProductImageByUrl(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.includes('firebasestorage')) return;
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.warn('Failed to delete image from storage:', error);
  }
}
