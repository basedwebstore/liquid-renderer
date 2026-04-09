import { useState } from 'react';

import { AIAuthoringPage } from './pages/AIAuthoringPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

type RouteKey = 'playground' | 'components' | 'ai';

export function App() {
  const [route, setRoute] = useState<RouteKey>('playground');

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Liquid Renderer Docs</h1>
          <p>Source-driven docs + real playground</p>
        </div>
        <nav className="nav-tabs">
          <button type="button" className={route === 'playground' ? 'active' : ''} onClick={() => setRoute('playground')}>
            Playground
          </button>
          <button type="button" className={route === 'components' ? 'active' : ''} onClick={() => setRoute('components')}>
            Components
          </button>
          <button type="button" className={route === 'ai' ? 'active' : ''} onClick={() => setRoute('ai')}>
            AI Authoring
          </button>
        </nav>
      </header>

      <main>
        {route === 'playground' ? <PlaygroundPage /> : null}
        {route === 'components' ? <ComponentsPage /> : null}
        {route === 'ai' ? <AIAuthoringPage /> : null}
      </main>
    </div>
  );
}
