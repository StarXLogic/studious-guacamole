import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { features } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-6xl mx-auto w-full">
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </main>
      <Footer />
    </div>
  );
}