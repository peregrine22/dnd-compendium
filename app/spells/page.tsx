'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import map from 'lodash/map';

import { SpellsList } from '@/components/SpellsList';
import { spellLevels } from '@/components/SpellsList/SpellsConstants';

export default function Spells() {
  const [spellName, setSpellName] = useState('');

  const handleOnChange = useCallback<
    (e: ChangeEvent<HTMLInputElement>) => void
  >(
    (event) => {
      setSpellName(event.target.value);
    },
    [spellName, setSpellName]
  );

  return (
    <div>
      <div className="items-center space-y-4">
        <p className="text-2xl font-semibold">Spells</p>
        <div>
          <input
            className="bg-zinc-100 rounded-md px-2 border border-zinc-200 placeholder:text-zinc-400 py-2 focus:outline-none"
            placeholder="Spell name"
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="py-4">
        {map(spellLevels, (spellLevel) => (
          <SpellsList
            key={spellLevel.level}
            spellLevel={spellLevel.level}
            color={spellLevel.color}
            name={spellName}
          />
        ))}
      </div>
    </div>
  );
}
