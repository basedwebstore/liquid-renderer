import type { CSSProperties, ReactNode } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode } from '../../liquid.types';

export interface LiquidContainerProps {
  children: ReactNode;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidContainer({
  children,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidContainerProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const isDark = theme === 'dark';
  const defaultClassName = 'p-4';
  const defaultStyle: CSSProperties = {
    border: isDark ? '1px solid transparent' : `1px solid ${tokens.border}`,
    borderRadius: 20,
    backgroundColor: isDark ? tokens.surfaceAlt : tokens.surface,
    backgroundClip: 'padding-box',
    overflow: 'hidden',
    color: tokens.text,
    padding: 16,
    boxShadow: isDark ? 'none' : `0 1px 2px ${tokens.shadow}`,
  };

  return (
    <div
      className={`${defaultClassName} ${className}`}
      style={{ ...defaultStyle, ...(style as CSSProperties | undefined) }}
    >
      {children}
    </div>
  );
}
