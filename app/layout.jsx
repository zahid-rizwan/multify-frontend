import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'MLTify - Medical Laboratory Technology Study Portal & PYQs',
  description:
    'Free previous year question papers (PYQs) and high-yield lecture notes for B.Sc MLT, DMLT, and M.Sc MLT students. Learn, Analyze, and Excel in clinical lab diagnostics.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

