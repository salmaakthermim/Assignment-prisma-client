'use server';

import { TProject } from '@/zod/project.typeschema';

const projects: TProject[] = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
    thumbnailUrl: '/placeholder.svg?height=300&width=500',
    liveUrl: 'https://example.com',
    projectUrl: 'https://github.com/username/project',
    features: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'Tailwind CSS'],
  },
  {
    id: 2,
    name: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    thumbnailUrl: '/placeholder.svg?height=300&width=500',
    liveUrl: 'https://example.com',
    projectUrl: 'https://github.com/username/project',
    features: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description:
      'A responsive weather dashboard that displays current conditions, forecasts, and interactive maps using multiple weather APIs.',
    thumbnailUrl: '/placeholder.svg?height=300&width=500',
    liveUrl: 'https://example.com',
    projectUrl: 'https://github.com/username/project',
    features: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Mapbox', 'PWA'],
  },
  {
    id: 4,
    name: 'Social Media Analytics',
    description:
      'An analytics platform for social media managers to track engagement, growth metrics, and content performance across platforms.',
    thumbnailUrl: '/placeholder.svg?height=300&width=500',
    liveUrl: 'https://example.com',
    projectUrl: 'https://github.com/username/project',
    features: ['React', 'D3.js', 'Express', 'PostgreSQL', 'Redis'],
  },
];

export async function GetAllProjectsAction() {
  return projects;
}
