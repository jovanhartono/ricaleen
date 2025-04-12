"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export function useSanitizedText(html: string) {
  const [text, setText] = useState("");

  useEffect(() => {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    setText(clean);
  }, [html]);

  return text;
}
