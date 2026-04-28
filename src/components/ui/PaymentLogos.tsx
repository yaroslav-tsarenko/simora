import Image from 'next/image';

export function PaymentLogos() {
  return (
    <div className="flex items-center gap-4">
      <Image src="/cards/visa.svg" alt="Visa" width={48} height={30} />
      <Image src="/cards/mastercard.svg" alt="Mastercard" width={48} height={30} />
      <Image src="/cards/3ds.svg" alt="PCI 3DS Secure" width={48} height={30} />
    </div>
  );
}
