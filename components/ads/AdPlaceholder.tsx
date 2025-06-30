import { cn } from '@/lib/utils';
import { Megaphone } from 'lucide-react';

type AdProps = {
  type: 'banner' | 'skyscraper' | 'box';
  className?: string;
};

export function AdPlaceholder({ type, className }: AdProps) {
  const adTypes = {
    banner: {
      style: 'h-24 w-full max-w-4xl',
      text: 'Banner Ad - 728 x 90',
    },
    skyscraper: {
      style: 'h-96 w-full',
      text: 'Skyscraper Ad - 160 x 600',
    },
    box: {
      style: 'h-64 w-64',
      text: 'Box Ad - 250 x 250',
    },
  };

  const selectedAd = adTypes[type];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-muted-foreground',
        selectedAd.style,
        className
      )}
    >
      <Megaphone className="h-8 w-8 mb-2" />
      <p className="text-sm font-medium">{selectedAd.text}</p>
      <p className="text-xs">(Advertisement)</p>
    </div>
  );
}