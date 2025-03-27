import { Intro, About, Projects, Contact } from '../sections';

import { SectionDivider } from '@/components';

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
