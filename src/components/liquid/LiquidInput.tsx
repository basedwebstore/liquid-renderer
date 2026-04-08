import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidInputProps extends LiquidWidgetProps {
  label: string;
  value?: string;
  placeholder?: string;
  inputType?: 'text' | 'email' | 'number' | 'password';
  readOnly?: boolean;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidInput({
  label,
  value,
  placeholder,
  inputType = 'text',
  readOnly = true,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidInputProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const inputStyle: CSSProperties = {
    width: '100%',
    border: `1px solid ${tokens.border}`,
    borderRadius: 10,
    backgroundColor: tokens.surface,
    color: tokens.text,
    padding: '10px 12px',
    outline: 'none',
  };

  return (
    <label className={`block ${className}`} style={style as CSSProperties | undefined}>
      <span className="mb-2 block text-sm font-medium" style={{ color: tokens.text }}>
        {label}
      </span>
      <input type={inputType} value={value ?? ''} placeholder={placeholder} readOnly={readOnly} style={inputStyle} />
    </label>
  );
}
