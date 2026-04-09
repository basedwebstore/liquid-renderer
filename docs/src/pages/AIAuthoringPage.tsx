export function AIAuthoringPage() {
  return (
    <div className="panel main-panel">
      <h2>AI Authoring</h2>
      <p className="muted">
        Use these prompts to generate blueprints, components, and action logic while keeping everything aligned with Liquid Renderer
        contracts.
      </p>

      <h3>Prompt Template: Blueprint</h3>
      <pre>{`Create a Liquid JSON blueprint for a utility dashboard.
Requirements:
- version: 1.0.0
- use widgets from registry only
- include actionId for every button
- use data pointers for runtime values ($global.*, $input.*, $page.*)
- keep layout responsive and concise`}</pre>

      <h3>Prompt Template: New Component</h3>
      <pre>{`Create a new Liquid component.
Requirements:
- add strict TypeScript props
- support theme, className, style
- if interactive, emit dispatch events instead of hardcoded handlers
- register in src/liquid.registry.tsx
- update docs and provide blueprint example`}</pre>

      <h3>Prompt Template: Intent Flow</h3>
      <pre>{`Build controller logic for intent actions.
Requirements:
- accept dispatch events
- update local store for input/change
- call API for refresh actions
- for intent actions, bundle current state + user prompt and request a new blueprint`}</pre>
    </div>
  );
}
