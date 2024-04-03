type SpellType = {
  level: number;
  color: string;
};

export const spellLevels: SpellType[] = [
  { level: 0, color: 'zinc' },
  { level: 1, color: 'orange' },
  { level: 2, color: 'amber' },
  { level: 3, color: 'lime' },
  { level: 4, color: 'green' },
  { level: 5, color: 'teal' },
  { level: 6, color: 'blue' },
  { level: 7, color: 'violet' },
  { level: 8, color: 'fuchsia' },
  { level: 9, color: 'red' }
];

export const colorVariants = {
  zinc: 'bg-zinc-50 border-zinc-400',
  amber: 'bg-amber-50 border-amber-400',
  orange: 'bg-orange-50 border-orange-300',
  lime: 'bg-lime-50 border-lime-400',
  green: 'bg-green-50 border-green-400',
  teal: 'bg-teal-50 border-teal-400',
  blue: 'bg-blue-50 border-blue-400',
  violet: 'bg-violet-50 border-violet-400',
  fuchsia: 'bg-fuchsia-50 border-fuchsia-400',
  red: 'bg-red-50 border-red-500'
};