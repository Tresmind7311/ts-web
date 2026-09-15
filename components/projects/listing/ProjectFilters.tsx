'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';

import type { SvgIconComponent } from '@mui/icons-material';
import { ProjectCategory } from '@/data/projects/types';

const ALL_CATEGORIES: ProjectCategory[] = [
  'Design',
  'Development',
  'Digital Marketing',
  'SEO',
];

const CATEGORY_ICONS: Record<ProjectCategory, SvgIconComponent> = {
  Design: DesignServicesOutlinedIcon,
  Development: LanguageOutlinedIcon,
  'Digital Marketing': CampaignOutlinedIcon,
  SEO: ManageSearchOutlinedIcon,
};

const FilterWrap = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

const ACTIVE_COLOR = '#071463';

const Pill = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',

  padding: '14px 28px',
  borderRadius: '22px',

  border: `2px solid ${active
      ? ACTIVE_COLOR
      : 'rgba(7, 20, 99, 0.25)'
    }`,

  background: 'transparent',

  color: active
    ? ACTIVE_COLOR
    : 'rgba(7, 20, 99, 0.32)',

  fontSize: '1rem',
  fontWeight: 500,
  fontFamily: 'inherit',

  cursor: 'pointer',

  transition:
    'border-color 200ms ease, color 200ms ease, background-color 200ms ease',

  '& .MuiSvgIcon-root': {
    width: '26px',
    height: '26px',
    flexShrink: 0,
  },

  '&:hover': {
    borderColor: ACTIVE_COLOR,
    color: ACTIVE_COLOR,
  },

  '&:focus-visible': {
    outline: `2px solid ${ACTIVE_COLOR}`,
    outlineOffset: '3px',
  },
}));

interface Props {
  active: ProjectCategory[];
  onChange: (cats: ProjectCategory[]) => void;
}

export default function ProjectFilters({
  active,
  onChange,
}: Props) {
  function toggle(cat: ProjectCategory) {
    if (active.includes(cat)) {
      onChange(active.filter((c) => c !== cat));
    } else {
      onChange([...active, cat]);
    }
  }

  return (
    <FilterWrap>
      {ALL_CATEGORIES.map((cat) => {
        const Icon = CATEGORY_ICONS[cat];
        const isActive = active.includes(cat);

        return (
          <Pill
            key={cat}
            type="button"
            active={isActive}
            onClick={() => toggle(cat)}
            aria-pressed={isActive}
          >
            <Icon aria-hidden="true" />
            <span>{cat}</span>
          </Pill>
        );
      })}
    </FilterWrap>
  );
}