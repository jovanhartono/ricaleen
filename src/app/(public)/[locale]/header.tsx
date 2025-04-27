import { LanguageSwitcher } from "@/components/lang-switcher";
import MobileNavbar from "@/components/mobile-navbar";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const links = [
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
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="relative container flex h-20 items-center px-4">
        <Link prefetch href="/">
          <Image
            src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/wordmark-R9wOmJpatlVFjfeLEzTZ80E2XSHgJU.png"
            width={120}
            height={35}
            alt="logo"
          />
        </Link>

        <MobileNavbar links={links} />

        <nav className="ml-auto max-sm:hidden">
          <ul className="flex items-center gap-x-4">
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
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
