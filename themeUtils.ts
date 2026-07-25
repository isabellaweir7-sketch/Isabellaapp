import { ProfileTheme } from '../types';

export const PASTEL_THEMES = [
  { id: 'blush-pink', name: 'Blush Pink', color: '#FDF2F4', accentColor: '#FB7185' },
  { id: 'soft-lavender', name: 'Soft Lavender', color: '#F3E8FF', accentColor: '#A855F7' },
  { id: 'soft-mint', name: 'Soft Mint', color: '#ECFDF5', accentColor: '#10B981' },
  { id: 'buttercream', name: 'Buttercream', color: '#FEFCE8', accentColor: '#EAB308' },
  { id: 'sky-cloud', name: 'Sky Cloud', color: '#EFF6FF', accentColor: '#3B82F6' },
  { id: 'peach-sorbet', name: 'Peach Sorbet', color: '#FFF7ED', accentColor: '#F97316' },
];

export const PROFILE_PATTERNS = [
  { id: 'solid', name: 'Clean Solid', icon: '✨', levelRequired: 1 },
  { id: 'y2k-hearts', name: 'Y2K Hearts 💕', icon: '💖', levelRequired: 1 },
  { id: 'pastel-waves', name: 'Pastel Waves 🌊', icon: '🎨', levelRequired: 1 },
  { id: 'starry-sky', name: 'Starry Sky 💫', icon: '✨', levelRequired: 2 },
  { id: 'cherry-blossom', name: 'Cherry Blossom 🌸', icon: '🌺', levelRequired: 2 },
  { id: 'glitter', name: 'Glitter Sunset 🪩', icon: '✨', levelRequired: 3 },
  { id: 'ribbon-stripe', name: 'Ribbon Stripes 🎀', icon: '🎀', levelRequired: 3 },
];

export function getPatternStyle(pattern: string, color: string): { background: string; className: string } {
  switch (pattern) {
    case 'y2k-hearts':
      return {
        background: `radial-gradient(circle at 15% 15%, rgba(251, 113, 133, 0.15) 0%, transparent 20%), radial-gradient(circle at 85% 85%, rgba(168, 85, 247, 0.15) 0%, transparent 25%), ${color}`,
        className: 'bg-y2k-hearts',
      };
    case 'pastel-waves':
      return {
        background: `linear-gradient(135deg, ${color} 0%, #FFFFFF 50%, ${color} 100%)`,
        className: 'bg-pastel-waves',
      };
    case 'starry-sky':
      return {
        background: `radial-gradient(ellipse at top, ${color} 0%, #FFFFFF 100%)`,
        className: 'bg-starry-sky',
      };
    case 'cherry-blossom':
      return {
        background: `linear-gradient(180deg, ${color} 0%, #FFF5F7 100%)`,
        className: 'bg-cherry-blossom',
      };
    case 'glitter':
      return {
        background: `linear-gradient(45deg, ${color} 0%, #FFF0F5 50%, #F3E8FF 100%)`,
        className: 'bg-glitter-sparkle',
      };
    case 'ribbon-stripe':
      return {
        background: `repeating-linear-gradient(45deg, ${color}, ${color} 15px, #FFFFFF 15px, #FFFFFF 30px)`,
        className: 'bg-ribbon-stripe',
      };
    case 'solid':
    default:
      return {
        background: color,
        className: 'bg-solid',
      };
  }
}
