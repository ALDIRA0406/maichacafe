export interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  process: string;
  image: string;
  tag?: 'Best Seller' | 'Favorite' | 'Must Try' | 'New' | 'Premium' | 'Local Twist' | 'Gift' | string;
  category: 'Minuman' | 'Makanan';
  subcategory:
    | 'Coffee Based'
    | 'Flavour Coffee'
    | 'Milk Based'
    | 'Soda Based'
    | 'Tea Based'
    | 'Additional'
    | 'Snack'
    | 'Dessert'
    | 'Main Course'
    | 'Rice Bowl'
    | 'Pasta & Mie';
  featured?: boolean;
}
