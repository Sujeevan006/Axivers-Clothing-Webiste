'use client';

import { useEffect, useRef } from 'react';

const dialogs: HTMLDivElement[] = [];
let previousOverflow = '';
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]';

/** Keep keyboard focus in the active overlay and return it to its trigger. */
export function useDialogFocus(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const panel = ref.current;
    if (!open || !panel) return;
    const trigger = document.activeElement as HTMLElement | null;
    if (!dialogs.length) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    dialogs.push(panel);
    const controls = () => Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(element => element.getClientRects().length > 0);
    (controls()[0] || panel).focus();

    const handleKey = (event: KeyboardEvent) => {
      if (dialogs[dialogs.length - 1] !== panel) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key === 'Tab') {
        const items = controls();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first) { event.preventDefault(); panel.focus(); return; }
        if (!panel.contains(document.activeElement) || (event.shiftKey && document.activeElement === first)) {
          event.preventDefault(); (event.shiftKey ? last : first).focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      const wasTop = dialogs[dialogs.length - 1] === panel;
      dialogs.splice(dialogs.indexOf(panel), 1);
      if (!dialogs.length) document.body.style.overflow = previousOverflow;
      if (wasTop && trigger?.isConnected) trigger.focus();
    };
  }, [open]);

  return ref;
}
