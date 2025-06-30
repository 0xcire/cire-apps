import { Link } from '@tanstack/react-router';
import { ModeToggle } from '@cire/ui/components/mode-toggle';
import { useSession } from '../lib/better-auth';

// this is getting deleted
export default function Header() {
  const { data, error } = useSession();
  return (
    <header className=" p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold space-x-2">
          <Link to="/">Home</Link>
          {!data && (
            <>
              <Link to="/auth/sign-in">Sign in</Link>
              <Link to="/auth/sign-up">Sign up</Link>
            </>
          )}

          {data && (
            <>
              <Link to="/routing">Create a route</Link>
              <Link to="/stations">View stations</Link>
              <Link to="/vehicles">Your vehicles</Link>
            </>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
