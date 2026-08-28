export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  interactive?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
  level?: number; // percentage or rating if we want to show progress bars
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // spam protection honeypot
}
