import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidListItem {
  title: string;
  subtitle?: string;
  meta?: string;
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidListProps extends LiquidWidgetProps {
  items: LiquidListItem[];
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidList({ items, theme = 'light', colorTokens, className = '', style }: LiquidListProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`rounded-xl border ${className}`}
      style={{ border: `1px solid ${tokens.border}`, borderRadius: 12, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 10,
            padding: '12px 14px',
            borderBottom: index < items.length - 1 ? `1px solid ${tokens.border}` : 'none',
          }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: tokens.text }}>
              {item.title}
            </p>
            {item.subtitle ? (
              <p className="text-xs" style={{ color: tokens.mutedText }}>
                {item.subtitle}
              </p>
            ) : null}
          </div>
          {item.meta ? <span style={{ color: tokens.mutedText, fontSize: 12 }}>{item.meta}</span> : null}
        </div>
      ))}
    </div>
  );
}
