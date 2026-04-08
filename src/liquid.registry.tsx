import type { ComponentType } from 'react';

import { LiquidAlert } from './components/liquid/LiquidAlert';
import { LiquidAvatarChip } from './components/liquid/LiquidAvatarChip';
import { LiquidBadge } from './components/liquid/LiquidBadge';
import { LiquidButton } from './components/liquid/LiquidButton';
import { LiquidContainer } from './components/liquid/LiquidContainer';
import { LiquidDivider } from './components/liquid/LiquidDivider';
import { LiquidEmptyState } from './components/liquid/LiquidEmptyState';
import { LiquidIconLabel } from './components/liquid/LiquidIconLabel';
import { LiquidInput } from './components/liquid/LiquidInput';
import { LiquidKeyValueList } from './components/liquid/LiquidKeyValueList';
import { LiquidList } from './components/liquid/LiquidList';
import { LiquidMetricGrid } from './components/liquid/LiquidMetricGrid';
import { LiquidProgressCard } from './components/liquid/LiquidProgressCard';
import { LiquidSectionHeader } from './components/liquid/LiquidSectionHeader';
import { LiquidSelect } from './components/liquid/LiquidSelect';
import { LiquidStatCard } from './components/liquid/LiquidStatCard';
import { LiquidStatGroup } from './components/liquid/LiquidStatGroup';
import { LiquidTable } from './components/liquid/LiquidTable';
import { LiquidTabs } from './components/liquid/LiquidTabs';
import { LiquidTextBlock } from './components/liquid/LiquidTextBlock';
import { LiquidTimeline } from './components/liquid/LiquidTimeline';
import { LiquidToolbar } from './components/liquid/LiquidToolbar';
import { LiquidTrendCard } from './components/liquid/LiquidTrendCard';

export const ComponentRegistry: Record<string, ComponentType<any>> = {
  alert: LiquidAlert,
  avatar_chip: LiquidAvatarChip,
  badge: LiquidBadge,
  stat_card: LiquidStatCard,
  button: LiquidButton,
  container: LiquidContainer,
  divider: LiquidDivider,
  empty_state: LiquidEmptyState,
  icon_label: LiquidIconLabel,
  input: LiquidInput,
  key_value_list: LiquidKeyValueList,
  list: LiquidList,
  metric_grid: LiquidMetricGrid,
  progress_card: LiquidProgressCard,
  section_header: LiquidSectionHeader,
  select: LiquidSelect,
  stat_group: LiquidStatGroup,
  table: LiquidTable,
  tabs: LiquidTabs,
  text_block: LiquidTextBlock,
  timeline: LiquidTimeline,
  toolbar: LiquidToolbar,
  trend_card: LiquidTrendCard,
};