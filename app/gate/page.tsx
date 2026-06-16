export default function GatePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-sm text-neutral-500 uppercase tracking-widest">
          Private
        </p>
        <h1 className="text-2xl font-light text-neutral-200">
          Access Restricted
        </h1>
        <p className="text-sm text-neutral-500 max-w-xs">
          This portfolio is private. If you received a link, it may have already
          been used or has expired.
        </p>
      </div>
    </main>
  );
}
