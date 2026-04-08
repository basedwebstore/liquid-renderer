import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidTimelineItem {
  title: string;
  description?: string;
  time?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidTimelineProps extends LiquidWidgetProps {
  items: LiquidTimelineItem[];
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidTimeline({
  items,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidTimelineProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{ border: `1px solid ${tokens.border}`, borderRadius: 12, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      <div style={{ display: 'grid', gap: 14 }}>
        {items.map((item, index) => {
          const dotColor =
            item.tone === 'success'
              ? tokens.success
              : item.tone === 'warning'
                ? tokens.warning
                : item.tone === 'danger'
                  ? tokens.danger
                  : tokens.accent;

          return (
            <div key={`${item.title}-${index}`} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 10 }}>
              <div style={{ display: 'grid', justifyItems: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: dotColor, marginTop: 4 }} />
                {index < items.length - 1 ? (
                  <span style={{ width: 2, flex: 1, minHeight: 22, backgroundColor: tokens.border, marginTop: 4 }} />
                ) : null}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: tokens.text }}>
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-1 text-sm" style={{ color: tokens.mutedText }}>
                    {item.description}
                  </p>
                ) : null}
                {item.time ? (
                  <p className="mt-1 text-xs" style={{ color: tokens.mutedText }}>
                    {item.time}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
