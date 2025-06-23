import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <div className="text-7xl">hello</div>
      <ThemeToggle />
    </div>
  );
}
