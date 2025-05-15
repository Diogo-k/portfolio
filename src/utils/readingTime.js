/**
 * Calculate the reading time for a given content
 *
 * @param {string} content - The content to calculate the reading time for
 * @returns {number} The reading time in minutes
 */
export default function calculateReadingTime(content) {
    if (!content) {
        return 0;
    }

    const textContent = content.replace(/<[^>]*>?/gm, '');
    const words = textContent.trim().split(/\s+/).length;
    const wordsPerMinute = 225;
    const readingTime = Math.ceil(words / wordsPerMinute);

    return readingTime;
}
