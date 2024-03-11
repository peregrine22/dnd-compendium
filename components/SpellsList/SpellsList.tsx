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
    initialLimit: 500,
    initialOrder: { by: 'LEVEL', direction: 'ASCENDING' }
  });

  return (
    <div>
      <h2 className="text-xl">
        {spellLevel === 0 ? 'Cantrips (0 level)' : `${spellLevel} Level`}
      </h2>
      <div className="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2 xl:grid-cols-3">
        {map(spellsData, (spell) => (
          <SpellCard
            spellName={spell.name}
            spellClasses={spell.classes}
            spellSchool={spell.school}
            spellLevel={spell.level}
          />
        ))}
      </div>
    </div>
  );
}

export default SpellsList;
