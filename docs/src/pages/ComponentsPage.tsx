import { useMemo, useState } from 'react';

import { LiquidRenderer, type LiquidRendererRuntime } from '@liquid-src/index';

import { createPreviewBlueprint, createPropsFromSource } from '../lib/demo-props';
import { getComponentDocs } from '../lib/source-docs';

export function ComponentsPage() {
  const docs = useMemo(() => getComponentDocs(), []);
  const [selectedKey, setSelectedKey] = useState(docs[0]?.key ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return docs;
    }

    return docs.filter((doc) => {
      const haystack = `${doc.key} ${doc.fileName} ${doc.componentName}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [docs, searchQuery]);

  const selected = docs.find((doc) => doc.key === selectedKey) ?? docs[0];

  const runtime: LiquidRendererRuntime = {
    dispatch: (event) => {
      console.info('Component preview event', event);
    },
  };

  if (!selected) {
    return <p>No component sources found.</p>;
  }

  const previewBlueprint = createPreviewBlueprint(selected);
  const exampleProps = createPropsFromSource(selected);

  return (
    <div className="page-grid">
      <aside className="panel side-list component-browser-panel">
        <h2>Components</h2>
        <p className="muted">Generated directly from source files with parsed prop metadata.</p>
        <div className="field component-browser-search-wrap">
          <label htmlFor="component-search" className="muted">
            Search components
          </label>
          <input
            id="component-search"
            className="component-browser-search"
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Filter by key or filename"
          />
        </div>
        <p className="muted component-browser-count">
          Showing {filteredDocs.length} of {docs.length}
        </p>
        <ul className="component-browser-list">
          {filteredDocs.length === 0 ? (
            <li className="component-browser-empty">No components match your search.</li>
          ) : (
            filteredDocs.map((doc) => (
              <li key={doc.key}>
                <button
                  type="button"
                  className={doc.key === selected.key ? 'component-browser-row active' : 'component-browser-row'}
                  onClick={() => setSelectedKey(doc.key)}
                >
                  <span className="component-browser-row-main">{doc.key}</span>
                  <span className="component-browser-row-meta">{doc.fileName}</span>
                  <span className="component-browser-row-meta">{doc.props.length} props</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      <section className="panel main-panel">
        <h2>
          {selected.key} <span className="muted">({selected.fileName})</span>
        </h2>
        <p className="muted">Component: {selected.componentName}</p>

        <h3>Props (parsed from source)</h3>
        <table className="prop-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            {selected.props.map((prop) => (
              <tr key={prop.name}>
                <td>{prop.name}</td>
                <td>{prop.type}</td>
                <td>{prop.required ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Example Widget JSON</h3>
        <pre>{JSON.stringify({ id: `${selected.key}-1`, type: selected.key, props: exampleProps }, null, 2)}</pre>

        <h3>Live Preview</h3>
        <div className="preview-wrap">
          <LiquidRenderer blueprint={previewBlueprint} runtime={runtime} />
        </div>
      </section>
    </div>
  );
}
