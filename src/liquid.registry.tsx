import type { ComponentType } from 'react';

import { LiquidButton } from './components/liquid/LiquidButton';
import { LiquidContainer } from './components/liquid/LiquidContainer';
import { LiquidStatCard } from './components/liquid/LiquidStatCard';

export const ComponentRegistry: Record<string, ComponentType<any>> = {
  stat_card: LiquidStatCard,
  button: LiquidButton,
  container: LiquidContainer,
};