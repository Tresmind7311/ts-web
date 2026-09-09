'use client';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ProjectCategory } from '@/data/projects/types';

const ALL_CATEGORIES: ProjectCategory[] = ['Design', 'Development', 'Digital Marketing', 'SEO'];

const CATEGORY_ICONS: Record<ProjectCategory, string> = {
  Design: '✦',
  Development: '⬡',
  'Digital Marketing': '◈',
  SEO: '◎',
};

const FilterWrap = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

const Pill = styled('button')<{ active: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 18px',
  borderRadius: '999px',
  border: `1.5px solid ${active ? theme.palette.primary.main : 'rgba(0,0,0,0.18)'}`,
  background: active ? theme.palette.primary.main : 'transparent',
  color: active ? '#fff' : theme.palette.text.primary,
  fontSize: '0.85rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    color: active ? '#fff' : theme.palette.primary.main,
  },
}));

interface Props {
  active: ProjectCategory[];
  onChange: (cats: ProjectCategory[]) => void;
}

export default function ProjectFilters({ active, onChange }: Props) {
  function toggle(cat: ProjectCategory) {
    if (active.includes(cat)) {
      onChange(active.filter((c) => c !== cat));
    } else {
      onChange([...active, cat]);
    }
  }

  return (
    <FilterWrap>
      {ALL_CATEGORIES.map((cat) => (
        <Pill key={cat} active={active.includes(cat)} onClick={() => toggle(cat)}>
          <span style={{ fontSize: '0.7rem' }}>{CATEGORY_ICONS[cat]}</span>
          {cat}
        </Pill>
      ))}
    </FilterWrap>
  );
}
