import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Copy, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { appConfigs } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface AccountDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
}

const accountDetails: AccountDetails[] = [
  {
    bankName: "Union Bank Account",
    accountName: appConfigs.name,
    accountNumber: "0011990973",
    swiftCode: "CMBKUS33",
  },
  {
    bankName: "First Bank",
    accountName: appConfigs.name + "Cooperative Account",
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

export function DonationDialog() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The account number has been copied to your clipboard.",
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full">
          Donate Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Donation Account Details</DialogTitle>
          <DialogDescription>
            Thank you for considering a donation to our community. Your support
            makes a difference!
          </DialogDescription>
        </DialogHeader>
        <Carousel className="w-full max-w-[90%] mx-auto">
          <CarouselContent>
            {accountDetails.map((account, index) => (
              <CarouselItem key={index}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium col-span-3">
                      {account.bankName}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Name:</span>
                    <span className="col-span-3">{account.accountName}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Account:</span>
                    <span className="col-span-2">{account.accountNumber}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(account.accountNumber)}
                      aria-label="Copy account number"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">SWIFT:</span>
                    <span className="col-span-3">{account.swiftCode}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>For international transfers, please use the SWIFT code.</p>
        </div>
        <div className="bg-muted p-3 rounded-md text-sm">
          <strong>Note:</strong> Your donation helps us continue our community
          development efforts. We appreciate your generosity and support. For
          any questions about donations, please contact our finance team.
        </div>
      </DialogContent>
    </Dialog>
  );
}
