import { useRef, useEffect } from 'react';

function usePreviousValue<ValueType>(value: ValueType) {
  const ref = useRef<ValueType>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePreviousValue;
