import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { legalDocs } from "@/lib/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { AccountDeletionForm } from "@/components/legal/AccountDeletionForm";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/delete-account")({
  component: DeleteAccountPage,
});

function DeleteAccountPage() {
  const { lang } = usePrefs();
  const doc = legalDocs.deletion[lang];

  return (
    <LegalPageLayout
      doc={doc}
      icon={Trash2}
      extraContent={<AccountDeletionForm />}
    />
  );
}

