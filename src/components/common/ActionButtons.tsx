import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActionButton = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  destructive?: boolean;
  className?: string;
};

type ActionButtonsProps = {
  actions: ActionButton[];
};

export function ActionButtons({ actions }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <button
              type="button"
              title={action.label}
              aria-label={action.label}
              onClick={action.onClick}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                action.className ?? ""
              }`}
            >
              {action.icon}
            </button>
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
