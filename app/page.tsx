import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Featured } from '@/components/featured';
import { Services } from '@/components/services';
import { Team } from '@/components/team';
import { Careers } from '@/components/careers';
import { Footer } from '@/components/footer';
import { AnimatedBackground } from '@/components/animated-background';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <Featured />
        <Services />
        <Team />
        <Careers />
      </main>
      <Footer />
    </div>
  );
}
