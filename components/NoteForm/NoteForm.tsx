
'use client';

import { useState, useEffect } from 'react';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/lib/store/noteStore';

interface NoteFormProps {
  formAction: (formData: FormData) => Promise<void>;
}

export default function NoteForm({ formAction }: NoteFormProps) {
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState(draft.tag);

  
  useEffect(() => {
    setTitle(draft.title);
    setContent(draft.content);
    setTag(draft.tag);
  }, [draft]);

  const isValid =
    title.length >= 3 &&
    title.length <= 50 &&
    ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(tag);

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
    } else if (name === 'tag') {
      setTag(value);
      setDraft({ tag: value });
    }
  };

  return (
    <form className={css.form} action={formAction}>
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
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => history.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={!isValid}>
          Create note
        </button>
      </div>
    </form>
  );
}
