import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - SEEYA LUXE',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script src="https://upload-widget.cloudinary.com/global/all.js" async />
      {children}
    </>
  );
}
