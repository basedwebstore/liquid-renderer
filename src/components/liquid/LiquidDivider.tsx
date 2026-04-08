import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidDividerProps extends LiquidWidgetProps {
  label?: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidDivider({ label, theme = 'light', colorTokens, className = '', style }: LiquidDividerProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div className={`flex items-center gap-3 ${className}`} style={style as CSSProperties | undefined}>
      <span style={{ height: 1, backgroundColor: tokens.border, flex: 1 }} />
      {label ? (
        <span className="text-xs font-medium" style={{ color: tokens.mutedText }}>
          {label}
        </span>
      ) : null}
      <span style={{ height: 1, backgroundColor: tokens.border, flex: 1 }} />
    </div>
  );
}
