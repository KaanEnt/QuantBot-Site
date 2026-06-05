import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type GetStartedButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  size?: ButtonProps["size"];
};

export function GetStartedButton({
  children = "Get Started",
  onClick,
  type = "button",
  className,
  size = "lg",
}: GetStartedButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      size={size}
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
