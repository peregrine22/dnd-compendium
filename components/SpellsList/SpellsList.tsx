'use client';

import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { usePreviousValue } from '@/utils/hooks/usePreviousValue';
import { useDraggableScroll } from '@/utils/hooks/useDraggableScroll';
import { useSpells } from '@/hooks/useSpells';

import { FETCH_SPELLS, SpellsQueryResponse } from '@/queries/fetchSpells.query';

import { SpellLevel, SpellName } from '@/types/spellTypes';

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
}

function SpellsList({ spellLevel, color, name }: SpellsListProps) {
  const { spells, filterSpells, spellsFilters } =
    useSpells<SpellsQueryResponse>({
      cacheKey: 'spells',
      query: FETCH_SPELLS,
      initialLimit: 24,
      initialFilters: { level: spellLevel },
      initialOrder: { by: 'NAME', direction: 'ASCENDING' }
    });

  const previousName = usePreviousValue(name);

  useEffect(() => {
    if (!isEqual(name, previousName)) {
      filterSpells({ ...spellsFilters, name });
    }
  }, [name, previousName]);

  const [ref] = useDraggableScroll();

  if (isEmpty(spells)) {
    return;
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
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <SpellCard
                  key={spell.index}
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
            <DialogContent className="z-10 flex flex-col bg-white dark:bg-gray-850 border dark:border-gray-800 border-transparent rounded-3xl sm:rounded-3xl shadow-xl max-h-full w-full sm:max-w-xl opacity-100">
              <DialogHeading className="flex-shrink px-4">
                <div className="flex border-b border-gray-300 dark:border-gray-700 py-4">
                  <h3 className="text-base sm:text-lg pl-8 text-center flex-1 truncate">
                    {spell.name}
                  </h3>
                </div>
              </DialogHeading>
              <DialogDescription className="flex-1 overflow-y-auto px-2">
                <div className="px-4">
                  <div className="space-y-6 mt-2">
                    {spell.desc}
                    <div className="sticky bottom-0 border-t dark:border-gray-700 p-4 pb-0 mt-4 -mx-4 bg-white dark:bg-gray-850 overflow-y-hidden overflow-x-auto flex space-x-3"></div>
                  </div>
                </div>
              </DialogDescription>
              <DialogClose className="flex-shrink">
                <div className="flex p-4 space-x-2 justify-end">Close</div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default SpellsList;
