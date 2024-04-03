'use client';

import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { usePreviousValue } from '@/utils/hooks/usePreviousValue';
import { useDraggableScroll } from '@/utils/hooks/useDraggableScroll';
import { useSpells } from '@/hooks/useSpells';

import { SpellClass, SpellLevel, SpellName } from '@/types/spellTypes';

import { FETCH_SPELLS, SpellsQueryResponse } from '@/queries/fetchSpells.query';

import { SpellCard } from '../SpellCard';

import { Dialog } from '../helpers/Dialog/components/Dialog';
import { DialogTrigger } from '../helpers/Dialog/components/DialogTrigger';
import { DialogContent } from '../helpers/Dialog/components/DialogContent';
import { DialogHeading } from '../helpers/Dialog/components/DialogHeading';
import { DialogDescription } from '../helpers/Dialog/components/DialogDescription';
import { DialogClose } from '../helpers/Dialog/components/DialogClose';

interface SpellsListProps {
  spellLevel: SpellLevel;
  color: string;
  name?: SpellName;
  spellClass?: SpellClass;
}

function SpellsList({ spellLevel, color, name, spellClass }: SpellsListProps) {
  const { spells, filterSpells, spellsFilters, spellsLoading, spellsFetched } =
    useSpells<SpellsQueryResponse>({
      cacheKey: 'spells',
      query: FETCH_SPELLS,
      initialLimit: 24,
      initialFilters: { level: spellLevel },
      initialOrder: { by: 'NAME', direction: 'ASCENDING' }
    });

  const { ref, isDragging } = useDraggableScroll();

  const previousName = usePreviousValue(name);
  const previousClass = usePreviousValue(spellClass);

  useEffect(() => {
    if (!isEqual(name, previousName)) {
      filterSpells({ ...spellsFilters, name });
    }

    if (!isEqual(spellClass, previousClass)) {
      filterSpells({
        ...spellsFilters,
        class: spellClass == '' ? null : spellClass
      });
    }
  }, [name, previousName, spellClass, previousClass]);

  if (isEmpty(spells) && !spellsFetched) {
    return <div className="">Loading...</div>;
  }

  if (isEmpty(spells) && spellsFetched) {
    return <div className="">No results...</div>;
  }

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold">
        {spellLevel === 0 ? 'Cantrips' : `${spellLevel} Level`}
      </h2>

      <div
        className="flex overflow-auto w-full gap-3 py-8 no-scrollbar"
        ref={ref}
      >
        {map(spells, (spell) => (
          <Dialog key={spell.index} enabled={!isDragging}>
            <DialogTrigger asChild>
              <div>
                <SpellCard
                  spellName={spell.name}
                  spellDescription={spell.desc}
                  spellClasses={spell.classes}
                  spellSchool={spell.school}
                  spellLevel={spell.level}
                  spellCastingTime={spell.casting_time}
                  color={color}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="z-10 flex flex-col bg-white dark:bg-zinc-850 border dark:border-zinc-800 border-transparent rounded-2xl shadow-xl h-96 sm:h-[550px] w-full sm:max-w-md opacity-100">
              <DialogHeading className="flex-shrink p-2">
                <div className="flex border-2 rounded-xl border-indigo-900 dark:border-zinc-700 py-4">
                  <div className="text-base sm:text-2xl pl-8 text-center flex-1 truncate">
                    {spell.name}
                  </div>
                </div>
              </DialogHeading>
              <DialogDescription className="flex-1 overflow-y-auto px-2 text-base sm:text-xl cursor-default">
                <div className="mt-4 text-sm sm:text-base text-center items-center flex-1 border-2 rounded-xl p-2 border-indigo-900 dark:border-zinc-700">
                  <div className="flex justify-center space-x-3">
                    <div className="font-semibold">Lv. {spell.level}</div>
                    <div className="font-semibold">{spell.school.name}</div>
                    <div className="flex">
                      <span className="font-semibold pr-1">Range:</span>
                      {spell.range}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold pr-1">Cast time:</span>
                    {spell.casting_time}
                  </div>
                  <div>
                    <span className="font-semibold pr-1">Duration:</span>
                    {spell.duration}
                  </div>
                  <div>
                    <span className="font-semibold pr-1">Components:</span>
                    {spell.components}
                  </div>
                </div>
                <div className="my-2 border-2 border-indigo-900 dark:border-zinc-700 rounded-xl px-8">
                  <div className="space-y-6 mt-2">{spell.desc}</div>
                  {spell.higher_level ? (
                    <div className="my-2">
                      <div className="font-bold">At Higher Levels:</div>
                      <div className="space-y-6">{spell.higher_level}</div>
                    </div>
                  ) : null}
                </div>
              </DialogDescription>
              <DialogClose className="flex justify-end text-base sm:text-xl">
                <div className="flex p-4 space-x-2 cursor-pointer ">Close</div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default SpellsList;
