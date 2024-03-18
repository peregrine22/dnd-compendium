import map from 'lodash/map';

import { SpellsList } from '@/components/SpellsList';
import { spellLevels } from '@/components/SpellsList/SpellsConstants';

export default function Home() {
  return (
    <main className="px-4 md:px-20 py-10">
      <div className="text-5xl">{`Mr. Peregrine's Wonders`}</div>
      <hr className="my-5 h-0.5 border-t-4 border-zinc-600 opacity-100 dark:opacity-50 dark:bg-indigo-700" />
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
    </main>
  );
}
