'use client';

import { SpellCard } from '@/components/SpellCard';
import { useSpells } from '@/hooks/useSpells';
import { FETCH_SPELLS } from '@/queries/fetchSpells.query';

export default function Home() {
  const { spellsData } = useSpells({ query: FETCH_SPELLS });

  console.log(spellsData);

  return (
    <main className="px-4 md:px-20 py-10">
      <div className="text-5xl">{`Mr. Peregrine's Wonders`}</div>
      <hr className="my-5 h-0.5 border-t-4 border-zinc-600 opacity-100 dark:opacity-50 dark:bg-indigo-700" />
      <div className="items-center space-y-4">
        <p className="text-2xl">Spells</p>
        <div className="">
          <input
            className="bg-zinc-100 rounded-md px-2 placeholder:text-zinc-300 py-2 focus:outline-none"
            placeholder="Spell name"
          />
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-xl">Cantrips (0 level)</h2>
        <div className="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2 xl:grid-cols-3">
          <SpellCard />
          <SpellCard />
          <SpellCard />
        </div>
      </div>
    </main>
  );
}
