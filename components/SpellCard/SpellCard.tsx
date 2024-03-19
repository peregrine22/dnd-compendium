import cl from 'classnames';
import Image from 'next/image';
import map from 'lodash/map';

import {
  SpellCastingTime,
  SpellClasses,
  SpellDescription,
  SpellLevel,
  SpellName,
  SpellSchool
} from '@/types/spellTypes';
import { PlayableClassImage } from '@/types/classTypes';
import Tooltip from '../helpers/Tooltip/Tooltip';
import { TooltipTrigger } from '../helpers/Tooltip/components/TooltipTrigger';
import { TooltipContent } from '../helpers/Tooltip/components/TooltipContent';

interface SpellCardProps {
  spellName: SpellName;
  spellSchool: SpellSchool;
  spellLevel: SpellLevel;
  spellClasses: SpellClasses;
  spellDescription: SpellDescription;
  spellCastingTime: SpellCastingTime;
  color?: string;
}

const colorVariants = {
  zinc: 'bg-zinc-50 border-zinc-400',
  amber: 'bg-amber-50 border-amber-400',
  orange: 'bg-orange-50 border-orange-300',
  lime: 'bg-lime-50 border-lime-400',
  green: 'bg-green-50 border-green-400',
  teal: 'bg-teal-50 border-teal-400',
  blue: 'bg-blue-50 border-blue-400',
  violet: 'bg-violet-50 border-violet-400',
  fuchsia: 'bg-fuchsia-50 border-fuchsia-400',
  red: 'bg-red-50 border-red-500'
};

function SpellCard({
  spellClasses,
  spellName,
  spellSchool,
  spellLevel,
  spellDescription,
  spellCastingTime,
  color = 'zinc'
}: SpellCardProps) {
  return (
    <div
      className={cl(
        ' border-4 p-4 rounded-xl cursor-pointer w-[200px] h-[250px] md:w-[300px] md:h-[400px] shrink-0 hover:shadow-xl transition-transform ease-in-out hover:origin-center hover:-rotate-3 duration-300',
        `${colorVariants[color]}`
      )}
    >
      <div className="flex space-x-4 items-center">
        <div className="border-4 border-indigo-900 rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center">
          <h1 className="text-center text-xs md:text-lg">{spellLevel}</h1>
        </div>
        <div>
          <p className="text-sm text-zinc-400">{spellSchool?.name}</p>
          <h1 className="text-xl text-zinc-900">{spellName}</h1>
        </div>
      </div>
      <h1 className="py-2 line-clamp-3 text-gray-500 text-left ">
        {spellDescription[0]}
      </h1>
      <div className="flex items-center justify-start w-full">
        <div className="bg-gray-100 rounded-full max-w-[60%]">
          <h1 className="px-3 my-2 text-xs font-light line-clamp-1">
            Casting time: {spellCastingTime}
          </h1>
        </div>
      </div>
      <div className="flex gap-x-2 justify-start">
        {map(spellClasses, (spellClass) => (
          <Tooltip placement="bottom">
            <TooltipTrigger asChild>
              <Image
                key={spellClass.name}
                className="h-12 w-12 rounded-full"
                src={PlayableClassImage[spellClass.name]}
                width="120"
                height="120"
                alt="class"
              />
              <TooltipContent className='bg-indigo-900 rounded-full px-4 text-white'>{spellClass.name}</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default SpellCard;
