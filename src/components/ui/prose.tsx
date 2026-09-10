export const Prose = ({ body }: { body: string }) => {
  return (
    <div
      className={
        "prose 2xl:prose-lg mt-9 mb-8 max-w-max prose-headings:text-pretty prose-p:text-pretty prose-headings:font-semibold prose-headings:text-brand prose-p:text-neutral-800 prose-strong:text-brand prose-headings:tracking-tight"
      }
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};
