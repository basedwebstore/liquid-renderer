import type { LiquidColorScheme, LiquidColorTokens, LiquidThemeMode } from './liquid.types';

export const DEFAULT_LIGHT_COLOR_TOKENS: LiquidColorTokens = {
  pageBackground: '#f8fafc',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',
  text: '#0f172a',
  mutedText: '#64748b',
  border: '#e2e8f0',
  accent: '#0f172a',
  accentText: '#ffffff',
  success: '#059669',
  warning: '#d97706',
  danger: '#b91c1c',
  shadow: 'rgba(15, 23, 42, 0.08)',
};

export const DEFAULT_DARK_COLOR_TOKENS: LiquidColorTokens = {
  pageBackground: '#020617',
  surface: '#0f172a',
  surfaceAlt: '#1e293b',
  text: '#e2e8f0',
  mutedText: '#94a3b8',
  border: '#334155',
  accent: '#22d3ee',
  accentText: '#020617',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#fda4af',
  shadow: 'rgba(2, 6, 23, 0.5)',
};

export function resolveLiquidColorTokens(
  theme: LiquidThemeMode,
  colorScheme?: LiquidColorScheme,
): LiquidColorTokens {
  const baseTokens = theme === 'dark' ? DEFAULT_DARK_COLOR_TOKENS : DEFAULT_LIGHT_COLOR_TOKENS;
  const themeOverrides = colorScheme?.[theme] ?? {};

  return {
    ...baseTokens,
    ...themeOverrides,
  };
}
