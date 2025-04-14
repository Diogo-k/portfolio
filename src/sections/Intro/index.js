import { getSpecificMDXContent } from '@/utils/mdx';

import IntroClient from './client';

export default async function Intro() {
    const intro = await getSpecificMDXContent('intro');

    if (!intro) {
        console.warn(
            '⚠️ Intro content is completely missing. Check your MDX file.'
        );
    } else {
        if (!intro.name)
            console.warn('⚠️ Intro name is missing in your MDX file.');
        if (!intro.title)
            console.warn('⚠️ Intro title is missing in your MDX file.');
        if (!intro.button) {
            console.warn('⚠️ Intro button is missing in your MDX file.');
        } else {
            if (!intro.button.text)
                console.warn(
                    '⚠️ Intro button text is missing in your MDX file.'
                );
            if (!intro.button.href)
                console.warn(
                    '⚠️ Intro button href is missing in your MDX file.'
                );
            if (!intro.button.ariaLabel)
                console.warn(
                    '⚠️ Intro button ariaLabel is missing in your MDX file.'
                );
        }
    }

    const validatedIntro = {
        ...intro,
        name: intro?.name || 'João Diogo Paulo',
        title: intro?.title || 'Frontend Developer',
        button: {
            text: intro?.button?.text || 'Contact me',
            href: intro?.button?.href || '#contact',
            ariaLabel: intro?.button?.ariaLabel || 'Contact me',
        },
    };

    return <IntroClient intro={validatedIntro} />;
}
