import { useCallback, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

const URL_PATTERN = /^https?:\/\/\S+$/i;

export function useClipboardUrl() {
  const [detectedUrl, setDetectedUrl] = useState<string | null>(null);

  const checkClipboard = useCallback(async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text && URL_PATTERN.test(text.trim())) {
        setDetectedUrl(text.trim());
      } else {
        setDetectedUrl(null);
      }
    } catch {
      setDetectedUrl(null);
    }
  }, []);

  const clearDetected = useCallback(() => setDetectedUrl(null), []);

  return { detectedUrl, checkClipboard, clearDetected };
}
