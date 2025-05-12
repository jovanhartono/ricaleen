"use client";

import { memo, useTransition } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const languages = {
  id: "Bahasa Indonesia",
  en: "English",
};

export const LanguageSwitcher = memo(function LanguageSwitcher({
  isScrolled,
}: {
  isScrolled: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const params = useParams();
  const searchParams = useSearchParams();

  const isHomePage = pathname === "/";

  const switchLocale = (locale: "id" | "en") => {
    startTransition(() => {
      const query = Object.fromEntries(searchParams.entries());

      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params, query },
        { locale },
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button
          variant="ghost"
          size="sm"
          className={cn("ml-auto flex h-8 items-center gap-1 px-2 sm:ml-4", {
            "text-white": isHomePage && !isScrolled,
          })}
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{locale.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {routing.locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            className="flex cursor-pointer items-center justify-between"
            onClick={() => switchLocale(localeOption)}
          >
            {languages[localeOption]}
            {localeOption === locale && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
