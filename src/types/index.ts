import type { User, Category, Product, Setting } from "@prisma/client";

export type { User, Category, Product, Setting };

export interface CartItem {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  image: string | null;
  quantity: number;
}
