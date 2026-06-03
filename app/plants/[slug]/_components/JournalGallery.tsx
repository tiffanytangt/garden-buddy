'use client';

import LightboxWrapper from '@/app/(shared)/_components/Lightbox';
import React from 'react';
import Image from 'next/image';
import { SlideImage } from 'yet-another-react-lightbox';
import { daysBetween } from '@/lib/util/daysBetween';
import { usePathname, useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteJournalEntry } from '@/app/journal/_actions/deleteJournalEntry';
import EditJournalEntryModal from './EditJournalEntryModal';

type Props = {
  entries: {
    id: number;
    entryDate: Date;
    description: string;
    journalEntryPhotos: {
      photoId: number;
      photo: {
        id: number;
        location: string;
      };
    }[];
  }[];
  highlightEntryId?: number;
};

function JournalGallery({ entries, highlightEntryId }: Props) {
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);

  // Scroll a just-added entry into view, then strip ?newEntry so a refresh
  // doesn't re-trigger it.
  const newEntryRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleting, startDelete] = React.useTransition();

  const handleDelete = (id: number) => {
    if (!confirm("Delete this journal entry? This can't be undone.")) return;
    startDelete(async () => {
      await deleteJournalEntry(id);
      router.refresh();
    });
  };
  React.useEffect(() => {
    if (!highlightEntryId) return;
    newEntryRef.current?.scrollIntoView({ behavior: 'smooth' });
    const timeout = setTimeout(() => router.replace(pathname), 2500);
    return () => clearTimeout(timeout);
  }, [highlightEntryId, router, pathname]);

  const images = entries.reduce(
    (acc, journalEntry) => {
      return [
        ...acc,
        ...journalEntry.journalEntryPhotos.map((journalEntryPhoto) => ({
          id: journalEntryPhoto.photoId,
          src: journalEntryPhoto.photo.location,
          alt: journalEntry.description || `Photo on ${journalEntry.entryDate}`,
        })),
      ];
    },
    [] as (SlideImage & { id: number })[]
  );

  const firstDate = entries[entries.length - 1]?.entryDate;
  return (
    <>
      {entries.map((journalEntry) => (
        <div
          key={`journal-entry-${journalEntry.id}`}
          ref={journalEntry.id === highlightEntryId ? newEntryRef : undefined}
          className="bg-white dark:bg-opacity-25 p-2 rounded-md"
        >
          <div className="flex gap-2 items-end justify-center">
            {journalEntry.journalEntryPhotos.map((journalEntryPhoto) => (
              <div
                key={`journal-entry-photo-${journalEntryPhoto.photoId}`}
                className="aspect-square size-full overflow-hidden"
              >
                <Image
                  width={500}
                  height={500}
                  className="relative top-1/2 transform -translate-y-1/2 cursor-pointer"
                  src={journalEntryPhoto.photo.location}
                  alt={`Photo on ${journalEntry.entryDate}`}
                  onClick={() => {
                    setCurrentImage(
                      images.findIndex(
                        (image) => image.id === journalEntryPhoto.photoId
                      )
                    );
                    setIsGalleryOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="italic">{journalEntry.description}</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-sm">
              {journalEntry.entryDate.toLocaleDateString()} (
              {daysBetween(journalEntry.entryDate, firstDate)} days)
            </div>
            <div className="flex items-center gap-3">
              <EditJournalEntryModal entry={journalEntry} />
              <button
                type="button"
                aria-label="Delete journal entry"
                disabled={isDeleting}
                onClick={() => handleDelete(journalEntry.id)}
                className="text-gray-400 transition-colors hover:text-red-600 disabled:opacity-50"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <LightboxWrapper
        isOpen={isGalleryOpen}
        initialIndex={currentImage}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
      />
    </>
  );
}

export default JournalGallery;
