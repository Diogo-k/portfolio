import { Suspense } from 'react';
import { Projects } from '@/sections';
import { Loading } from '@/components';

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
