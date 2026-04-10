import { useEffect, useState } from 'react';

import { AIAuthoringPage } from './pages/AIAuthoringPage';
import { BlueprintGuidePage } from './pages/BlueprintGuidePage';
import { ComponentsPage } from './pages/ComponentsPage';
import { DispatchGuidePage } from './pages/DispatchGuidePage';
import { HomePage } from './pages/HomePage';
import { LayoutingPage } from './pages/LayoutingPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { StylingPage } from './pages/StylingPage';

type RouteKey = 'home' | 'playground' | 'components' | 'blueprint' | 'dispatch' | 'styling' | 'layouting' | 'ai';

const ROUTES: Array<{ key: RouteKey; label: string }> = [
  { key: 'home', label: 'Home' },
  { key: 'playground', label: 'Playground' },
  { key: 'components', label: 'Components' },
  { key: 'blueprint', label: 'Blueprint' },
  { key: 'dispatch', label: 'Dispatch' },
  { key: 'styling', label: 'Styling' },
  { key: 'layouting', label: 'Layouting' },
  { key: 'ai', label: 'AI Authoring' },
];

export function App() {
  const [route, setRoute] = useState<RouteKey>('home');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBooting(false);
    }, 600);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (isBooting) {
    return (
      <div className="app-loader" role="status" aria-live="polite">
        <div className="loader-mark" />
        <p>Loading Liquid Renderer Docs</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="app-navbar">
        <div className="navbar-brand">
          <h1>Liquid Renderer Docs</h1>
          <p>Professional blueprint UI authoring</p>
        </div>
        <div className="navbar-meta">v0.3.0</div>
      </header>

      <div className="app-main">
        <aside className="app-sidebar" aria-label="Documentation sections">
          <nav className="sidebar-nav">
            {ROUTES.map((item) => (
              <button
                key={item.key}
                type="button"
                className={route === item.key ? 'active' : ''}
                onClick={() => setRoute(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="app-content">
          {route === 'home' ? <HomePage /> : null}
          {route === 'playground' ? <PlaygroundPage /> : null}
          {route === 'components' ? <ComponentsPage /> : null}
          {route === 'blueprint' ? <BlueprintGuidePage /> : null}
          {route === 'dispatch' ? <DispatchGuidePage /> : null}
          {route === 'styling' ? <StylingPage /> : null}
          {route === 'layouting' ? <LayoutingPage /> : null}
          {route === 'ai' ? <AIAuthoringPage /> : null}
        </main>
      </div>
    </div>
  );
}
