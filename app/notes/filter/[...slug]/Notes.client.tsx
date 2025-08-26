'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';

import css from './Notes.module.css';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

type FetchNotesResp = {
  notes: Note[];
  totalPages: number;
};

type Props = {
  notes: Note[];
  totalPages: number;
  activeTag: string;  
};

export default function NotesClient({ notes: initialNotes, totalPages: initialTotalPages, activeTag }: Props) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(activeTag);

  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentTag(activeTag);
    setPage(1);
    setSearchQuery('');
    setInputValue('');
  }, [activeTag]);

  const { data, isLoading, isError } = useQuery<FetchNotesResp>({
    queryKey: ['notes', page, debouncedSearch, currentTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch || undefined,
        tag: currentTag && currentTag !== 'All' ? currentTag : undefined,
      }),
    initialData:
      page === 1 && debouncedSearch === '' && (currentTag === 'All' || !currentTag)
        ? {
            notes: initialNotes,
            totalPages: initialTotalPages,
          }
        : undefined,
    staleTime: 5000,
  });

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    setSearchQuery(value);
    setPage(1);
  };

  const handleNoteCreate = () => {
    setPage(1);
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <h2>Notes for tag: {currentTag}</h2>

      {isLoading && <p>Loading, please wait...</p>}

      {isError && (
        <>
          <p className={css.error}>Failed to load notes. Please try again.</p>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ['notes'] })
            }
          >
            Try again ...
          </button>
        </>
      )}

      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {!isLoading && !isError && notes.length === 0 && (
        <p>No notes found for this filter.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={handleNoteCreate}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
