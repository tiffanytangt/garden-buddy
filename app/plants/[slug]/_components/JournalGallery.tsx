'use client';

import LightboxWrapper from '@/app/(shared)/_components/Lightbox';
import React from 'react';
import Image from 'next/image';
import { SlideImage } from 'yet-another-react-lightbox';
import { daysBetween } from '@/lib/util/daysBetween';

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
};

function JournalGallery({ entries }: Props) {
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);

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
          <div className="text-sm mt-1">
            {journalEntry.entryDate.toLocaleDateString()} (
            {daysBetween(journalEntry.entryDate, firstDate)} days)
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
