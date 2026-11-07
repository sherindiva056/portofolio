import type { Metadata } from 'next';
import './globals.css';
import './blue-glass.css';
export const metadata: Metadata = {
  title: 'Sherindiva — Good things start with a hello.',
  description: 'Portfolio Sherindiva: front-end development and UI/UX design, with experience in project management, automation, and community programs. Explore projects, experiences, and new possibilities.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
