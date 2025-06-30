import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-8xl md:text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Sorry, we couldn&apos;t find the page you were looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back to Homepage</Link>
      </Button>
    </div>
  )
}