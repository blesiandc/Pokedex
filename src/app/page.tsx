import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    // <div className="bg-[#e5e5f7] bg-opacity-20 p-8 flex items-center justify-center h-screen">
    <div
      className="bg-[#e5e5f7] bg-opacity-20 p-8 flex items-center justify-center h-screen
      "
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at 0 0, transparent 0, #e5e5f7 40px), repeating-linear-gradient(#45c8f755, #45c8f7)",
      }}
    >
      {/* <div>
        <h1>Welcome!</h1>
      </div> */}
      <div className="flex gap-28">
        <Link href="/pokedex">
          <Button className="text-2xl px-10 py-6">Pokedex</Button>
        </Link>
        <Link href="/captured">
          <Button className="text-2xl px-10 py-6">Captured</Button>
        </Link>
      </div>
    </div>
  );
}
