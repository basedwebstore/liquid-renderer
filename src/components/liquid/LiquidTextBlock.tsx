import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidTextBlockProps extends LiquidWidgetProps {
  heading?: string;
  body: string;
  align?: 'left' | 'center' | 'right';
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidTextBlock({
  heading,
  body,
  align = 'left',
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidTextBlockProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const defaultStyle: CSSProperties = {
    border: `1px solid ${tokens.border}`,
    borderRadius: 12,
    backgroundColor: tokens.surface,
    color: tokens.text,
    padding: 16,
    textAlign: align,
  };

  return (
    <div className={`rounded-xl border p-4 ${className}`} style={{ ...defaultStyle, ...(style as CSSProperties | undefined) }}>
      {heading ? (
        <p className="text-base font-semibold" style={{ color: tokens.text }}>
          {heading}
        </p>
      ) : null}
      <p className={heading ? 'mt-2 text-sm' : 'text-sm'} style={{ color: tokens.mutedText, whiteSpace: 'pre-wrap' }}>
        {body}
      </p>
    </div>
  );
}
