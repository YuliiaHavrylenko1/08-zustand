'use client';

import Link from 'next/link';
import styles from './SidebarNotes.module.css';

const tags = ['All', 'Work', 'Personal', 'Important'];

interface SidebarNotesProps {
  activeTag: string;
}

export default function SidebarNotes({ activeTag }: SidebarNotesProps) {
  return (
    <ul className={styles.menuList}>
      {tags.map(tag => (
        <li
          key={tag}
          className={`${styles.menuItem} ${activeTag === tag ? styles.active : ''}`}
        >
          <Link href={`/notes/filter/${tag}`}>
            <span className={styles.menuLink}>{tag}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
