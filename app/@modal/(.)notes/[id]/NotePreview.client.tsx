// 'use client';

// import Modal from '@/components/Modal/Modal';
// import { useRouter } from 'next/navigation';
// import { Note } from '@/types/note';

// type Props = {
//   note: Note;
// };

// export default function NotePreviewClient({ note }: Props) {
//   const router = useRouter();

//   return (
//     <Modal onClose={() => router.back()}>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//     </Modal>
//   );
// }
'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

type Props = {
  noteId: string;
};

export default function NotePreviewClient({ noteId }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Failed to load the note.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
      <p>
        <strong>Created:</strong>{' '}
        {new Date(note.createdAt).toLocaleString()}
      </p>
    </Modal>
  );
}
