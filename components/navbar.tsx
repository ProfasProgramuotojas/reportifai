"use client";

import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isTestRoute = pathname === "/test";

  return (
    <nav className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-red-500 rounded-lg flex items-center justify-center">
            <Bug className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent">
            Reportif.ai
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {!isTestRoute && (
            <Link href="/test">
              <Button className="bg-gradient-to-r from-violet-500 to-red-500 text-white hover:opacity-90 transition-opacity">
                Test Shop
              </Button>
            </Link>
          )}
          <Button
            variant={"outline"}
            className="border-2 h-12 border-transparent bg-gradient-to-r from-red-500 to-violet-500 bg-clip-padding opacity-80 relative before:absolute before:inset-0 before:bg-gray-900 before:m-[2px] before:rounded-[calc(0.5rem-2px)] before:-z-10"
          >
            <span className="bg-gradient-to-r from-red-400 to-violet-400 bg-clip-text text-transparent">
              Watch Demo
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
