import { Suspense } from 'react';
import { Projects } from '@/sections';
import { Loading } from '@/components';
import { baseMeta } from '@/utils/meta';

export const metadata = {
    ...baseMeta({
        title: 'Projects',
        description:
            'Projects page displaying all the projects I have worked on.',
    }),
};

/**
 * Projects page component
 *
 * @returns {React.ReactNode} The rendered component
 */
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <Projects isProjectRoute />
        </Suspense>
    );
}
