import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";

interface BottomSheetProps extends DialogProps {
  children: React.ReactNode;
  content: React.ReactNode;
  bottomContent?: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  title: React.ReactNode;
  description?: string;
}

export default function BottomSheet({
  children,
  content,
  bottomContent,
  onOpenChange,
  title,
  description,
  ...props
}: BottomSheetProps) {
  const side = "bottom";
  return (
    <Sheet key={side} onOpenChange={onOpenChange} {...props}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side={side}
        className="h-3/4 rounded-t-lg overflow-auto max-h-[75%]"
      >
        <SheetHeader>
          <SheetTitle className="tracking-tight text-center mt-4">
            {title}
          </SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {content}
        <div className="flex flex-col justify-end h-inherit">
          <SheetFooter>{bottomContent}</SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
