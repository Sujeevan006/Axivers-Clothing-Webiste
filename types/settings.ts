export interface StoreSettings {
  storeName: string;             // "Axivers Clothing"
  currency: string;              // "LKR"
  timezone: string;              // "Asia/Colombo"
  supportEmail: string;          // "contact@axivers.com"
  supportPhone: string;          // "+94 77 123 4567"
  ordersEnabled: boolean;        // Operational toggle: if false, pause checkout!
  standardShippingFee: number;   // Minor units (e.g. 45000 = LKR 450.00)
  freeShippingThreshold?: number;// Minor units (e.g. 1500000 = LKR 15,000.00)
}

export interface ShippingSettings {
  standardShippingFee: number;   // Minor units (e.g. 45000)
  freeShippingThreshold?: number;// Minor units (e.g. 1500000)
  currency?: string;             // "LKR"
}
