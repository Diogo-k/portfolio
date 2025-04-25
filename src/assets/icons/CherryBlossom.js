const CherryBlossom = (props) => {
    const petal = (
        <path
            d="M32 10C27 18 27 26 32 30C37 26 37 18 32 10Z"
            className="fill-primary-light/80 dark:fill-primary-dark/80"
            fillOpacity="0.8"
        />
    );

    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
            {...props}
        >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <g key={i} transform={`rotate(${angle}, 32, 32)`}>
                    {petal}
                </g>
            ))}
        </svg>
    );
};

export default CherryBlossom;
