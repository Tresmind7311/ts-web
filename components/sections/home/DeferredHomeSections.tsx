'use client';

import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ComponentType,
} from 'react';

import { ScrollTrigger } from '@/lib/gsap';

import styles from './DeferredHomeSections.module.css';

type SectionLoader = () => Promise<ComponentType>;

type DeferredSectionProps = {
    loader: SectionLoader;
    reserveClassName: string;
    anchorId?: string;
    rootMargin?: string;
};

const LOAD_AHEAD_ROOT_MARGIN = '100% 0px';

const PROJECTS = [
    {
        title: 'Project One',
        image: '/projects/project-01.jpg',
        href: '/projects/project-one',
    },
    {
        title: 'Project Two',
        image: '/projects/project-02.jpg',
        href: '/projects/project-two',
    },
    {
        title: 'Project Three',
        image: '/projects/project-03.jpg',
        href: '/projects/project-three',
    },
    {
        title: 'Project Four',
        image: '/projects/project-04.jpg',
        href: '/projects/project-four',
    },
    {
        title: 'Project Five',
        image: '/projects/project-05.jpg',
        href: '/projects/project-five',
    },
];

const loadStatsSection: SectionLoader = async () => {
    const { default: StatsSection } = await import('./StatsSection');

    return function LoadedStatsSection() {
        return <StatsSection />;
    };
};

const loadAnimationSection: SectionLoader = async () => {
    const { default: AnimationSection } = await import('./Animationsection');

    return function LoadedAnimationSection() {
        return <AnimationSection />;
    };
};

const loadServicesOverviewSection: SectionLoader = async () => {
    const { default: ServicesOverviewSection } = await import('./ServicesOverviewSection');

    return function LoadedServicesOverviewSection() {
        return <ServicesOverviewSection />;
    };
};

const loadCurvedProjectsSection: SectionLoader = async () => {
    const { default: CurvedProjectsContinuous } = await import(
        '@/components/curved-projects-continuous/CurvedProjectsContinuous'
    );

    return function LoadedCurvedProjectsSection() {
        return <CurvedProjectsContinuous projects={PROJECTS} />;
    };
};

const loadTestimonialsSection: SectionLoader = async () => {
    const [{ default: TestimonialsSection }, { homeTestimonials }] = await Promise.all([
        import('./TestimonialsSection'),
        import('@/data/testimonials/home'),
    ]);

    return function LoadedTestimonialsSection() {
        return <TestimonialsSection testimonials={homeTestimonials} />;
    };
};

const loadLabSection: SectionLoader = async () => {
    const { default: LabSection } = await import('./Labsection');

    return function LoadedLabSection() {
        return <LabSection />;
    };
};

const loadDotGlobeSection: SectionLoader = async () => {
    const { default: DotGlobeReferenceSection } = await import(
        '@/components/dot-globe-reference/DotGlobeReferenceSection'
    );

    return function LoadedDotGlobeSection() {
        return <DotGlobeReferenceSection />;
    };
};

function DeferredSection({
    loader,
    reserveClassName,
    anchorId,
    rootMargin = LOAD_AHEAD_ROOT_MARGIN,
}: DeferredSectionProps) {
    const slotRef = useRef<HTMLDivElement>(null);
    const requestStartedRef = useRef(false);

    const [LoadedSection, setLoadedSection] = useState<ComponentType | null>(null);
    const [geometrySettled, setGeometrySettled] = useState(false);

    useEffect(() => {
        const slot = slotRef.current;

        if (!slot) {
            return;
        }

        let cancelled = false;
        let retryTimer = 0;
        let observer: IntersectionObserver | null = null;

        const requestSection = async () => {
            if (cancelled || requestStartedRef.current) {
                return;
            }

            requestStartedRef.current = true;

            try {
                const Section = await loader();

                if (cancelled) {
                    return;
                }

                setLoadedSection(() => Section);
                observer?.disconnect();
            } catch (error) {
                requestStartedRef.current = false;
                console.error('Deferred homepage section failed to load.', error);

                if (!cancelled) {
                    retryTimer = window.setTimeout(() => {
                        const rect = slot.getBoundingClientRect();
                        const retryDistance = window.innerHeight * 2;

                        if (
                            rect.top <= retryDistance &&
                            rect.bottom >= -window.innerHeight
                        ) {
                            void requestSection();
                        }
                    }, 1500);
                }
            }
        };

        if (!('IntersectionObserver' in window)) {
            void requestSection();

            return () => {
                cancelled = true;
                window.clearTimeout(retryTimer);
            };
        }

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    void requestSection();
                }
            },
            {
                root: null,
                rootMargin,
                threshold: 0,
            },
        );

        observer.observe(slot);

        return () => {
            cancelled = true;
            observer?.disconnect();
            window.clearTimeout(retryTimer);
        };
    }, [loader, rootMargin]);

    useLayoutEffect(() => {
        if (!LoadedSection) {
            return;
        }

        let frameOne = 0;
        let frameTwo = 0;
        let frameThree = 0;
        let refreshFrame = 0;

        // Keep the reserved scroll span for a few frames while the loaded
        // section creates its ScrollTrigger pin/spacer. This prevents the page
        // from collapsing between module resolution and animation setup.
        frameOne = window.requestAnimationFrame(() => {
            frameTwo = window.requestAnimationFrame(() => {
                frameThree = window.requestAnimationFrame(() => {
                    setGeometrySettled(true);

                    refreshFrame = window.requestAnimationFrame(() => {
                        ScrollTrigger.refresh();
                    });
                });
            });
        });

        return () => {
            window.cancelAnimationFrame(frameOne);
            window.cancelAnimationFrame(frameTwo);
            window.cancelAnimationFrame(frameThree);
            window.cancelAnimationFrame(refreshFrame);
        };
    }, [LoadedSection]);

    const className = [
        styles.slot,
        geometrySettled ? '' : reserveClassName,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            ref={slotRef}
            id={LoadedSection ? undefined : anchorId}
            className={className}
            data-deferred-home-section={anchorId ?? 'section'}
        >
            {LoadedSection ? <LoadedSection /> : null}
        </div>
    );
}

export default function DeferredHomeSections() {
    return (
        <>
            <DeferredSection
                loader={loadStatsSection}
                reserveClassName={styles.statsReserve}
                anchorId="news"
            />

            <DeferredSection
                loader={loadAnimationSection}
                reserveClassName={styles.animationReserve}
                anchorId="services"
            />

            <DeferredSection
                loader={loadServicesOverviewSection}
                reserveClassName={styles.servicesOverviewReserve}
                anchorId="services-v2"
            />

            <DeferredSection
                loader={loadCurvedProjectsSection}
                reserveClassName={styles.portfolioReserve}
            />

            <DeferredSection
                loader={loadLabSection}
                reserveClassName={styles.labReserve}
                anchorId="lab"
            />
            <DeferredSection
                loader={loadTestimonialsSection}
                reserveClassName={styles.testimonialsReserve}
                anchorId="testimonials"
            />


            <DeferredSection
                loader={loadDotGlobeSection}
                reserveClassName={styles.globeReserve}
            />
        </>
    );
}
