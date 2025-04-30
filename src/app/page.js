import { Intro, About, Projects, Contact } from '@/sections';
import { SectionDivider } from '@/components';

/**
 * Home page component
 *
 * @returns {React.ReactNode} The rendered component
 */
export default function Page() {
    return (
        <>
            <Intro />
            <About />
            <SectionDivider />
            <Projects />
            <Contact />
        </>
    );
}
