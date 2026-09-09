import { Project } from './types';

export const musicDashboardProject: Project = {
  slug: 'music-dashboard',
  title: 'Music Dashboard',
  categories: ['Design', 'Development'],
  order: 4,
  seo: {
    title: 'Music Dashboard — Tresmind',
    description:
      'A dark-mode music analytics and streaming dashboard giving artists and labels real-time performance intelligence.',
  },
  featuredImage: '/images/projects/music-dashboard/music-dashboard.jpg',
  shortDescription:
    'A dark-mode streaming analytics platform giving artists and labels real-time performance intelligence.',
  hero: {
    image: '/images/projects/music-dashboard/music-dashboard.jpg',
  },
  overview: {
    description:
      'The Music Dashboard is a streaming analytics product built for independent artists, managers, and label teams. It aggregates data from multiple streaming platforms into a unified view — tracking plays, listener geography, revenue splits, playlist placements, and trending tracks — all within a visually rich dark-mode interface that feels native to the music world.',
    client: 'MusicStream Inc.',
    timeline: '12 Weeks',
    role: 'Product Design, Front-end Development, API Integration',
    liveUrl: 'https://example.com/music-dashboard',
  },
  challenge:
    'Artists and managers were drowning in separate platform dashboards, exporting CSVs manually, and losing hours each week to consolidating data. The product needed to feel as premium as the music it served — not another utility tool — while handling the complexity of multi-source data normalisation behind the scenes.',
  solution:
    'We built a unified data pipeline that normalises streaming metrics across Spotify, Apple Music, and YouTube, then surfaced the most actionable signals in a visually immersive dark interface. Interactive charts animate in response to date-range changes. A "Top Songs" panel updates in real time. The whole experience was designed to feel like a high-end mixing console — functional and beautiful.',
  gallery: [
    '/images/projects/music-dashboard/music-dashboard.jpg',
    '/images/projects/music-dashboard/music-dashboard.jpg',
    '/images/projects/music-dashboard/music-dashboard.jpg',
    '/images/projects/music-dashboard/music-dashboard.jpg',
  ],
  results: [
    { label: 'Streams Tracked Monthly', value: '3.4M+' },
    { label: 'Time Saved Per Artist / Week', value: '6 hrs' },
    { label: 'Platform Data Sources', value: '5' },
    { label: 'Artist Retention (90 days)', value: '88%' },
  ],
  technologies: ['React', 'TypeScript', 'Chart.js', 'Spotify API', 'Node.js', 'Figma'],
};
