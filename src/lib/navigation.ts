import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Map,
  Mountain,
  Route,
  BookOpen,
  Users,
  MoreHorizontal,
  Calendar,
  Palette,
  TreePine,
  Globe,
  User,
  Building2,
  MapPin,
  Landmark,
  Star,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

export const EVENTS_SECTION = {
  title: 'Культурный код «Хэжэнгэ»',
  description: 'Праздники и традиции Кижингинского района',
  eyebrow: 'Культурный код',
} as const;

export const mainNav: NavItem[] = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/map/', label: 'Карта', icon: Map },
  { href: '/places/', label: 'Места', icon: Mountain },
  { href: '/routes/', label: 'Маршруты', icon: Route },
  { href: '/events/', label: EVENTS_SECTION.title, icon: Calendar },
  { href: '/culture/', label: 'Культура', icon: Palette },
  { href: '/nature/', label: 'Природа', icon: TreePine },
  { href: '/panoramas/', label: 'Панорамы', icon: Globe },
  { href: '/history/', label: 'История', icon: BookOpen },
  { href: '/people/', label: 'Люди', icon: Users },
  { href: '/museums/', label: 'Музеи', icon: Building2, description: '7 музеев района' },
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
  icon: LucideIcon;
}

export const homeQuickActions: QuickAction[] = [
  { href: '/map/', label: 'Карта района', description: 'Интерактивная карта', icon: Map },
  { href: '/places/', label: 'Найти место', description: '11 достопримечательностей', icon: MapPin },
  { href: '/museums/', label: 'Музеи', description: '7 музеев района', icon: Landmark },
  { href: '/events/', label: EVENTS_SECTION.title, description: EVENTS_SECTION.description, icon: Calendar },
  { href: '/culture/', label: 'Культура', description: 'Традиции и легенды', icon: Palette },
  { href: '/nature/', label: 'Природа', description: 'Горы, реки, степь', icon: TreePine },
  { href: '/panoramas/', label: 'Панорамы', description: 'Широкие виды мест', icon: Globe },
  { href: '/routes/', label: 'Маршруты', description: '3 готовых маршрута', icon: Route },
  { href: '/profile/', label: 'Профиль', description: 'Избранное и прогресс', icon: Star },
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
