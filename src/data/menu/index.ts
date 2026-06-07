import { MenuItem } from './types';
import { coffeeBasedItems, flavourCoffeeItems } from './drinks/coffee';
import { milkItems } from './drinks/milk';
import { sodaItems } from './drinks/soda';
import { teaItems } from './drinks/tea';
import { additionalItems } from './foods/additional';
import { snackItems } from './foods/snack';
import { dessertItems } from './foods/dessert';
import { mainCourseItems } from './foods/makananBerat';
import { riceBowlItems, pastaMieItems } from './foods/lainnya';

export * from './types';

export const MENU_DATA: MenuItem[] = [
  ...coffeeBasedItems,
  ...flavourCoffeeItems,
  ...milkItems,
  ...sodaItems,
  ...teaItems,
  ...additionalItems,
  ...snackItems,
  ...dessertItems,
  ...mainCourseItems,
  ...riceBowlItems,
  ...pastaMieItems,
];
