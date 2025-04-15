const ArrowLink = (props) => (
    <svg
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g>
            <path
                opacity="0.5"
                d="M5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L5.46967 17.4697ZM6.53033 18.5303L18.5303 6.53033L17.4697 5.46967L5.46967 17.4697L6.53033 18.5303Z"
                className="fill-primary-light dark:fill-text-dark"
            />
            <path
                d="M9 6H18V15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);

export default ArrowLink;
