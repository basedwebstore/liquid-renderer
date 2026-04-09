import { useMemo, useState } from 'react';

import { LiquidRenderer, type LiquidRendererRuntime } from '@liquid-src/index';

import { createPreviewBlueprint, createPropsFromSource } from '../lib/demo-props';
import { getComponentDocs } from '../lib/source-docs';

export function ComponentsPage() {
  const docs = useMemo(() => getComponentDocs(), []);
  const [selectedKey, setSelectedKey] = useState(docs[0]?.key ?? '');

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
      <aside className="panel side-list">
        <h2>Components</h2>
        <p className="muted">Generated directly from source files.</p>
        <ul>
          {docs.map((doc) => (
            <li key={doc.key}>
              <button
                type="button"
                className={doc.key === selected.key ? 'chip active' : 'chip'}
                onClick={() => setSelectedKey(doc.key)}
              >
                {doc.key}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="panel main-panel">
        <h2>
          {selected.key} <span className="muted">({selected.fileName})</span>
        </h2>

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
