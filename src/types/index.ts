export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  modelImage: string;
}

export interface ProductComponent {
  name: string;
  fabric: string;
  details: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  fabricType: string;
  pieces: number;
  colors: ProductColor[];
  selectedColorIndex: number;
  mainImage: string;
  modelImage: string;
  galleryImages: string[];
  embroideryDetails: string;
  season: string;
  occasion: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
  collection: string;
  components: ProductComponent[];
  sku: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface WishlistItem {
  product: Product;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  productName: string;
  productId: string;
  isVerified: boolean;
  hasPhoto: boolean;
  photoUrl?: string;
  helpful: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  season?: string;
}

export interface FilterState {
  priceRange: [number, number];
  fabricTypes: string[];
  categories: string[];
  collections: string[];
  colors: string[];
  pieces: number[];
  embroideryTypes: string[];
  seasons: string[];
  availability: string[];
  occasions: string[];
  onSale: boolean;
  newArrivals: boolean;
  bestSellers: boolean;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: Address;
  paymentMethod: string;
}
