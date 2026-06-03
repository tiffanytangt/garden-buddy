export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center py-24">
      <div
        role="status"
        aria-label="Loading"
        className="size-10 animate-spin rounded-full border-4 border-emerald-800/20 border-t-emerald-700"
      />
    </div>
  );
}
