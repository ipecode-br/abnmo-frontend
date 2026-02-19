export const SECTION_TITLES = {
  default: 'Visão geral',
  pacientes: 'Pacientes',
  atendimentos: 'Atendimentos',
  encaminhamentos: 'Encaminhamentos',
  aprovacoes: 'Aprovações',
  equipe: 'Equipe',
  configuracoes: 'Configurações',
  perfil: 'Meu perfil',
  menu: 'Menu',
}
export type SectionTitle = keyof typeof SECTION_TITLES
