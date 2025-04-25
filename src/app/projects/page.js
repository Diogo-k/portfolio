import { Suspense } from 'react';
import { Projects } from '@/sections';
import { Loading } from '@/components';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <Projects isProjectRoute />
        </Suspense>
    );
}
