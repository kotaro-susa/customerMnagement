"use client";

import { ReactNode, useState } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";

type ResizableSidebarProps = {
  children: ReactNode;
};

const ResizableSidebar = ({
  children,
}: {
  children: ResizableSidebarProps;
}) => {
  const [width, setWidth] = useState(200);
  const onResize = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setWidth(data.size.width);
  };
  return (
    <ResizableBox
      width={width}
      height={Infinity}
      handle={<div className="w-10 bg-red-500 cursor-col-resize p-2" />}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <div className="border border-solid border-gray-300 p-10 overflow-hidden">
        {children}
      </div>
    </ResizableBox>
  );
};

export default ResizableSidebar;
