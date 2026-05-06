import { ReactNode } from 'react';
import '../globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen h-full flex flex-col bg-zinc-50 dark:bg-black dark:text-white">
        <main className="m-6 h-full">{children}</main>
      </body>
    </html>
  );
}
