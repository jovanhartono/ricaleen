export const Prose = ({ body }: { body: string }) => {
  return (
    <div
      className={
        "prose mt-9 mb-8 max-w-max 2xl:prose-lg prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-pretty prose-headings:text-brand prose-p:text-pretty prose-p:text-neutral-800 prose-strong:text-brand"
      }
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};
