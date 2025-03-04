const Moon = (props) => (
    <svg
        id="moon"
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        fill="#000000"
        transform="matrix(-1, 0, 0, 1, 0, 0)"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            id="secondary-fill"
            d="M21,12a9,9,0,0,1-9,9,8.91,8.91,0,0,1-6.38-2.67A8.64,8.64,0,0,0,9,19,9,9,0,0,0,15.38,3.66,9,9,0,0,1,21,12Z"
            fill="#C73737"
            strokeWidth="2"
        />
        <path
            id="primary-stroke"
            d="M21,12A9,9,0,0,1,3.25,14.13,6.9,6.9,0,0,0,8,16,7,7,0,0,0,11.61,3H12A9,9,0,0,1,21,12Z"
            fill="none"
            stroke="#0F0F10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
        />
    </svg>
);

export default Moon;
