import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug ?? [];
  const tag = slugArray.length > 0 ? slugArray[0] : 'All';

  const filterTag = tag === 'All' ? undefined : tag;

  const { notes, totalPages } = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: filterTag,
  });

  return (
    <NotesClient
      notes={notes}
      totalPages={totalPages}
      activeTag={tag}
    />
  );
}
