import bard from '../public/Bard.png';
import barbarian from '../public/Barbarian.png';
import cleric from '../public/Cleric.png';
import druid from '../public/Druid.png';
import fighter from '../public/Fighter.png';
import monk from '../public/Monk.png';
import paladin from '../public/Paladin.png';
import ranger from '../public/Ranger.png';
import rogue from '../public/Rogue.png';
import sorcerer from '../public/Sorcerer.png';
import warlock from '../public/Warlock.png';
import wizard from '../public/Wizard.png';

export enum PlayableClassName {
  BARBARIAN = 'Barbarian',
  BARD = 'Bard',
  CLERIC = 'Cleric',
  DRUID = 'Druid',
  FIGHTER = 'Fighter',
  MONK = 'Monk',
  PALADIN = 'Paladin',
  RANGER = 'Ranger',
  ROGUE = 'Rogue',
  SORCERER = 'Sorcerer',
  WARLOCK = 'Warlock',
  WIZARD = 'Wizard'
}

export const PlayableClassImage = {
  [PlayableClassName.BARBARIAN]: barbarian,
  [PlayableClassName.BARD]: bard,
  [PlayableClassName.CLERIC]: cleric,
  [PlayableClassName.DRUID]: druid,
  [PlayableClassName.FIGHTER]: fighter,
  [PlayableClassName.MONK]: monk,
  [PlayableClassName.PALADIN]: paladin,
  [PlayableClassName.RANGER]: ranger,
  [PlayableClassName.ROGUE]: rogue,
  [PlayableClassName.SORCERER]: sorcerer,
  [PlayableClassName.WARLOCK]: warlock,
  [PlayableClassName.WIZARD]: wizard
};
