import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { legalDocs } from "@/lib/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/child-safety")({
  component: ChildSafetyPage,
});

function ChildSafetyPage() {
  const { lang } = usePrefs();
  const doc = legalDocs.childSafety[lang];

  return <LegalPageLayout doc={doc} icon={Shield} />;
}

