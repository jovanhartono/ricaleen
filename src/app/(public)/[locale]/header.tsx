import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const links = [
  {
    href: "/contact",
    tLabel: "navigation.contact",
  },
];

export function Header() {
  const t = useTranslations("header");
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center px-4">
        <Link href="/">
          <Image
            src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/wordmark-R9wOmJpatlVFjfeLEzTZ80E2XSHgJU.png"
            width={120}
            height={35}
            alt="logo"
          />
        </Link>

        <nav className="ml-auto">
          <ul className="flex items-center gap-x-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link
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
      </div>
    </header>
  );
}
