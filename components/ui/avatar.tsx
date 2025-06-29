import * as React from "react";

export function Avatar({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <img className="aspect-square h-full w-full" src={src} alt={alt} />
  );
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
      {children}
    </span>
  );
} 