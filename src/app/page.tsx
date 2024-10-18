import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <div>
        <h1>Welcome!</h1>
      </div> */}
      <div className="flex gap-10">
        <Link href="/pokedex">
          <Button>Poredex</Button>
        </Link>
        <Link href="/captured">
          <Button>Captured</Button>
        </Link>
      </div>
    </div>
  );
}
