import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children?: ReactNode;
};

export function FormField({
  label,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="grid gap-3">
      <Label>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>

      {children ?? <Input />}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
