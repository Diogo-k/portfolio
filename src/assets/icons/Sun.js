/**
 * Sun icon component
 *
 * @param {Object} props - The component props
 * @returns {React.ReactNode} The rendered component
 */
const Sun = (props) => (
    <svg
        width="32px"
        height="32px"
        viewBox="0 0 20 20"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="sun" transform="translate(-2 -2)">
            <circle
                id="secondary"
                fill="#C73737"
                cx="4"
                cy="4"
                r="4"
                transform="translate(8 8)"
            />
            <path
                id="primary"
                d="M12,3V4M5.64,5.64l.7.7M3,12H4m1.64,6.36.7-.7M12,21V20m6.36-1.64-.7-.7M21,12H20M18.36,5.64l-.7.7M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"
                fill="none"
                stroke="#D9D9D9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </g>
    </svg>
);

export default Sun;
