import { useCallback, useEffect, useState } from 'react';

const useDraggableScroll = () => {
  const [node, setNode] = useState<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const ref = useCallback((node: HTMLDivElement) => {
    setNode(node);
  }, []);

  const handleMouseDown = useCallback<(e: MouseEvent) => void>(
    (e) => {
      e.preventDefault();

      if (!node) {
        return;
      }

      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: e.clientX,
        y: e.clientY
      };

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
        setIsDragging(true);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [node]
  );

  useEffect(() => {
    if (!node) {
      return;
    }

    node.addEventListener('mousedown', handleMouseDown);

    return () => {
      node.removeEventListener('mousedown', handleMouseDown);
    };
  }, [node]);

  return { ref, isDragging };
};

export default useDraggableScroll;
