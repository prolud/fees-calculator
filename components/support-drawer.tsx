'use client';

import { useEffect, useState } from 'react';
import { Coffee } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

const STORAGE_KEY = 'support_drawer_last_shown';
const ONE_WEEK_MS = 1 * 24 * 60 * 60 * 1000;

function shouldShow(): boolean {
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return true;
    return Date.now() - parseInt(last, 10) > ONE_WEEK_MS;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {}
}

interface SupportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupportDrawer({ open, onOpenChange }: SupportDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-center sm:text-center">
          <DrawerTitle className="text-2xl">Apoie-me!</DrawerTitle>
          <DrawerDescription className="text-base">
            Se esta ferramenta te ajudou, que tal comprar um café? ☕
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex-col items-center gap-3 pb-8">
          <a
            href="https://buymeacoffee.com/prolud"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs"
          >
            <Button className="w-full gap-2 bg-yellow-400 text-black hover:bg-yellow-300">
              <Coffee className="h-5 w-5" />
              Comprar um café
            </Button>
          </a>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full max-w-xs">
              Talvez mais tarde
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function useAutoSupportDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!shouldShow()) return;
    const timer = setTimeout(() => {
      setOpen(true);
      markShown();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return { open, setOpen };
}
