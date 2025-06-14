/**
 * Left arrow icon component
 *
 * @param {Object} props - The component props
 * @returns {React.ReactNode} The rendered component
 */
const LeftArrow = (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
    </svg>
);

export default LeftArrow;
