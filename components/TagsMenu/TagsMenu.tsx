'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './TagsMenu.module.css';

const tags = ['All', 'Work', 'Personal', 'Important']; // заміни на свої

export default function TagsMenu() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.menuContainer}>
      <button className={styles.menuButton} onClick={handleToggle}>
        Notes ▾
      </button>
      {open && (
        <ul className={styles.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={styles.menuItem}>
              <Link
                href={
                  tag === 'All'
                    ? '/notes/filter/All'
                    : `/notes/filter/${tag}`
                }
                className={styles.menuLink}
                onClick={handleClose}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
