"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full border-b bg-background shadow-sm fixed top-0 left-0 z-50">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="text-lg font-bold text-foreground">Lumeo Vision</div>

        {/* Desktop Menu */}
        <MenubarPrimitive.Root
          ref={ref}
          className={cn(
            "hidden md:flex h-10 items-center space-x-4 text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </MenubarPrimitive.Root>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md border"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown (Opens Downward) */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden bg-background border-t",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col py-2 px-4 space-y-2">
          {React.Children.map(children, (child) => (
            <div className="py-2 border-b last:border-0 text-sm font-medium text-foreground">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
Menubar.displayName = "Menubar";
