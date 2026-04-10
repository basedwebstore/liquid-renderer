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
  readOnly,
  theme = 'light',
  colorTokens,
  className = '',
  style,
  dispatch,
  widgetId,
}: LiquidInputProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const isEditable = Boolean(dispatch) && readOnly !== true;
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    ...(style as CSSProperties | undefined),
  };
  const labelStyle: CSSProperties = {
    display: 'block',
    color: tokens.text,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.3,
  };
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
    <label className={className} style={containerStyle}>
      <span style={labelStyle}>
        {label}
      </span>
      <input
        type={inputType}
        value={value ?? ''}
        placeholder={placeholder}
        readOnly={!isEditable}
        onChange={(event) => {
          if (!isEditable) {
            return;
          }

          void dispatch?.({
            type: 'input',
            widgetId,
            payload: {
              value: event.target.value,
              inputType,
              label,
            },
          });
        }}
        style={inputStyle}
      />
    </label>
  );
}
