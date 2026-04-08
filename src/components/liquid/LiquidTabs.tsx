import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidTabItem {
  id: string;
  label: string;
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidTabsProps extends LiquidWidgetProps {
  items: LiquidTabItem[];
  activeId?: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidTabs({
  items,
  activeId,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidTabsProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const selectedId = activeId ?? items[0]?.id;

  return (
    <div
      className={`inline-flex w-full flex-wrap items-center gap-2 rounded-xl border p-2 ${className}`}
      style={{
        border: `1px solid ${tokens.border}`,
        borderRadius: 12,
        backgroundColor: tokens.surface,
        ...(style as CSSProperties | undefined),
      }}
    >
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <span
            key={item.id}
            className="rounded-lg px-3 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: selected ? tokens.accent : tokens.surfaceAlt,
              color: selected ? tokens.accentText : tokens.text,
            }}
          >
            {item.label}
          </span>
        );
      })}
    </div>
  );
}
