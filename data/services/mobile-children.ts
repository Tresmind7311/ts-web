import type { ServiceFaqData } from './types';

type Card = { title: string; description: string; image?: { src: string; alt: string } };
export type ChildPage = {
    slug: string;
    name: string;
    seo: { title: string; description: string };
    hero: { title: string; description: string; cta: string };
    introduction: { title: string; text: string };
    capabilitiesDescription: string;
    cards: Card[];
    deliverables: string[];
    useCases: { title: string; items: string[] };
    explainer: { title: string; text: string };
    process: string[];
    why: { title: string; text: string };
    faq: ServiceFaqData;
    closing: { title: string; text: string };
};

// The PDF is a draft. These pages retain its structure while avoiding unverified
// promises about delivery, technology expertise, case studies, or store approval.
export const mobileChildren = {
    'ios-app-development': {
        slug: 'ios-app-development',
        name: 'iOS App Development',
        seo: {
            title: 'iOS App Development Services | Tresmind Solutions',
            description: 'Explore native iPhone and iPad app planning, Apple platform features, testing considerations and the choice between iOS and cross-platform development.',
        },
        hero: { title: 'iOS app development services', description: 'Planning an iPhone or iPad app? Explore the product, design and release decisions that shape a native iOS project.', cta: 'Discuss your iOS app' },
        introduction: { title: "Native apps for Apple's ecosystem", text: 'Native iOS development can make sense when an app depends on Apple-specific features, device performance or a distinct iPhone and iPad experience. The right approach depends on the audience, feature set and maintenance plan.' },
        capabilitiesDescription: 'Explore interface, platform feature and maintenance areas to consider for an iOS app.',
        cards: [
            { title: 'Native iPhone apps', description: 'Plan the core journeys, interface and device capabilities for an iPhone product.', image: { src: '/images/services/mobile-app-development/mob-dev-9.png', alt: 'Mobile app interface concept' } },
            { title: 'iPad and universal apps', description: 'Consider larger layouts, multitasking and input methods alongside phone screens.', image: { src: '/images/services/mobile-app-development/mob-dev-4.png', alt: 'Mobile app screens across device sizes' } },
            { title: 'Apple ecosystem features', description: 'Assess whether widgets, payments, notifications or device integrations belong in the scope.', image: { src: '/images/services/mobile-app-development/mobile-ecosystem.jpg', alt: 'Mobile app, API and backend ecosystem diagram' } },
            { title: 'App modernisation', description: 'Review an existing app before deciding whether to update or replace parts of it.', image: { src: '/images/services/mobile-app-development/mob-dev-6.png', alt: 'Mobile app interface concept' } },
        ],
        deliverables: ['Product scope and user journeys', 'Interface and prototype requirements', 'Device and accessibility test plan', 'Release and handover requirements'],
        useCases: { title: 'Where native iOS makes sense', items: ['A primarily iPhone audience', 'Features that depend on current Apple APIs', 'An app with demanding animation or device integration', 'An existing iOS app that needs careful modernisation'] },
        explainer: { title: 'Native iOS or cross-platform?', text: 'Native development gives direct access to Apple platform features. Cross-platform development can share more work with Android. Compare the required features, target devices, release timing and long-term maintenance before choosing.' },
        process: ['Define audience, goals and Apple-specific requirements', 'Plan user journeys and prototype the interface', 'Agree implementation and review milestones', 'Test on the supported devices and accessibility settings', 'Prepare release and ongoing maintenance requirements'],
        why: { title: 'Why discuss iOS with Tresmind?', text: 'A useful first conversation should clarify the app goals, target devices, platform-specific features and the evidence needed to choose a delivery approach. Confirm the proposed scope and team capabilities before work begins.' },
        faq: { title: 'iOS App Development FAQs', items: [
            { question: 'Do you build in Swift or Objective-C?', answer: 'Swift and Objective-C are both used in the Apple ecosystem. The language and migration approach should be agreed after reviewing the existing code and requirements.' },
            { question: 'Will you handle App Store submission?', answer: 'Submission scope, account ownership, review responsibilities and required listing materials should be agreed during planning.' },
            { question: 'Can you add an Android version later?', answer: 'An Android version is possible as a separate project. Shared APIs and product design can reduce duplicated planning.' },
            { question: 'Do I need an Apple Developer account?', answer: 'An organisation publishing its own app normally needs an Apple Developer account under its control.' },
            { question: 'How do you test on different devices?', answer: 'Agree a device and iOS-version matrix based on the intended users, then include accessibility and release testing in the scope.' },
            { question: 'Can you build an Apple Watch or widget companion?', answer: 'Watch and widget features need separate requirements and feasibility review before they can be included in a project.' },
        ] },
        closing: { title: 'Planning an iPhone app?', text: 'Tell us about your audience, devices and must-have features so the project can be scoped.' },
    },
    'android-app-development': {
        slug: 'android-app-development',
        name: 'Android App Development',
        seo: {
            title: 'Android App Development Services | Tresmind Solutions',
            description: 'Explore Android app planning across phones, tablets and managed devices, including adaptive design, device testing and Google Play release requirements.',
        },
        hero: { title: 'Android app development services', description: 'Planning an Android app? Start with the users, devices and distribution requirements that determine the right build.', cta: 'Discuss your Android app' },
        introduction: { title: 'Built for the variety of Android', text: 'Android products can span many screen sizes, hardware capabilities and operating-system versions. A realistic device matrix helps set design, performance and testing priorities.' },
        capabilitiesDescription: 'Explore app, device and release areas to consider when planning for Android.',
        cards: [
            { title: 'Native Android apps', description: 'Define core journeys and Android-specific behavior for a phone app.', image: { src: '/images/services/mobile-app-development/Native-Android-Development.jpg', alt: 'Android app displayed on mobile devices' } },
            { title: 'Tablets, foldables and wearables', description: 'Consider adaptive layouts and companion experiences where users need them.', image: { src: '/images/services/mobile-app-development/mob-dev-4.png', alt: 'Mobile app screens across device sizes' } },
            { title: 'Enterprise and rugged devices', description: 'Identify managed-device, kiosk, scanner and private-distribution requirements.', image: { src: '/images/services/mobile-app-development/mob-dev-3.png', alt: 'Mobile business app interface concepts' } },
            { title: 'Performance and Play compliance', description: 'Plan for startup time, crashes, permissions and current release policies.', image: { src: '/images/services/mobile-app-development/mob-dev-5.png', alt: 'Mobile app interface concept' } },
        ],
        deliverables: ['User and device requirements', 'Adaptive interface requirements', 'Device and OS test matrix', 'Distribution and handover requirements'],
        useCases: { title: 'Where native Android fits', items: ['An audience primarily using Android devices', 'Managed or rugged devices in field operations', 'Hardware access such as NFC or Bluetooth', 'An existing Android app needing assessment'] },
        explainer: { title: 'Planning for device fragmentation', text: 'The supported device and OS range should come from actual user needs. Define performance targets, adaptive layouts, permissions and test coverage before committing to a release plan.' },
        process: ['Identify users, devices and integrations', 'Define adaptive layouts and user journeys', 'Agree implementation and review milestones', 'Test across the selected device and OS matrix', 'Prepare distribution and maintenance requirements'],
        why: { title: 'Why discuss Android with Tresmind?', text: 'Early scoping should identify the supported device range, distribution method and testing needs. Confirm the proposed scope and team capabilities before work begins.' },
        faq: { title: 'Android App Development FAQs', items: [
            { question: 'Do you still use Java?', answer: 'Java remains common in existing Android apps; Kotlin is used for many new Android projects. An existing codebase should be assessed before choosing a migration approach.' },
            { question: 'Which Android versions will my app support?', answer: 'The minimum version should be chosen from the audience and device inventory, then documented in the test plan.' },
            { question: 'Can you build apps for company-managed devices?', answer: 'Managed devices need specific requirements for deployment, security and hardware. Confirm the required support before project scope is agreed.' },
            { question: 'How do you handle Google Play policy changes?', answer: 'Release planning should include a review of current target API, permissions and data-safety requirements.' },
            { question: 'Can you take over an existing Android app?', answer: 'An existing app should first be reviewed for code health, crashes, dependencies and account access.' },
            { question: 'Do you support Android tablets and foldables?', answer: 'Tablet and foldable support requires adaptive designs and device-specific testing, and should be included explicitly in the scope.' },
        ] },
        closing: { title: 'Building for Android?', text: 'Share your target users, devices and distribution needs to start scoping the app.' },
    },
    'cross-platform-app-development': {
        slug: 'cross-platform-app-development',
        name: 'Cross-Platform App Development',
        seo: {
            title: 'Cross-Platform App Development | Tresmind Solutions',
            description: 'Explore one-codebase planning for iOS and Android, including shared features, platform-specific work, framework choice and dual-platform testing.',
        },
        hero: { title: 'Cross-platform app development', description: 'One product for iPhone and Android starts with a clear plan for what can be shared and what must remain platform-specific.', cta: 'Plan my app' },
        introduction: { title: 'One codebase, two app stores', text: 'Cross-platform frameworks can share interface and business logic across iOS and Android. Framework choice should follow product requirements, the existing codebase and the team that will maintain the app.' },
        capabilitiesDescription: 'Explore shared product work and platform-specific considerations for iOS and Android.',
        cards: [
            { title: 'Flutter apps', description: 'Consider Flutter when a custom interface and shared Dart code fit the project.', image: { src: '/images/services/mobile-app-development/Cross-Platform-Applications.jpg', alt: 'App interfaces shown across multiple device platforms' } },
            { title: 'React Native apps', description: 'Consider React Native when React and JavaScript experience matters to the product team.', image: { src: '/images/services/mobile-app-development/mob-dev-4.png', alt: 'Mobile app screens across device sizes' } },
            { title: 'MVPs for startups', description: 'Define a focused first release that can be evaluated on both platforms.', image: { src: '/images/services/mobile-app-development/mob-dev-2.png', alt: 'Mobile product interface concepts' } },
            { title: 'Native-to-cross-platform migration', description: 'Assess existing apps before deciding whether consolidation is worthwhile.', image: { src: '/images/services/mobile-app-development/mob-dev-6.png', alt: 'Mobile app interface concept' } },
        ],
        deliverables: ['Framework comparison and trade-offs', 'Shared and platform-specific feature map', 'Dual-platform test requirements', 'Release and handover requirements'],
        useCases: { title: 'When cross-platform is the right call', items: ['Similar feature needs on iOS and Android', 'A shared product release cycle', 'A focused first version for both platforms', 'A maintenance team that can own a shared codebase'] },
        explainer: { title: 'What can stay shared and what cannot', text: 'Screens, business logic and API calls may be shared, while permissions, payments, notifications, deep links and hardware features can need platform-specific work. Identify those exceptions early and test each platform independently.' },
        process: ['Compare framework options against product needs', 'Define shared design and platform conventions', 'Identify native integrations before implementation', 'Test on both operating systems and selected devices', 'Plan separate store requirements and ongoing releases'],
        why: { title: 'Why discuss cross-platform with Tresmind?', text: 'The first decision is whether a shared codebase fits the product at all. Confirm the proposed framework, native exceptions and team capabilities before work begins.' },
        faq: { title: 'Cross-Platform App Development FAQs', items: [
            { question: 'Flutter or React Native: which is better?', answer: 'Neither is best for every app. Compare design needs, integrations, current code and the team that will maintain it.' },
            { question: 'Will a cross-platform app feel native?', answer: 'It can follow each platform’s navigation and interaction conventions, but that needs deliberate design and testing.' },
            { question: 'Is it really cheaper than two native apps?', answer: 'Shared code can reduce duplicated work, but the cost depends on native integrations, testing and maintenance needs.' },
            { question: 'Can you add native features like Bluetooth or payments?', answer: 'Such features may need plugins or platform-specific modules. Feasibility and implementation scope should be checked first.' },
            { question: 'Can our web team maintain the app?', answer: 'That depends on the framework, app complexity and the team’s mobile release experience. Plan documentation and handover accordingly.' },
            { question: 'Can you convert our existing native apps?', answer: 'Migration feasibility depends on the current apps and feature set. Start with an assessment before committing to a rebuild.' },
        ] },
        closing: { title: 'Want to launch on both platforms?', text: 'Share your product goals and integrations to compare native and cross-platform approaches.' },
    },
} satisfies Record<string, ChildPage>;

export type MobileChildSlug = keyof typeof mobileChildren;
export const mobileChildList = Object.values(mobileChildren);
export const getMobileChild = (parent: string, child: string) =>
    parent === 'mobile-app-development' ? mobileChildren[child as MobileChildSlug] : undefined;
