import { BarChart3, Building2, Calendar, Map, Users, type LucideIcon } from 'lucide-react';

export const districtStatIconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  users: Users,
  map: Map,
  building: Building2,
};

export function getDistrictStatIcon(key: string): LucideIcon {
  return districtStatIconMap[key] ?? BarChart3;
}
