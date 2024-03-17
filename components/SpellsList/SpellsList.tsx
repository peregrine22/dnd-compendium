'use client';

import map from 'lodash/map';

import { SpellLevel } from '@/types/spellTypes';

import { FETCH_SPELLS, SpellsQueryResponse } from '@/queries/fetchSpells.query';

import { useSpells } from '@/hooks/useSpells';

import { SpellCard } from '../SpellCard';

interface SpellsListProps {
  spellLevel: SpellLevel;
}

function SpellsList({ spellLevel }: SpellsListProps) {
  const { spellsData } = useSpells<SpellsQueryResponse>({
    cacheKey: 'spells',
    query: FETCH_SPELLS,
    initialLimit: 24,
    initialFilters: { level: spellLevel },
    initialOrder: { by: 'NAME', direction: 'ASCENDING' }
  });

  return (
    <div className="py-8">
      <h2 className="text-xl">
        {spellLevel === 0 ? 'Cantrips (0 level)' : `${spellLevel} Level`}
      </h2>
      {/* <div className="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2 xl:grid-cols-3"> */}
      <div className="flex overflow-x-scroll w-full gap-5 pt-5">
        {map(spellsData, (spell) => (
          <SpellCard
            spellName={spell.name}
            spellDescription={spell.desc}
            spellClasses={spell.classes}
            spellSchool={spell.school}
            spellLevel={spell.level}
            spellCastingTime={spell.casting_time}
          />
        ))}
      </div>
    </div>
  );
}

export default SpellsList;
