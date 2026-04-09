import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidSelectOption {
  label: string;
  value: string;
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidSelectProps extends LiquidWidgetProps {
  label: string;
  options: LiquidSelectOption[];
  value?: string;
  disabled?: boolean;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidSelect({
  label,
  options,
  value,
  disabled = false,
  theme = 'light',
  colorTokens,
  className = '',
  style,
  dispatch,
  widgetId,
}: LiquidSelectProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const selectStyle: CSSProperties = {
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
      <select
        value={value ?? options[0]?.value ?? ''}
        disabled={disabled}
        onChange={(event) => {
          void dispatch?.({
            type: 'change',
            widgetId,
            payload: {
              value: event.target.value,
              label,
            },
          });
        }}
        style={selectStyle}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
