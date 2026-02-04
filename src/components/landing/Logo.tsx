import logoImage from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <img
      src={logoImage}
      alt="Operação Copa"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
}
