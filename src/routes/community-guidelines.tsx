import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { legalDocs } from "@/lib/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/community-guidelines")({
  component: CommunityGuidelinesPage,
});

function CommunityGuidelinesPage() {
  const { lang } = usePrefs();
  const doc = legalDocs.guidelines[lang];

  return <LegalPageLayout doc={doc} icon={Heart} />;
}

