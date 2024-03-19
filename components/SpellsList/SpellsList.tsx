'use client';

import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

import { SpellLevel, SpellName } from '@/types/spellTypes';

import { FETCH_SPELLS, SpellsQueryResponse } from '@/queries/fetchSpells.query';

import { useSpells } from '@/hooks/useSpells';

import { SpellCard } from '../SpellCard';
import { usePreviousValue } from '@/utils/usePreviousValue';
import { useEffect } from 'react';
import { isEqual } from 'lodash';

interface SpellsListProps {
  spellLevel: SpellLevel;
  color: string;
  name?: SpellName;
}

function SpellsList({ spellLevel, color, name }: SpellsListProps) {
  console.log('name', name);
  const { spells, filterSpells, spellsFilters } =
    useSpells<SpellsQueryResponse>({
      cacheKey: 'spells',
      query: FETCH_SPELLS,
      initialLimit: 24,
      initialFilters: { level: spellLevel },
      initialOrder: { by: 'NAME', direction: 'ASCENDING' }
    });

  const previousName = usePreviousValue(name);

  useEffect(() => {
    if (!isEqual(name, previousName)) {
      filterSpells({ ...spellsFilters, name });
    }
  }, [name, previousName]);

  if (isEmpty(spells)) {
    return;
  }

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold">
        {spellLevel === 0 ? 'Cantrips' : `${spellLevel} Level`}
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
