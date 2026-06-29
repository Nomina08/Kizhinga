import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Map,
  Mountain,
  Route,
  BookOpen,
  Users,
  Image,
  Info,
  MoreHorizontal,
  Calendar,
  Palette,
  TreePine,
  Globe,
  User,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export const mainNav: NavItem[] = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/map/', label: 'Карта', icon: Map },
  { href: '/places/', label: 'Места', icon: Mountain },
  { href: '/routes/', label: 'Маршруты', icon: Route },
  { href: '/events/', label: 'События', icon: Calendar },
  { href: '/culture/', label: 'Культура', icon: Palette },
  { href: '/nature/', label: 'Природа', icon: TreePine },
  { href: '/panoramas/', label: '360°', icon: Globe },
  { href: '/history/', label: 'История', icon: BookOpen },
  { href: '/people/', label: 'Люди', icon: Users },
  { href: '/gallery/', label: 'Галерея', icon: Image },
  { href: '/about/', label: 'О районе', icon: Info },
  { href: '/profile/', label: 'Профиль', icon: User },
];

export const bottomNav: NavItem[] = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/map/', label: 'Карта', icon: Map },
  { href: '/places/', label: 'Места', icon: Mountain },
  { href: '/routes/', label: 'Маршруты', icon: Route },
  { href: '__more__', label: 'Ещё', icon: MoreHorizontal },
];

export interface QuickAction {
  href: string;
  label: string;
  description: string;
  emoji: string;
  gradient: string;
}

export const homeQuickActions: QuickAction[] = [
  { href: '/map/', label: 'Карта района', description: 'Интерактивная карта', emoji: '🗺', gradient: 'from-blue-600 to-indigo-700' },
  { href: '/places/', label: 'Найти место', description: '6 достопримечательностей', emoji: '📍', gradient: 'from-emerald-600 to-teal-700' },
  { href: '/events/', label: 'События', description: 'Праздники и фестивали', emoji: '📅', gradient: 'from-violet-600 to-purple-700' },
  { href: '/culture/', label: 'Культура', description: '8 тем о традициях', emoji: '🎭', gradient: 'from-purple-600 to-violet-700' },
  { href: '/nature/', label: 'Природа', description: 'Горы, реки, степь', emoji: '🏔', gradient: 'from-stone-600 to-stone-800' },
  { href: '/panoramas/', label: '360° тур', description: 'Панорамы мест', emoji: '🎥', gradient: 'from-buryat-green to-emerald-800' },
  { href: '/routes/', label: 'Маршруты', description: '3 готовых маршрута', emoji: '🚗', gradient: 'from-amber-600 to-orange-700' },
  { href: '/profile/', label: 'Профиль', description: 'Избранное и прогресс', emoji: '⭐', gradient: 'from-rose-600 to-pink-700' },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/' || pathname === '';
  }
  const normalized = href.replace(/\/$/, '');
  return pathname === normalized || pathname.startsWith(`${normalized}/`);
}

export const moreNavItems = mainNav.filter(
  (item) => !bottomNav.some((b) => b.href === item.href) && item.href !== '__more__'
);
