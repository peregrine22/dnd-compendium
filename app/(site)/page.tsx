import { SpellsList } from '@/components/SpellsList';

export default function Home() {
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
        <SpellsList spellLevel={0} />
      </div>
    </main>
  );
}
