import React, { useMemo, useRef } from "react";
import useIsOverflow from "../../hooks/useIsOverflow";

interface ReadMoreTextProps {
  text?: string | null;
  maxLines: 1 | 2 | 3 | 4 | 5 | 6;
  collapseDefault?: boolean;
  className?: string;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = ({
  text,
  maxLines,
  collapseDefault = true,
  className,
}) => {
  const overflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow({
    ref: overflowRef,
    isVerticalOverflow: true,
  });
  const [isCollapsed, setIsCollapsed] = React.useState(collapseDefault);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const maxLinesClass = useMemo(() => {
    switch (maxLines) {
      case 1:
        return "line-clamp-1";
      case 2:
        return "line-clamp-2";
      case 3:
        return "line-clamp-3";
      case 4:
        return "line-clamp-4";
      case 5:
        return "line-clamp-5";
      case 6:
        return "line-clamp-6";
    }
  }, [maxLines]);

  return (
    text && (
      <div className="text-foreground font-thin leading-7.5 text-xl flex flex-col items-start overflow-auto">
        <p
          ref={overflowRef}
          className={` ${className} ${
            isCollapsed ? `${maxLinesClass} !h-full` : ""
          } `}
        >
          {text}
        </p>
        {(isOverflow || !isCollapsed) && (
          <p
            className="leading-7.5 underline cursor-pointer text-base"
            onClick={toggleCollapse}
          >
            {isCollapsed ? "עוד" : "פחות"}
          </p>
        )}
      </div>
    )
  );
};

export default ReadMoreText;
