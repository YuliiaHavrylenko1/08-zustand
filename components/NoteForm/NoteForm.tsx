'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import { Note, NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<NoteTag>(draft.tag as NoteTag);

  useEffect(() => {
    setTitle(draft.title);
    setContent(draft.content);
    setTag(draft.tag as NoteTag);
  }, [draft]);

  const validTags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  const isValid =
    title.length >= 3 &&
    title.length <= 50 &&
    validTags.includes(tag);

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      await createNote(noteData);
    },
    onSuccess: () => {
      setDraft({ title: '', content: '', tag: 'Todo' });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
      setDraft({ title: value });
    } else if (name === 'content') {
      setContent(value);
      setDraft({ content: value });
    } else if (name === 'tag' && validTags.includes(value as NoteTag)) {
      const v = value as NoteTag;
      setTag(v);
      setDraft({ tag: v });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      await mutateAsync({ title, content, tag });
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={handleChange}
          required
        >
          {validTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={!isValid || isPending}>
          {isPending ? 'Creating note...' : 'Create note'}
        </button>
      </div>

      {isError && (
        <div className={css.error}>
          <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      )}
    </form>
  );
}
