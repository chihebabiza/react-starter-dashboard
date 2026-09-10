import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type FormSubmitButtonProps = {
  isPending?: boolean;
  disabled?: boolean;
  pendingText?: string;
  children?: ReactNode;
};

export function FormSubmitButton({
  isPending = false,
  disabled = false,
  pendingText = "Saving...",
  children = "Save",
}: FormSubmitButtonProps) {
  return (
    <div className="px-4 pt-6">
      <Button className="w-full" type="submit" disabled={disabled || isPending}>
        {isPending ? pendingText : children}
      </Button>
    </div>
  );
}
