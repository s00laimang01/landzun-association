import { ReactNode } from "react";
import { Copy } from "lucide-react";
import { Button, buttonVariants, type ButtonProps } from "@/components/ui/button";
import {
  MorphContent,
  MorphDialog,
  MorphTrigger,
} from "@/components/ui/morph-dialog";
import { useToast } from "@/hooks/use-toast";
import { appConfigs } from "@/lib/data";
import { cn } from "@/lib/utils";

interface AccountDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
}

const accountDetails: AccountDetails[] = [
  {
    bankName: "Union Bank",
    accountName: appConfigs.name,
    accountNumber: "0011990973",
    swiftCode: "CMBKUS33",
  },
  {
    bankName: "First Bank",
    accountName: `${appConfigs.name} Cooperative Account`,
    accountNumber: "2016504587",
    swiftCode: "CITIUS33",
  },
  {
    bankName: "Unity Bank",
    accountName: appConfigs.name,
    accountNumber: "0009558616",
    swiftCode: "GLBLUS33",
  },
];

/** A button that morphs into the bank-details panel. */
export function DonationDialog({
  children = "Donate",
  className,
  variant,
  size,
}: {
  children?: ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Account number copied",
        description: `${bank} · ${text}`,
      });
    });
  };

  return (
    <MorphDialog>
      <MorphTrigger className={cn(buttonVariants({ variant, size }), className)}>
        {children}
      </MorphTrigger>

      <MorphContent
        title="Donate by bank transfer"
        description="Bank accounts of the association for donations."
        className="max-w-xl"
      >
        <div className="p-6 sm:p-8">
          <div aria-hidden="true">
            <p className="eyebrow">Support the association</p>
            <p className="mt-2 font-serif text-3xl">Donate by bank transfer</p>
            <p className="prose-lada mt-3">
              Transfers may be made to any of the association's accounts
              below. For questions about a donation, please contact the finance
              secretary.
            </p>
          </div>

          <ul className="mt-6 divide-y divide-border border-y border-border">
            {accountDetails.map((account) => (
              <li key={account.accountNumber} className="py-4">
                <p className="eyebrow">{account.bankName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {account.accountName}
                </p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="font-serif text-2xl tabular-nums tracking-wide">
                    {account.accountNumber}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(account.accountNumber, account.bankName)
                    }
                  >
                    <Copy />
                    Copy
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  SWIFT {account.swiftCode} · for international transfers
                </p>
              </li>
            ))}
          </ul>
        </div>
      </MorphContent>
    </MorphDialog>
  );
}
