'use client';

import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

import { SpellLevel } from '@/types/spellTypes';
import { FetchItemsFilters } from '@/types';

import { FETCH_SPELLS, SpellsQueryResponse } from '@/queries/fetchSpells.query';

import { useSpells } from '@/hooks/useSpells';

import { SpellCard } from '../SpellCard';
import { useEffect } from 'react';

interface SpellsListProps {
  spellLevel: SpellLevel;
  color: string;
}

function SpellsList({ spellLevel, color }: SpellsListProps) {
  const initialFilters = {
    level: spellLevel
  };

  const { spells, filterSpells, spellsFilters } =
    useSpells<SpellsQueryResponse>({
      cacheKey: 'spells',
      query: FETCH_SPELLS,
      initialLimit: 24,
      initialFilters,
      initialOrder: { by: 'NAME', direction: 'ASCENDING' }
    });

  if (isEmpty(spells)) {
    return;
  }
  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold">
        {spellLevel === 0 ? 'Cantrips (0 level)' : `${spellLevel} Level`}
      </h2>
      <div className="flex overflow-auto w-full gap-3 py-8 no-scrollbar">
        {map(spells, (spell) => (
          <SpellCard
            key={spell.index}
            spellName={spell.name}
            spellDescription={spell.desc}
            spellClasses={spell.classes}
            spellSchool={spell.school}
            spellLevel={spell.level}
            spellCastingTime={spell.casting_time}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}

export default SpellsList;
