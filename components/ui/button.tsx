import React from "react";
import clsx from "clsx";

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-600 text-white hover:bg-cyan-700",
  pink: "bg-pink-600 text-white hover:bg-pink-700",
  // Add more colors as needed
  default: "bg-gray-800 text-white hover:bg-gray-900"
};

const variantMap: Record<string, string> = {
  default: "bg-gray-800 text-white hover:bg-gray-900",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizeMap: Record<string, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "cyan" | "pink" | "default";
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = "default", variant = "default", size = "default", className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantMap[variant] || variantMap.default,
        sizeMap[size] || sizeMap.default,
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button"; 