import compact from 'lodash/compact';
import last from 'lodash/last';
import uniq from 'lodash/uniq';
import trim from 'lodash/trim';
import replace from 'lodash/replace';

export default function getQueryName(
  query: string,
  type: 'query' | 'mutation' = 'query'
) {
  const rawName = last(
    uniq(
      compact(
        query.match(new RegExp(String.raw`(${type}\s+[a-zA-Z0-9\s]+)[({]`))
      )
    )
  );
  const name = trim(replace(rawName, new RegExp(String.raw`${type}\s+`), ''));

  return { rawName, name };
}
