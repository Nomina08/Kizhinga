export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** PDF: public/images/Путеводитель.pdf */
export const GUIDE_PDF_URL = assetPath('/images/Путеводитель.pdf');
