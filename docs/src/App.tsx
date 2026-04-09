import { useState } from 'react';

import { AIAuthoringPage } from './pages/AIAuthoringPage';
import { BlueprintGuidePage } from './pages/BlueprintGuidePage';
import { ComponentsPage } from './pages/ComponentsPage';
import { DispatchGuidePage } from './pages/DispatchGuidePage';
import { HomePage } from './pages/HomePage';
import { LayoutingPage } from './pages/LayoutingPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { StylingPage } from './pages/StylingPage';

type RouteKey = 'home' | 'playground' | 'components' | 'blueprint' | 'dispatch' | 'styling' | 'ai' | 'layouting';

export function App() {
  const [route, setRoute] = useState<RouteKey>('home');

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Liquid Renderer Docs</h1>
          <p>Install, author, style, and ship blueprint-driven UI</p>
        </div>
        <nav className="nav-tabs">
          <button type="button" className={route === 'home' ? 'active' : ''} onClick={() => setRoute('home')}>
            Home
          </button>
          <button type="button" className={route === 'playground' ? 'active' : ''} onClick={() => setRoute('playground')}>
            Playground
          </button>
          <button type="button" className={route === 'components' ? 'active' : ''} onClick={() => setRoute('components')}>
            Components
          </button>
          <button type="button" className={route === 'blueprint' ? 'active' : ''} onClick={() => setRoute('blueprint')}>
            Blueprint
          </button>
          <button type="button" className={route === 'dispatch' ? 'active' : ''} onClick={() => setRoute('dispatch')}>
            Dispatch
          </button>
          <button type="button" className={route === 'styling' ? 'active' : ''} onClick={() => setRoute('styling')}>
            Styling
          </button>
          <button type="button" className={route === 'ai' ? 'active' : ''} onClick={() => setRoute('ai')}>
            AI Authoring
          </button>
          <button type="button" className={route === 'layouting' ? 'active' : ''} onClick={() => setRoute('layouting')}>
            Layouting
          </button>
        </nav>
      </header>

      <main>
        {route === 'home' ? <HomePage /> : null}
        {route === 'playground' ? <PlaygroundPage /> : null}
        {route === 'components' ? <ComponentsPage /> : null}
        {route === 'blueprint' ? <BlueprintGuidePage /> : null}
        {route === 'dispatch' ? <DispatchGuidePage /> : null}
        {route === 'styling' ? <StylingPage /> : null}
        {route === 'ai' ? <AIAuthoringPage /> : null}
        {route === 'layouting' ? <LayoutingPage /> : null}
      </main>
    </div>
  );
}
