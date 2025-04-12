import { Button } from "@/components/ui/button";
import { LANGUAGE } from "@/types/enum";

export function LanguageToggle({
  language,
  setLanguage,
}: {
  language: LANGUAGE;
  setLanguage: (lang: LANGUAGE) => void;
}) {
  return (
    <div className="ml-auto flex items-center gap-x-2 p-1.5">
      <Button
        size="sm"
        variant={language === LANGUAGE.ID ? "default" : "outline"}
        onClick={() => setLanguage(LANGUAGE.ID)}
      >
        ID
      </Button>
      <Button
        size="sm"
        variant={language === LANGUAGE.EN ? "default" : "outline"}
        onClick={() => setLanguage(LANGUAGE.EN)}
      >
        EN
      </Button>
    </div>
  );
}
