// utils/pdfParser.ts
// Browser-based PDF text extraction using pdfjs-dist with local worker

let pdfjsLib: any = null;

const loadPdfJs = async () => {
    if (pdfjsLib) return pdfjsLib;

    const pdfjs = await import('pdfjs-dist');

    // Using CDN worker as it is most reliable for browser-based pdfjs in Vite
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    pdfjsLib = pdfjs;
    return pdfjs;
};

/**
 * Extracts raw text from a PDF File object.
 * Limits output to ~8000 characters for Gemini prompt efficiency.
 */
export const extractTextFromPDF = async (file: File, maxChars = 8000): Promise<string> => {
    try {
        const pdfjs = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';
        const numPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            if (fullText.length >= maxChars) break;

            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map((item: any) => ('str' in item ? item.str : ''))
                .join(' ');

            fullText += pageText + '\n';
        }

        const extracted = fullText.trim().slice(0, maxChars);

        if (!extracted) {
            throw new Error('No text could be extracted. The PDF may be image-based or scanned.');
        }

        return extracted;
    } catch (err: any) {
        // Re-throw our own messages as-is, wrap unknown errors
        if (err?.message?.includes('No text could be extracted')) {
            throw err;
        }
        console.error('[pdfParser] Failed to extract text:', err?.message ?? err);
        throw new Error('Could not parse the PDF. Please ensure it is a valid, text-based PDF.');
    }
};