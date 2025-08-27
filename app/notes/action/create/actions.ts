'use server';

import { redirect } from 'next/navigation';
import { createNote } from '@/lib/api';
import { revalidatePath } from 'next/cache';

type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

function isNoteTag(tag: string): tag is NoteTag {
  return ["Todo", "Work", "Personal", "Meeting", "Shopping"].includes(tag);
}

export async function handleCreateNote(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const tag = formData.get('tag');

  if (
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    typeof tag !== 'string' ||
    !isNoteTag(tag)
  ) {
    throw new Error('Invalid form data');
  }

  await createNote({ title, content, tag });

  revalidatePath('/notes'); 
  redirect('/notes'); 
}
