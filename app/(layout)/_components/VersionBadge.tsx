/**
 * Discreet build/version indicator. Lets you confirm at a glance which version
 * is live and roughly when it shipped.
 *
 * - NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA is injected by Vercel at build time (only
 *   when "Automatically expose System Environment Variables" is on — the default).
 * - NEXT_PUBLIC_BUILD_TIME is baked in via next.config.mjs.
 *
 * Hidden on mobile so it doesn't collide with the bottom nav.
 */
export default function VersionBadge() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;

  const shortSha = sha ? sha.slice(0, 7) : 'dev';
  const title = [sha && `commit ${sha}`, buildTime && `built ${buildTime}`]
    .filter(Boolean)
    .join('\n');

  return (
    <span
      title={title || undefined}
      className="hidden sm:block fixed bottom-2 right-2 z-20 text-[10px] font-mono text-gray-400 dark:text-gray-600 select-none"
    >
      {shortSha}
    </span>
  );
}
