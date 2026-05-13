export const copyPreviewAsJson = async (text: string) => {
  await navigator.clipboard.writeText(text)
}
