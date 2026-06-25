export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-border bg-muted/60 py-8 text-center text-sm font-medium text-foreground/70">
      <div className="container mx-auto px-4">
        <p>© {year} Rajal Realty. All rights reserved.</p>
        <p className="mt-1">Your Trusted Partner in Real Estate.</p>
      </div>
    </footer>
  );
}
