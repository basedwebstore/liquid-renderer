import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidToolbarAction {
  label: string;
  tone?: 'neutral' | 'primary';
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidToolbarProps extends LiquidWidgetProps {
  title?: string;
  actions?: LiquidToolbarAction[];
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidToolbar({
  title,
  actions = [],
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidToolbarProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${className}`}
      style={{ border: `1px solid ${tokens.border}`, borderRadius: 12, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      <p className="text-sm font-semibold" style={{ color: tokens.text }}>
        {title}
      </p>
      <div className="flex items-center gap-2">
        {actions.map((action, index) => {
          const primary = action.tone === 'primary';
          return (
            <span
              key={`${action.label}-${index}`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium"
              style={{
                border: primary ? 'none' : `1px solid ${tokens.border}`,
                backgroundColor: primary ? tokens.accent : tokens.surfaceAlt,
                color: primary ? tokens.accentText : tokens.text,
              }}
            >
              {action.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
