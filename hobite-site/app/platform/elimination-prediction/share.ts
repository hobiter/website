import type { SharePayload } from "./types";

export function downloadImage(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function shareNative(payload: SharePayload) {
  if (!navigator.share) {
    return false;
  }

  const files =
    payload.imageBlob && "canShare" in navigator
      ? [
          new File([payload.imageBlob], payload.fileName, {
            type: "image/png",
          }),
        ]
      : [];

  const shareData: ShareData = {
    title: payload.title,
    text: payload.text,
    url: payload.url,
  };

  if (
    files.length > 0 &&
    navigator.canShare?.({ files })
  ) {
    shareData.files = files;
  }

  await navigator.share(shareData);
  return true;
}

export async function copyShareText(text: string) {
  await navigator.clipboard.writeText(text);
}

export function openXShare(payload: SharePayload) {
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", payload.text);
  url.searchParams.set("url", payload.url);
  window.open(url.toString(), "_blank", "noopener,noreferrer");
}

export function openFacebookShare(payload: SharePayload) {
  const url = new URL("https://www.facebook.com/sharer/sharer.php");
  url.searchParams.set("u", payload.url);
  window.open(url.toString(), "_blank", "noopener,noreferrer");
}

