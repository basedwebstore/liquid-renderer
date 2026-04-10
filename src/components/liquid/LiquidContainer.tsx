import type { CSSProperties, ReactNode } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode } from '../../liquid.types';

type LiquidContainerAlign = 'start' | 'center' | 'end' | 'stretch';
type LiquidContainerJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

function toAlignItems(value: LiquidContainerAlign | undefined): CSSProperties['alignItems'] {
  if (value === 'start') return 'flex-start';
  if (value === 'end') return 'flex-end';
  return value;
}

function toJustifyContent(value: LiquidContainerJustify | undefined): CSSProperties['justifyContent'] {
  if (value === 'start') return 'flex-start';
  if (value === 'end') return 'flex-end';
  if (value === 'between') return 'space-between';
  if (value === 'around') return 'space-around';
  if (value === 'evenly') return 'space-evenly';
  return value;
}

export interface LiquidContainerProps {
  children?: ReactNode;
  columns?: number;
  rows?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  align?: LiquidContainerAlign;
  justify?: LiquidContainerJustify;
  padding?: number | string;
  margin?: number | string;
  radius?: number;
  shadow?: 'none' | 'sm' | 'md';
  borderless?: boolean;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidContainer({
  children,
  columns,
  rows,
  gap = 12,
  rowGap,
  columnGap,
  direction = 'column',
  wrap = false,
  align = 'stretch',
  justify = 'start',
  padding = 16,
  margin = 0,
  radius = 20,
  shadow = 'sm',
  borderless = false,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidContainerProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const isDark = theme === 'dark';

  const shouldUseGrid = typeof columns === 'number' || typeof rows === 'number';
  const computedRowGap = rowGap ?? gap;
  const computedColumnGap = columnGap ?? gap;

  const shadowValue =
    shadow === 'none'
      ? 'none'
      : shadow === 'md'
      ? isDark
        ? 'none'
        : `0 8px 18px ${tokens.shadow}`
      : isDark
      ? 'none'
      : `0 1px 2px ${tokens.shadow}`;

  const defaultStyle: CSSProperties = {
    display: shouldUseGrid ? 'grid' : 'flex',
    ...(shouldUseGrid
      ? {
          gridTemplateColumns: `repeat(${Math.max(1, columns ?? 1)}, minmax(0, 1fr))`,
          ...(typeof rows === 'number' ? { gridTemplateRows: `repeat(${Math.max(1, rows)}, minmax(0, 1fr))` } : {}),
          rowGap: `${Math.max(0, computedRowGap)}px`,
          columnGap: `${Math.max(0, computedColumnGap)}px`,
        }
      : {
          flexDirection: direction,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap: `${Math.max(0, gap)}px`,
          alignItems: toAlignItems(align),
          justifyContent: toJustifyContent(justify),
        }),
    border: borderless ? 'none' : isDark ? '1px solid transparent' : `1px solid ${tokens.border}`,
    borderRadius: radius,
    backgroundColor: isDark ? tokens.surfaceAlt : tokens.surface,
    backgroundClip: 'padding-box',
    overflow: 'visible',
    color: tokens.text,
    padding,
    margin,
    boxShadow: shadowValue,
    minWidth: 0,
  };

  return (
    <div
      className={className}
      style={{ ...defaultStyle, ...(style as CSSProperties | undefined) }}
    >
      {children}
    </div>
  );
}
