type LoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudinaryLoader({ src, width, quality }: LoaderParams): string {
  // Non-Cloudinary URLs (local /placeholder.svg, supabase, etc.) — return as-is
  if (!src.includes('res.cloudinary.com')) return src;

  // Cloudinary URL format:
  // https://res.cloudinary.com/<cloud>/image/upload/<transformations>/<public_id>
  // Insert f_auto,q_auto,w_{width} transformations after /upload/
  const q = quality || 'auto';
  return src.replace(
    '/image/upload/',
    `/image/upload/f_auto,q_${q},w_${width}/`
  );
}
