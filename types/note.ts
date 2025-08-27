
export interface Note{
    id: string;
    title: string;
    description?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';