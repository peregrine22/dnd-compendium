import { PlayableClassName } from '@/types/classTypes';
import {
  SpellCastingTime,
  SpellClasses,
  SpellComponents,
  SpellConcentration,
  SpellDescription,
  SpellIndex,
  SpellLevel,
  SpellName,
  SpellSchool
} from '@/types/spellTypes';
import { gql } from 'graphql-request';

export interface SpellsQueryResponse {
  index: SpellIndex;
  level: SpellLevel;
  name: SpellName;
  desc: SpellDescription;
  school: SpellSchool;
  casting_time: SpellCastingTime;
  concentration: SpellConcentration;
  classes: SpellClasses;
  components: SpellComponents;
}

export const FETCH_SPELLS = gql`
  query Spells($limit: Int!, $order: SpellOrder, $level: IntFilter) {
    spells(limit: $limit, order: $order, level: $level) {
      index
      level
      name
      desc
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
