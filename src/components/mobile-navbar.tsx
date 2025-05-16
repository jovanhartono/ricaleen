"use client";

import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  tLabel: string;
  href: string;
}

interface MobileNavbarProps {
  links: NavItem[];
  isTriggerWhite: boolean;
}

export default function MobileNavbar({
  links,
  isTriggerWhite,
}: MobileNavbarProps) {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className={cn(isTriggerWhite && "text-white")}
      >
        {isOpen ? (
          <XIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" />
        )}
      </Button>

      {isClient &&
        isOpen &&
        createPortal(
          <nav className="fixed inset-x-0 top-20 z-50 h-auto w-full border-b bg-background/80 px-4 py-8 backdrop-blur-md">
            <ul className="flex flex-col gap-y-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    prefetch
                    key={link.href}
                    href={link.href}
                    className="font-medium transition-colors duration-200 hover:text-brand"
                  >
                    {t(link.tLabel)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>,
          document.body,
        )}
    </div>
  );
}
