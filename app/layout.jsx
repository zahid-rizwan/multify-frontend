import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'MLTify — Medical Study Platform | Notes, PYQs & Academic Resources',
  description:
    'Discover thoughtfully organized medical notes, past examination papers, and academic resources designed for healthcare and medical students.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F4EFE6] text-slate-900 antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

