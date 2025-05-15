import PropTypes from 'prop-types';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ThemeProvider component that provides a theme to the application.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content of the component
 */
export default function ThemeProvider({ children, ...props }) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
