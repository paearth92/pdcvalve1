import { generateCategoryMetadata, renderCategoryPage } from '@/components/resources/CategoryPageView';

export function generateMetadata() {
  return generateCategoryMetadata('manuals');
}

export default function ManualsPage() {
  return renderCategoryPage({ category: 'manuals' });
}
