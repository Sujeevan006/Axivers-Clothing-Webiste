import { db } from '@/lib/firebase/client';
import { StoreSettings, ShippingSettings } from '@/types/settings';
import { doc, getDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Axivers Clothing',
  currency: 'LKR',
  timezone: 'Asia/Colombo',
  supportEmail: 'contact@axivers.com',
  supportPhone: '+94 77 123 4567',
  ordersEnabled: true,
  standardShippingFee: 45000,    // Minor units (LKR 450.00)
  freeShippingThreshold: 1500000,// Minor units (LKR 15,000.00)
};

/**
 * Normalizes store settings document from Firestore
 */
export function normalizeStoreSettings(data: any): StoreSettings {
  if (!data) return DEFAULT_STORE_SETTINGS;

  // Handle standardShippingFee: if stored in major units (e.g. 450), convert to minor (45000)
  let standardShippingFee = Number(data.standardShippingFee ?? DEFAULT_STORE_SETTINGS.standardShippingFee);
  if (standardShippingFee > 0 && standardShippingFee < 1000) {
    standardShippingFee = standardShippingFee * 100;
  }

  // Handle freeShippingThreshold: if stored in major units (e.g. 15000), convert to minor (1500000)
  let freeShippingThreshold = data.freeShippingThreshold !== undefined 
    ? Number(data.freeShippingThreshold) 
    : DEFAULT_STORE_SETTINGS.freeShippingThreshold;
  if (freeShippingThreshold && freeShippingThreshold > 0 && freeShippingThreshold < 100000) {
    freeShippingThreshold = freeShippingThreshold * 100;
  }

  return {
    storeName: data.storeName || DEFAULT_STORE_SETTINGS.storeName,
    currency: data.currency || DEFAULT_STORE_SETTINGS.currency,
    timezone: data.timezone || DEFAULT_STORE_SETTINGS.timezone,
    supportEmail: data.supportEmail || DEFAULT_STORE_SETTINGS.supportEmail,
    supportPhone: data.supportPhone || DEFAULT_STORE_SETTINGS.supportPhone,
    ordersEnabled: data.ordersEnabled !== undefined ? Boolean(data.ordersEnabled) : DEFAULT_STORE_SETTINGS.ordersEnabled,
    standardShippingFee,
    freeShippingThreshold,
  };
}

/**
 * Fetch settings from /settings/store and /settings/shipping
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const storeSnap = await getDoc(doc(db, 'settings', 'store'));
    const shippingSnap = await getDoc(doc(db, 'settings', 'shipping'));

    let mergedData = { ...DEFAULT_STORE_SETTINGS };

    if (storeSnap.exists()) {
      mergedData = { ...mergedData, ...storeSnap.data() };
    }

    if (shippingSnap.exists()) {
      const shippingData = shippingSnap.data();
      if (shippingData.standardShippingFee !== undefined) {
        mergedData.standardShippingFee = shippingData.standardShippingFee;
      }
      if (shippingData.freeShippingThreshold !== undefined) {
        mergedData.freeShippingThreshold = shippingData.freeShippingThreshold;
      }
    }

    return normalizeStoreSettings(mergedData);
  } catch (error) {
    console.warn('Error reading store settings from Firestore, using defaults:', error);
    return DEFAULT_STORE_SETTINGS;
  }
}

/**
 * Subscribe to real-time store settings updates
 */
export function subscribeToStoreSettings(
  onSettingsChange: (settings: StoreSettings) => void
): Unsubscribe {
  try {
    const docRef = doc(db, 'settings', 'store');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onSettingsChange(normalizeStoreSettings(docSnap.data()));
        } else {
          onSettingsChange(DEFAULT_STORE_SETTINGS);
        }
      },
      (error) => {
        console.warn('Store settings subscription error, using defaults:', error);
        onSettingsChange(DEFAULT_STORE_SETTINGS);
      }
    );
  } catch (error) {
    console.warn('Failed to listen to store settings:', error);
    onSettingsChange(DEFAULT_STORE_SETTINGS);
    return () => {};
  }
}

/**
 * Calculate delivery fee based on subtotal (in minor units) and store settings
 */
export function calculateDeliveryFee(subtotalMinor: number, settings: StoreSettings): number {
  if (
    settings.freeShippingThreshold !== undefined &&
    settings.freeShippingThreshold > 0 &&
    subtotalMinor >= settings.freeShippingThreshold
  ) {
    return 0; // Free shipping
  }
  return settings.standardShippingFee;
}
