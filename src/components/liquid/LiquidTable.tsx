import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidPrimitive, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidTableProps extends LiquidWidgetProps {
  columns: string[];
  rows: Array<Record<string, LiquidPrimitive>>;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidTable({
  columns,
  rows,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidTableProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`overflow-hidden rounded-xl border ${className}`}
      style={{
        border: `1px solid ${tokens.border}`,
        borderRadius: 12,
        backgroundColor: tokens.surface,
        ...(style as CSSProperties | undefined),
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  fontSize: 12,
                  color: tokens.mutedText,
                  borderBottom: `1px solid ${tokens.border}`,
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`row-${index}`}>
              {columns.map((column) => (
                <td key={`${index}-${column}`} style={{ padding: '10px 12px', borderBottom: `1px solid ${tokens.border}` }}>
                  <span style={{ color: tokens.text, fontSize: 14 }}>{String(row[column] ?? '')}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
