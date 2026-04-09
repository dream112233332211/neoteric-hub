import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, ServiceConfiguration } from "@/types";
import { generateId } from "@/lib/utils";

interface CartStore {
  items: CartItem[];
  addProduct: (product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  }) => void;
  addService: (service: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    configuration: ServiceConfiguration;
  }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product) => {
        const { items } = get();
        const existing = items.find(
          (item) => item.id === product.id && item.type === "product"
        );

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.type === "product"
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                type: "product",
                name: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl,
              },
            ],
          });
        }
      },

      addService: (service) => {
        set({
          items: [
            ...get().items,
            {
              id: `${service.id}-${generateId()}`,
              type: "service",
              name: service.name,
              price: service.price,
              quantity: 1,
              imageUrl: service.imageUrl,
              configuration: service.configuration,
            },
          ],
        });
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    { name: "neoteric-cart" }
  )
);
