'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';
import type { Project } from '@/data/projects/types';

const Section = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ backgroundColor: tokens.color.neutral0, padding: `${theme.spacing(24)} 0`, [theme.breakpoints.down('md')]: { padding: `${theme.spacing(16)} 0` } }));
const Layout = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(260px, 0.7fr)', gap: theme.spacing(12), [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: theme.spacing(6) } }));
const SectionHeading = styled(Heading)(({ theme }) => ({ width: 'fit-content', maxWidth: '100%', fontSize: 48, letterSpacing: '-0.04em', lineHeight: 1.5, textTransform: 'none', marginBottom: theme.spacing(4), [theme.breakpoints.down('md')]: { fontSize: 34 } }));
const Description = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ color: tokens.color.neutral700, fontSize: 21, lineHeight: 1.75, maxWidth: '64ch', [theme.breakpoints.down('md')]: { fontSize: 18 } }));
const Details = styled(Box)<{ component?: React.ElementType }>({ margin: 0, borderTop: `2px solid ${tokens.color.uv800}` });
const Detail = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ padding: `${theme.spacing(2.5)} 0`, borderBottom: `1px solid ${tokens.color.borderSubtle}` }));
const Label = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ color: tokens.color.neutral600, fontSize: 14, marginBottom: theme.spacing(0.5) }));
const Value = styled(Typography)<{ component?: React.ElementType }>({ margin: 0, color: tokens.color.ink900, fontWeight: 600, lineHeight: 1.5 });
const LiveLink = styled('a')({ color: tokens.color.uv800, textDecoration: 'underline', textUnderlineOffset: '3px', '&:focus-visible': { outline: `2px solid ${tokens.color.uv800}`, outlineOffset: 3 } });

export default function ProjectOverview({ project }: { project: Project }) {
  const { overview } = project;
  const details = [
    { label: 'Client', value: overview.client },
    { label: 'Our role', value: overview.role },
    ...(overview.timeline ? [{ label: 'Timeline', value: overview.timeline }] : []),
  ];
  return (
    <Section component="section" aria-labelledby="project-overview-heading">
      <Container maxWidth="xl">
        <Layout data-case-reveal>
          <Box>
            <SectionHeading id="project-overview-heading" variant="h2">Project overview</SectionHeading>
            <Description>{overview.description}</Description>
          </Box>
          <Details component="dl">
            {details.map(detail => <Detail key={detail.label}>
              <Label component="dt">{detail.label}</Label>
              <Value component="dd">{detail.value}</Value>
            </Detail>)}
            {overview.liveUrl && <Detail>
              <Label component="dt">Live platform</Label>
              <Value component="dd"><LiveLink href={overview.liveUrl}>Visit {project.title}</LiveLink></Value>
            </Detail>}
          </Details>
        </Layout>
      </Container>
    </Section>
  );
}
