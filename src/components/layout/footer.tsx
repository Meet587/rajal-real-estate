export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50 py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>© {year} Rajal Realty. All rights reserved.</p>
        <p className="mt-1">Your Trusted Partner in Real Estate.</p>
      </div>
    </footer>
  );
}
