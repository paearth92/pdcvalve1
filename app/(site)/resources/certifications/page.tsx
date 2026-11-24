import { generateCategoryMetadata, renderCategoryPage } from '@/components/resources/CategoryPageView';

export function generateMetadata() {
  return generateCategoryMetadata('certifications');
}

export default function CertificationsPage() {
  return renderCategoryPage({ category: 'certifications' });
}
