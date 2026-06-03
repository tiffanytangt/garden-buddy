/**
 * Discreet build/version indicator, tucked into the nav menu. Lets you confirm
 * which version is live and roughly when it shipped.
 *
 * - NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA is injected by Vercel at build time (only
 *   when "Automatically expose System Environment Variables" is on — the default).
 * - NEXT_PUBLIC_BUILD_TIME is baked in via next.config.mjs (Pacific time).
 */
export default function VersionBadge() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;

  const shortSha = sha ? sha.slice(0, 7) : 'dev';

  return (
    <span
      title={sha ? `commit ${sha}` : undefined}
      className="text-[10px] font-mono text-gray-400 dark:text-gray-600 select-none text-center"
    >
      {shortSha}
      {buildTime && <span className="block">{buildTime}</span>}
    </span>
  );
}
