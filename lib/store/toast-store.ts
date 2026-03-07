// lib/store/toast-store.ts
import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, default 3500
};

type ToastStore = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  push: (toast) => {
    const id = Math.random().toString(36).slice(2);
    const duration = toast.duration ?? 3500;

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// ── Helper shortcuts ──────────────────────────────────────────────────────────
export const toast = {
  success: (title: string, message?: string) =>
    useToastStore.getState().push({ type: "success", title, message }),

  error: (title: string, message?: string) =>
    useToastStore.getState().push({ type: "error", title, message }),

  warning: (title: string, message?: string) =>
    useToastStore.getState().push({ type: "warning", title, message }),

  info: (title: string, message?: string) =>
    useToastStore.getState().push({ type: "info", title, message }),
};