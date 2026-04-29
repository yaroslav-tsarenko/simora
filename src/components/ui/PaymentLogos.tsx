import Image from 'next/image';

export function PaymentLogos() {
  return (
    <div className="flex items-center gap-3">
      <Image src="/cards/visa.svg" alt="Visa" width={52} height={32} className="h-8 w-auto" />
      <Image src="/cards/mastercard.svg" alt="Mastercard" width={52} height={32} className="h-8 w-auto" />
      <Image src="/cards/pci-dss.svg" alt="PCI DSS Compliant" width={64} height={38} className="h-8 w-auto" />
    </div>
  );
}
