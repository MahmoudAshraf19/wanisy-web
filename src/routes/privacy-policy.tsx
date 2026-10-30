import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { legalDocs } from "@/lib/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { lang } = usePrefs();
  const doc = legalDocs.privacy[lang];

  return <LegalPageLayout doc={doc} icon={ShieldCheck} />;
}

