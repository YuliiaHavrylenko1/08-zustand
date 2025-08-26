import './global.css'; 
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata = {
  title: 'NoteHub',
  description: 'NoteHub - your note management app',
};

export default function RootLayout({
  children,
  modal,
}: Readonly< {
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children} {modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
