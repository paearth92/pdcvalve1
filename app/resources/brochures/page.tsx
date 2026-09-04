import { generateCategoryMetadata, renderCategoryPage } from '@/components/resources/CategoryPageView';

export function generateMetadata() {
  return generateCategoryMetadata('brochures');
}

export default function BrochuresPage() {
  return renderCategoryPage({ category: 'brochures' });
}
