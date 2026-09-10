import type { ReactNode } from "react";

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
        <button
          key={action.label}
          type="button"
          title={action.label}
          onClick={action.onClick}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            action.className ?? ""
          }`}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}
