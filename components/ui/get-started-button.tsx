import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type GetStartedButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  size?: ButtonProps["size"];
  disabled?: boolean;
  layout?: "default" | "inline";
};

export function GetStartedButton({
  children = "Get Started",
  onClick,
  type = "button",
  className,
  size = "lg",
  disabled,
  layout = "default",
}: GetStartedButtonProps) {
  if (layout === "inline") {
    return (
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "group relative h-14 shrink-0 !justify-start overflow-hidden rounded-none",
          "pl-5 pr-[3.25rem] text-base font-medium leading-none sm:min-w-[12.5rem] sm:pl-6 sm:pr-14",
          className,
        )}
      >
        <span className="relative z-0 whitespace-nowrap transition-opacity duration-500 group-hover:opacity-0">
          {children}
        </span>
        <i className="absolute bottom-1 right-1 top-1 z-10 flex w-11 items-center justify-center rounded-md bg-primary-foreground/15 transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </i>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      size={size}
      disabled={disabled}
      className={cn("group relative overflow-hidden rounded-xl", className)}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {children}
      </span>
      <i className="absolute right-1 top-1 bottom-1 z-10 grid w-1/4 place-items-center rounded-sm bg-primary-foreground/15 text-black-500 transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
