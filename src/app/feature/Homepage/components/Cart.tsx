"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DialogPayment } from "./DialogPayment";

export default function Cart() {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    Image: string;
  }
  const [cart, setCart] = useState<CartItem[]>([]);
  //discount
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const discount =
    cart.length >= 3 ? total * 0.03 : cart.length >= 5 ? total * 0.05 : null;
  const netTotal = total - (discount ?? 0);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  console.log("cart", cart);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <ShoppingCartIcon className="w-5 h-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
              {cart.length}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4 bg-background shadow-lg rounded-md">
        {cart.length > 0 ? (
          <>
            <div className="grid gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px_1fr_auto] items-center gap-4"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.Image}`}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div className="grid gap-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: 1</p>
                  </div>
                  <p className="font-medium">${item.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium flex gap-2">
                  Total
                  {cart.length >= 5 ? (
                    <p>discount 5%</p>
                  ) : cart.length >= 3 ? (
                    <p>discount 3%</p>
                  ) : null}
                </span>
                <p className="font-medium">${netTotal}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <DialogPayment />
                <button
                  onClick={() => localStorage.removeItem("cart")}
                  className="flex-1"
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <ShoppingCartIcon className="w-8 h-8 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
