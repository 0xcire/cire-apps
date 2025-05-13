import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@cire/ui/components/mode-toggle";

// this is getting deleted
export default function Header() {
  return (
    <header className=" p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold space-x-2">
          <Link to="/">Home</Link>
          <Link to="/auth/sign-in">Sign in</Link>
          <Link to="/auth/sign-up">Sign up</Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
