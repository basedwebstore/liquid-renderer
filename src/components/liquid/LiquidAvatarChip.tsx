import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidAvatarChipProps extends LiquidWidgetProps {
  name: string;
  subtitle?: string;
  imageUrl?: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function LiquidAvatarChip({
  name,
  subtitle,
  imageUrl,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidAvatarChipProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-xl border px-3 py-2 ${className}`}
      style={{ border: `1px solid ${tokens.border}`, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: tokens.accent,
            color: tokens.accentText,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {initials(name)}
        </span>
      )}
      <span>
        <p className="text-sm font-semibold" style={{ color: tokens.text }}>
          {name}
        </p>
        {subtitle ? (
          <p className="text-xs" style={{ color: tokens.mutedText }}>
            {subtitle}
          </p>
        ) : null}
      </span>
    </div>
  );
}
