import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* 「flex: 1;」とは flex-grow: 1, flex-shrink: 1, flex-basis: 0 */}
      <main className="flex-1 max-w-4xl w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}