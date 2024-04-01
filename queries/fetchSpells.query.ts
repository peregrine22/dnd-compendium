import { gql } from 'graphql-request';

import {
  SpellCastingTime,
  SpellClasses,
  SpellComponents,
  SpellConcentration,
  SpellDescription,
  SpellDescriptionHigherLevels,
  SpellDuration,
  SpellIndex,
  SpellLevel,
  SpellName,
  SpellRange,
  SpellSchool
} from '@/types/spellTypes';

export interface SpellsQueryResponse {
  index: SpellIndex;
  level: SpellLevel;
  name: SpellName;
  desc: SpellDescription;
  higher_level: SpellDescriptionHigherLevels;
  school: SpellSchool;
  casting_time: SpellCastingTime;
  concentration: SpellConcentration;
  classes: SpellClasses;
  duration: SpellDuration;
  range: SpellRange;
  components: SpellComponents;
}

export const FETCH_SPELLS = gql`
  query Spells(
    $limit: Int!
    $order: SpellOrder
    $level: IntFilter
    $name: String
  ) {
    spells(limit: $limit, order: $order, level: $level, name: $name) {
      index
      level
      name
      desc
      higher_level
      material
      ritual
      school {
        desc
        index
        name
      }
      area_of_effect {
        size
        type
      }
      casting_time
      classes {
        name
      }
      damage {
        damage_at_character_level {
          damage
          level
        }
        damage_at_slot_level {
          damage
          level
        }
        damage_type {
          desc
          name
          index
        }
      }
      concentration
      components
      duration
      higher_level
      range
    }
  }
`;
