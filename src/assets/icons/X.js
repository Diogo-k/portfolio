/**
 * X icon component
 *
 * @param {string} className - The class name
 * @param {number} width - The width of the icon
 * @param {number} height - The height of the icon
 * @returns {React.ReactNode} The rendered component
 */
const X = ({ className = '', width = 24, height = 24 }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default X;
