"use client";

import { LanguageSwitcher } from "@/components/lang-switcher";
import MobileNavbar from "@/components/mobile-navbar";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/siteconfig";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  {
    href: "/about",
    tLabel: "navigation.about",
  },
  {
    href: "/products",
    tLabel: "navigation.products",
  },
  {
    href: "/articles",
    tLabel: "navigation.articles",
  },
  {
    href: "/contact",
    tLabel: "navigation.contact",
  },
];

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState<number>(0);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = scrollY > 10;
  const isTransparentHeader = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 transition-colors duration-200",
        {
          "bg-background/80 backdrop-blur-md": isScrolled || !isHomePage,
        },
      )}
    >
      <div className="relative container flex h-20 items-center px-4">
        <Link prefetch href="/">
          <Image
            priority
            src={
              isTransparentHeader
                ? siteConfig.logoUrl.transparent
                : siteConfig.logoUrl.default
            }
            width={120}
            height={35}
            alt="logo"
            className="h-auto w-auto"
          />
        </Link>

        <nav className="ml-auto max-sm:hidden">
          <ul className="flex items-center gap-x-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  prefetch
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors duration-200 hover:text-brand",
                    {
                      "text-white/80 hover:text-white":
                        isHomePage && !isScrolled,
                    },
                  )}
                >
                  {t(link.tLabel)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher isScrolled={isScrolled} />

        <MobileNavbar
          links={links}
          isTriggerWhite={isHomePage && !isScrolled}
        />
      </div>
    </header>
  );
}
