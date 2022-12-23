export function downloadBase64File(base64: string) {
    const linkSource = `data:text/csv;base64,${base64}`;
    const downloadLink = document.createElement("a");
    console.log('"here"', downloadLink)
  downloadLink.href = linkSource;
  downloadLink.download = 'listFamilies.csv';
  downloadLink.click()
}
