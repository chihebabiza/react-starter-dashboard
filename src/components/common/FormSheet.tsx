import type { ReactNode } from "react";
import { Plus } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

type FormSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  triggerText?: string;
  showTrigger?: boolean;
  width?: string;
};

export function FormSheet({
  open,
  onOpenChange,
  children,
  triggerText,
  showTrigger = false,
  width = "30vw",
}: FormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && triggerText && (
        <SheetTrigger asChild>
          <Button>
            {triggerText}
            <Plus />
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        className="h-screen max-w-[90vw] overflow-y-auto"
        style={{ width }}
      >
        <SheetHeader />

        {children}

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
