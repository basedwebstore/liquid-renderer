import type { CSSProperties, ReactElement, ReactNode } from 'react';

import { ComponentRegistry } from './liquid.registry';
import { resolveLiquidColorTokens } from './color-scheme';
import { resolveLiquidValue } from './runtime';
import type {
  LiquidBlueprint,
  LiquidColorScheme,
  LiquidColorTokens,
  LiquidRendererRuntime,
  LiquidThemeMode,
  LiquidWidget,
  LiquidWidgetProps,
} from './liquid.types';

export interface LiquidRendererProps {
  blueprint?: LiquidBlueprint | null;
  themeMode?: LiquidThemeMode;
  runtime?: LiquidRendererRuntime;
}

function UnknownWidgetFallback({
  type,
  id,
  theme,
  colorTokens,
}: {
  type?: string;
  id?: string;
  theme: LiquidThemeMode;
  colorTokens: LiquidColorTokens;
}) {
  const isDark = theme === 'dark';

  return (
    <div
      className="rounded-xl border-2 border-red-400 bg-red-50 p-3 text-sm text-red-700"
      style={{
        border: `2px solid ${colorTokens.danger}`,
        borderRadius: 12,
        backgroundColor: isDark ? colorTokens.surfaceAlt : '#fef2f2',
        padding: 12,
        fontSize: 14,
        color: colorTokens.danger,
      }}
    >
      <p className="font-semibold">Unknown component type</p>
      <p className="mt-1">type: {type ?? 'undefined'}</p>
      <p>id: {id ?? 'undefined'}</p>
    </div>
  );
}

function renderWidget(
  widget: LiquidWidget,
  key: string,
  theme: LiquidThemeMode,
  colorScheme: LiquidColorScheme | undefined,
  runtime?: LiquidRendererRuntime,
): ReactElement {
  const RegisteredComponent = ComponentRegistry[widget.type];
  const resolvedProps = resolveLiquidValue(widget.props ?? {}, runtime) as LiquidWidgetProps;
  const widgetTheme = resolvedProps.theme ?? theme;
  const widgetColorScheme = resolvedProps.colorScheme ?? colorScheme;
  const widgetColorTokens = resolveLiquidColorTokens(widgetTheme, widgetColorScheme);

  if (!RegisteredComponent) {
    return (
      <UnknownWidgetFallback
        key={key}
        type={widget.type}
        id={widget.id}
        theme={widgetTheme}
        colorTokens={widgetColorTokens}
      />
    );
  }

  const props: LiquidWidgetProps = {
    ...resolvedProps,
    theme: widgetTheme,
    colorTokens: widgetColorTokens,
    widgetId: widget.id,
    dispatch: runtime?.dispatch,
  };
  const hasChildren = Array.isArray(widget.children) && widget.children.length > 0;
  const children: ReactNode = hasChildren
    ? widget.children!.map((child, index) =>
        renderWidget(child, `${widget.id || 'widget'}-child-${index}`, widgetTheme, widgetColorScheme, runtime),
      )
    : undefined;

  return (
    <RegisteredComponent key={key} {...props}>
      {children}
    </RegisteredComponent>
  );
}

export function LiquidRenderer({ blueprint, themeMode, runtime }: LiquidRendererProps) {
  const widgets = Array.isArray(blueprint?.widgets) ? blueprint.widgets : [];
  const layout = blueprint?.layout;
  const resolvedTheme: LiquidThemeMode = themeMode ?? blueprint?.theme ?? layout?.theme ?? 'light';
  const resolvedColorScheme = blueprint?.colorScheme ?? layout?.colorScheme;
  const resolvedColorTokens = resolveLiquidColorTokens(resolvedTheme, resolvedColorScheme);
  const columns = layout?.columns ?? 1;
  const gap = layout?.gap ?? 16;
  const defaultLayoutClassName = 'grid auto-rows-fr items-start';
  const layoutClassName = `${defaultLayoutClassName} ${layout?.className ?? ''}`;
  const layoutStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
    gap: `${Math.max(0, gap)}px`,
    backgroundColor: resolvedColorTokens.pageBackground,
    color: resolvedColorTokens.text,
    ...(layout?.style as CSSProperties | undefined),
  };

  if (widgets.length === 0) {
    return (
      <div
        className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500"
        style={{
          border: `1px solid ${resolvedColorTokens.border}`,
          borderRadius: 12,
          backgroundColor: resolvedColorTokens.surface,
          padding: 16,
          fontSize: 14,
          color: resolvedColorTokens.mutedText,
        }}
      >
        No widgets to render.
      </div>
    );
  }

  return (
    <div className={layoutClassName} style={layoutStyle}>
      {widgets.map((widget, index) => {
        const key = widget?.id || `widget-${index}`;

        if (!widget || typeof widget.type !== 'string') {
          return (
            <UnknownWidgetFallback
              key={key}
              type={widget?.type}
              id={widget?.id}
              theme={resolvedTheme}
              colorTokens={resolvedColorTokens}
            />
          );
        }

        return renderWidget(widget, key, resolvedTheme, resolvedColorScheme, runtime);
      })}
    </div>
  );
}