"use client";

export default function AnchorLink({ id }: { id: string }) {
  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.location.href.split("#")[0] + "#" + id;
    navigator.clipboard.writeText(url).then(() => {
      const link = e.target as HTMLElement;
      const originalText = link.textContent;
      link.textContent = "✓";
      setTimeout(() => {
        link.textContent = originalText;
      }, 1000);
    });
  };

  return (
    <a href={`#${id}`} className="anchor-link" onClick={copyLink}>
      #
    </a>
  );
}
