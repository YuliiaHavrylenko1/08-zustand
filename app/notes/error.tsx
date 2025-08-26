'use client'; 

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function NotesError({ error, reset }: ErrorProps) {
 
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
