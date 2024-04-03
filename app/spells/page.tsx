'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import map from 'lodash/map';
import Select from 'react-select';

import { SpellsList } from '@/components/SpellsList';

import { spellLevels } from '@/components/SpellsList/SpellsConstants';
import { DndClassesSelectOptions } from '@/types/classTypes';

export default function Spells() {
  const [spellName, setSpellName] = useState('');
  const [spellClass, setSpellClass] = useState(null);

  const handleOnSpellNameChange = useCallback<
    (e: ChangeEvent<HTMLInputElement>) => void
  >(
    (event) => {
      setSpellName(event.target.value);
    },
    [spellName, setSpellName]
  );

  const handleSelectSpell = useCallback<
    (selectedSpell: { value: string; label: string }) => void
  >(
    (selectedSpell) => {
      if (selectedSpell) {
        setSpellClass(selectedSpell.value);
      } else {
        setSpellClass(null);
      }
    },
    [spellClass, setSpellClass]
  );

  return (
    <div>
      <div className="items-center space-y-4">
        <p className="text-2xl font-semibold">Spells</p>
        <div className="flex-grid sm:space-x-4 sm:flex items-center">
          <input
            className="bg-zinc-100 rounded-md px-2 py-2 border border-zinc-200 placeholder:text-zinc-400  focus:outline-none w-full sm:w-64"
            placeholder="Spell name"
            onChange={handleOnSpellNameChange}
          />
          <div className="mt-2 sm:mt-0 w-full h-full sm:w-64">
            <Select
              classNamePrefix="dnd"
              instanceId="spells"
              options={DndClassesSelectOptions}
              onChange={handleSelectSpell}
              placeholder="Select a class..."
              isClearable
            />
          </div>
        </div>
      </div>
      <div className="py-4">
        {map(spellLevels, (spellLevel) => (
          <SpellsList
            key={spellLevel.level}
            spellLevel={spellLevel.level}
            color={spellLevel.color}
            name={spellName}
            spellClass={spellClass}
          />
        ))}
      </div>
    </div>
  );
}
