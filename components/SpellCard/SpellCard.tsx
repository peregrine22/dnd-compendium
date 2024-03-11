import Image from 'next/image';
import { map } from 'lodash';

import {
  SpellClasses,
  SpellLevel,
  SpellName,
  SpellSchool
} from '@/types/spellTypes';
import { PlayableClassImage } from '@/types/classTypes';

interface SpellCardOptions {
  spellName: SpellName;
  spellSchool: SpellSchool;
  spellLevel: SpellLevel;
  spellClasses: SpellClasses;
}

function SpellCard({
  spellClasses,
  spellName,
  spellSchool,
  spellLevel
}: SpellCardOptions) {
  return (
    <div className="p-4 flex flex-col shadow-md rounded-lg gap-y-4 cursor-pointer hover:shadow-xl transition-shadow">
      <div className="flex space-x-4 items-center">
        <div className="border-4 border-indigo-900 rounded-full w-12 h-12 flex justify-center items-center">
          <h1 className="text-center">{spellLevel}</h1>
        </div>
        <div>
          <p className="text-sm text-zinc-400">{spellSchool?.name}</p>
          <h1 className="text-xl text-zinc-900">{spellName}</h1>
        </div>
      </div>
      <h1 className="line-clamp-3 text-gray-500 text-left flex-grow">
        Spell Text
      </h1>
      <div className="flex items-center justify-between gap-x-2 w-full self-end">
        <div className="bg-gray-100 rounded-full max-w-[60%]">
          <h1 className="px-3 my-2 text-xs font-light line-clamp-1">Action</h1>
        </div>
        <div className="flex gap-x-2 justify-end">
          {map(spellClasses, (spellClass) => (
            <Image
              key={spellClass.name}
              className="h-12 w-12 rounded-full"
              src={PlayableClassImage[spellClass.name]}
              width="120"
              height="120"
              alt="class"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpellCard;
