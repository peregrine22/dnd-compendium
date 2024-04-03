import cl from 'classnames';
import Image from 'next/image';
import map from 'lodash/map';
import { FloatingDelayGroup } from '@floating-ui/react';

import {
  SpellCastingTime,
  SpellClasses,
  SpellDescription,
  SpellLevel,
  SpellName,
  SpellSchool
} from '@/types/spellTypes';
import { PlayableClassImage } from '@/types/classTypes';

import { Tooltip } from '../helpers/Tooltip';

import { TooltipTrigger } from '../helpers/Tooltip/components/TooltipTrigger';
import { TooltipContent } from '../helpers/Tooltip/components/TooltipContent';
import React from 'react';
import { colorVariants } from '../SpellsList/SpellsConstants';

interface SpellCardProps {
  spellName: SpellName;
  spellSchool: SpellSchool;
  spellLevel: SpellLevel;
  spellClasses: SpellClasses;
  spellDescription: SpellDescription;
  spellCastingTime: SpellCastingTime;
  color?: string;
}

const SpellCard = React.forwardRef(function SpellCard(
  {
    spellClasses,
    spellName,
    spellSchool,
    spellLevel,
    spellDescription,
    spellCastingTime,
    color = 'zinc'
  }: SpellCardProps,
  propRef
) {
  return (
    <div
      className={cl(
        'flex flex-col border-4 p-4 rounded-xl cursor-pointer w-[200px] h-[270px] md:w-[300px] md:h-[400px] shrink-0 hover:shadow-xl transition-transform ease-in-out hover:origin-center hover:-rotate-3 duration-300',
        `${colorVariants[color]}`
      )}
    >
      <div className="flex space-x-4 pb-4">
        <div className="flex items-center">
          <div className="flex border-4 border-indigo-900 rounded-full w-8 h-8 md:w-12 md:h-12 justify-center items-center text-lg md:text-xl">
            {spellLevel}
          </div>
        </div>
        <div>
          <div className="text-sm md:text-base text-zinc-400">
            {spellSchool?.name}
          </div>
          <div className="text-lg md:text-2xl text-zinc-900">{spellName}</div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="line-clamp-1 md:line-clamp-3 py-2 text-zinc-900 text-left text-lg">
          <span>{spellDescription[0]}</span>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <div className="flex items-center justify-start bg-indigo-900 rounded-full">
          <div className="text-white px-3 md:px-4 my-2 text-xs md:text-base font-light line-clamp-1">
            <span>Casting time: {spellCastingTime}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-x-2 items-center justify-end">
          {map(spellClasses, (spellClass) => (
            <FloatingDelayGroup delay={300} key={spellClass.name}>
              <Tooltip placement="bottom">
                <TooltipTrigger asChild>
                  <Image
                    className="w-8 h-8 md:h-12 md:w-12 rounded-full"
                    src={PlayableClassImage[spellClass.name]}
                    width="120"
                    height="120"
                    alt={spellClass.name}
                  />
                  <TooltipContent className="bg-indigo-900 rounded-full px-4 text-white">
                    {spellClass.name}
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </FloatingDelayGroup>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SpellCard;
