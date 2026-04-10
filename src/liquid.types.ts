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

export type LiquidDataPointer = `$global.${string}` | `$input.${string}` | `$page.${string}`;
export type LiquidDispatchType = 'action' | 'change' | 'input' | 'navigation' | 'refresh' | 'intent' | (string & {});

export interface LiquidDispatchEvent {
  type: LiquidDispatchType;
  payload?: LiquidJsonValue;
  widgetId?: string;
}

export type LiquidDispatch = (event: LiquidDispatchEvent) => void | Promise<void>;

export interface LiquidRendererRuntime {
  resolveDataPointer?: (pointer: LiquidDataPointer) => LiquidJsonValue | undefined;
  dispatch?: LiquidDispatch;
}

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
  widgetId?: string;
  dispatch?: LiquidDispatch;
  [key: string]: LiquidJsonValue | LiquidDispatch | undefined;
}

export interface LiquidWidget {
  id: string;
  type: string;
  props: LiquidWidgetProps;
  children?: LiquidWidget[];
}

export interface LiquidLayout {
  columns?: number;
  rows?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  padding?: LiquidStyleValue;
  margin?: LiquidStyleValue;
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