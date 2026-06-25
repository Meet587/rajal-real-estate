interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-primary py-6 text-primary-foreground">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-primary-foreground/80">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
