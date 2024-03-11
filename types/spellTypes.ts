export type SpellIndex = string;
export type SpellName = string;
export type SpellLevel = number;
export type SpellMaterial = string;
export type SpellRitual = boolean;
export type SpellDescription = string[];

export type SpellSchool = {
  index: string;
  name: string;
  description: string;
};

export type SpellAoE = {
  size: number;
  type: string;
};

export type SpellCastingTime = number;
export type SpellClasses = {
  name: string;
}[];

export type SpellConcentration = boolean;
export type SpellComponents = string[];
export type SpellDuration = string;
