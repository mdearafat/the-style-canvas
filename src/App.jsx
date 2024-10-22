import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}
