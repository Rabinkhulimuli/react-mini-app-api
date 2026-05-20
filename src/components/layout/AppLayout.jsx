import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePostsManager } from '@/hooks/usePostsManager';

export default function AppLayout() {
  const postsState = usePostsManager();
  const location = useLocation();

  return (
    <div className="app-shell">
      <div className="app-shell__glow app-shell__glow--one" />
      <div className="app-shell__glow app-shell__glow--two" />

      <header className="topbar">
        <div>
          <p className="eyebrow">Beginner API practice</p>
          <h1 className="topbar__title">React Posts Lab</h1>
          <p className="topbar__subtitle">
            Learn fetching, routing, CRUD simulation, and local state in one small app.
          </p>
        </div>

        <nav className="topbar__nav" aria-label="Primary navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
            Home
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
          >
            Create
          </NavLink>
          <Button asChild>
            <Link to="/create" className="topbar__cta">
              <Plus size={16} />
              New Post
            </Link>
          </Button>
        </nav>
      </header>

      <main className="content-wrap">
        {location.pathname !== '/' ? <div className="content-frame" /> : null}
        <Outlet context={postsState} />
      </main>
    </div>
  );
}