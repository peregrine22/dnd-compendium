import map from 'lodash/map';

import { SpellsList } from '@/components/SpellsList';
import { spellLevels } from '@/components/SpellsList/SpellsConstants';

export default function Home() {
  return (
    <div>
      <div className="items-center space-y-4">
        <p className="text-2xl font-semibold">Spells</p>
        <div>
          <input
            className="bg-zinc-100 rounded-md px-2 border border-zinc-200 placeholder:text-zinc-400 py-2 focus:outline-none"
            placeholder="Spell name"
          />
        </div>
      </div>
      <div className="py-4">
        {map(spellLevels, (spellLevel) => (
          <SpellsList
            key={spellLevel.level}
            spellLevel={spellLevel.level}
            color={spellLevel.color}
          />
        ))}
      </div>
    </div>
  );
}
