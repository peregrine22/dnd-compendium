import Image from 'next/image';
import React from 'react';
import wizard from '../../public/Wizard.png';

function SpellCard() {
  return (
    <div className="p-4 flex flex-col shadow-md rounded-lg gap-y-4 cursor-pointer hover:shadow-xl transition-shadow">
      <div className="flex space-x-4 items-center">
        <div className="border-4 border-indigo-900 rounded-full w-12 h-12 flex justify-center items-center">
          <h1 className="text-center">0</h1>
        </div>
        <div>
          <p className="text-sm text-zinc-400">spell school</p>
          <h1 className="text-xl text-zinc-900">Spell Name</h1>
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
          <Image
            className="h-12 w-12 rounded-full"
            src={wizard}
            width="120"
            height="120"
            alt="class"
          />
        </div>
      </div>
    </div>
  );
}

export default SpellCard;
