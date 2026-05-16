'use client';

import { Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  onSupportClick: () => void;
}

export function AppHeader({ onSupportClick }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={onSupportClick}
      >
        <Coffee className="h-4 w-4" />
        Apoiar
      </Button>
    </header>
  );
}
