import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidButtonProps extends LiquidWidgetProps {
  label: string;
  variant?: 'primary' | 'secondary';
  actionId: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
  disabled?: boolean;
}

export function LiquidButton({
  label,
  variant = 'primary',
  actionId,
  theme = 'light',
  colorTokens,
  className = '',
  style,
  disabled = false,
  dispatch,
  widgetId,
}: LiquidButtonProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const isDark = theme === 'dark';
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles =
    variant === 'primary'
      ? isDark
        ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 focus:ring-cyan-300'
        : 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900'
      : isDark
        ? 'bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500'
        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400';
  const defaultStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 500,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 150ms ease, color 150ms ease',
    boxShadow: `0 1px 2px ${tokens.shadow}`,
  };
  const variantStyle: CSSProperties =
    variant === 'primary'
      ? isDark
        ? { backgroundColor: tokens.accent, color: tokens.accentText }
        : { backgroundColor: tokens.accent, color: tokens.accentText }
      : isDark
        ? { backgroundColor: tokens.surfaceAlt, color: tokens.text, borderColor: tokens.border }
        : { backgroundColor: tokens.surfaceAlt, color: tokens.text, borderColor: tokens.border };

  return (
    <button
      type="button"
      data-action-id={actionId}
      disabled={disabled}
      onClick={() => {
        void dispatch?.({
          type: 'action',
          widgetId,
          payload: { actionId, label, variant },
        });
      }}
      style={{ ...defaultStyle, ...variantStyle, ...(style as CSSProperties | undefined) }}
      className={`${baseStyles} ${variantStyles} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}
