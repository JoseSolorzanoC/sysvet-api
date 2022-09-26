interface FuseNavigationItem {
  id: string;
  title: string;
  type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
  icon: string;
  link: string;
}

export interface Navigation {
  compact: FuseNavigationItem[];
  default: FuseNavigationItem[];
  futuristic: FuseNavigationItem[];
  horizontal: FuseNavigationItem[];
}

export const USER_OPTIONS = ['turnos', 'mascotas', 'mi_informacion'];
export const DOCTOR_OPTIONS = [
  'turnos',
  'mascotas',
  'consulta',
  'mi_informacion',
  'productos',
];
export const ADMIN_OPTIONS = [
  'turnos',
  'mascotas',
  'medicos',
  'mi_informacion',
  'productos',
];

export const navigationData: FuseNavigationItem[] = [
  {
    id: 'turnos',
    title: 'Turnos',
    type: 'basic',
    icon: 'mat_outline:assignment_turned_in',
    link: '/turnos',
  },
  {
    id: 'mascotas',
    title: 'Mascotas',
    type: 'basic',
    icon: 'mat_outline:pets',
    link: '/mascotas',
  },
  {
    id: 'medicos',
    title: 'Medicos',
    type: 'basic',
    icon: 'mat_outline:health_and_safety',
    link: '/medicos',
  },
  {
    id: 'consulta',
    title: 'Consulta',
    type: 'basic',
    icon: 'mat_outline:medical_services',
    link: '/consulta-medica',
  },
  {
    id: 'usuarios_admin',
    title: 'Usuarios y Administracion',
    type: 'basic',
    icon: 'mat_outline:admin_panel_settings',
    link: '/usuarios-admin',
  },
  {
    id: 'mi_informacion',
    title: 'Mi informacion',
    type: 'basic',
    icon: 'mat_outline:info',
    link: '/mi-informacion',
  },
  {
    id: 'productos',
    title: 'Productos',
    type: 'basic',
    icon: 'mat_outline:inventory',
    link: '/productos',
  },
];
