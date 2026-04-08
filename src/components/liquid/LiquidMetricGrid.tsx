import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidMetricGridItem {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidMetricGridProps extends LiquidWidgetProps {
  items: LiquidMetricGridItem[];
  columns?: number;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidMetricGrid({
  items,
  columns = 3,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidMetricGridProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
    gap: 10,
    ...(style as CSSProperties | undefined),
  };

  return (
    <div className={className} style={gridStyle}>
      {items.map((item, index) => {
        const color =
          item.tone === 'success' ? tokens.success : item.tone === 'warning' ? tokens.warning : item.tone === 'danger' ? tokens.danger : tokens.text;
        return (
          <div key={`${item.label}-${index}`} style={{ border: `1px solid ${tokens.border}`, borderRadius: 10, backgroundColor: tokens.surface, padding: 12 }}>
            <p className="text-xs" style={{ color: tokens.mutedText }}>
              {item.label}
            </p>
            <p className="mt-1 text-lg font-semibold" style={{ color }}>
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
