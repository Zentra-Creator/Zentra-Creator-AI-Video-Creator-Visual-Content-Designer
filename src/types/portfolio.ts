export type ProjectCategory =
  | 'All'
  | 'AI Video'
  | 'Fashion'
  | 'Beauty'
  | 'Jewellery'
  | 'Product'
  | 'Lifestyle'
  | 'AI Images';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  secondaryCategories?: ProjectCategory[];
  description: string;
  thumbnail: string;
  aspectRatio: '16:9' | '4:5' | '1:1' | '4:3' | '9:16';
  isVideo: boolean;
  videoUrl?: string;
  videoDuration?: string;
  client?: string;
  year?: string;
  toolsUsed?: string[];
  deliverables?: string[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
  videoUrl?: string;
  videoLabel?: string;
  projectId?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  role: string;
  company: string;
  category: string;
}
