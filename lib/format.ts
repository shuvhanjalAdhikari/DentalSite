import { siteConfig } from '@/site.config';

export function formatPrice(amount: number | null): string {
  if (amount === null) return 'Ask for a written estimate';
  const formatted = new Intl.NumberFormat('en-IN').format(amount);
  return `from ${siteConfig.currency} ${formatted}`;
}
