import styles from './Not-found.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
export const metadata = {
  title: 'Page Not Found — NoteHub',
  description: 'The page you are looking for does not exist or has been moved.',
  openGraph: {
    title: 'Page Not Found — NoteHub',
    description: 'The page you are looking for does not exist or has been moved.',
    url: 'https://your-deployed-app.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 Open Graph Image',
      },
    ],
  },
};
