interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now()
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  return { toasts, addToast }
}
