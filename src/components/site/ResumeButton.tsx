import { Download, FileText } from "lucide-react";
import { profile } from "@/data/portfolio";

type Variant = "primary" | "outline" | "compact";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors transition-opacity";

const variants: Record<Variant, string> = {
  primary: "bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90",
  outline: "border border-border px-6 py-3 text-sm hover:border-primary/60 hover:text-foreground",
  compact: "bg-primary px-3.5 py-1.5 text-sm text-primary-foreground hover:opacity-90",
};

/**
 * Resume link. When the CV asset is unavailable we fall back to LinkedIn so
 * the user always lands on a real, up-to-date profile instead of a 404.
 */
export function ResumeButton({
  variant = "primary",
  label,
  className = "",
  onClick,
}: {
  variant?: Variant;
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  const hasResume = Boolean(profile.resumeUrl);
  const href = hasResume ? profile.resumeUrl : profile.linkedin;
  const Icon = hasResume ? Download : FileText;
  const text = label ?? (hasResume ? "My Resume" : "View LinkedIn profile");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...(hasResume ? { download: "Prasad_Neje_CV.pdf" } : {})}
      onClick={onClick}
      title={hasResume ? "Download Prasad Neje's CV (PDF)" : "Resume unavailable — open LinkedIn"}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <Icon className="h-4 w-4" /> {text}
    </a>
  );
}
