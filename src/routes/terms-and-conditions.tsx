import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { legalDocs } from "@/lib/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  const { lang } = usePrefs();
  const doc = legalDocs.terms[lang];

  return <LegalPageLayout doc={doc} icon={FileText} />;
}

