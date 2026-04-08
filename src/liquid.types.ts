export type LiquidPrimitive = string | number | boolean;
export type LiquidThemeMode = 'light' | 'dark';

export type LiquidStyleValue = string | number;
export type LiquidJsonValue =
  | LiquidPrimitive
  | LiquidStyleMap
  | LiquidColorScheme
  | LiquidColorTokens
  | LiquidJsonValue[]
  | { [key: string]: LiquidJsonValue | undefined }
  | null;

export interface LiquidColorTokens {
  pageBackground: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  mutedText: string;
  border: string;
  accent: string;
  accentText: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
}

export interface LiquidColorScheme {
  light?: Partial<LiquidColorTokens>;
  dark?: Partial<LiquidColorTokens>;
}

export interface LiquidStyleMap {
  [cssProperty: string]: LiquidStyleValue;
}

export interface LiquidWidgetProps {
  theme?: LiquidThemeMode;
  colorScheme?: LiquidColorScheme;
  colorTokens?: LiquidColorTokens;
  className?: string;
  style?: LiquidStyleMap;
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidWidget {
  id: string;
  type: string;
  props: LiquidWidgetProps;
  children?: LiquidWidget[];
}

export interface LiquidLayout {
  columns: number;
  gap: number;
  theme?: LiquidThemeMode;
  colorScheme?: LiquidColorScheme;
  className?: string;
  style?: LiquidStyleMap;
}

export interface LiquidBlueprint {
  version: string;
  theme?: LiquidThemeMode;
  colorScheme?: LiquidColorScheme;
  layout: LiquidLayout;
  widgets: LiquidWidget[];
}