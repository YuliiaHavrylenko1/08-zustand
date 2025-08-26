'use client';

interface Props {
  error: Error;  
}

export default function NoteError({ error }: Props) {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
