import { mobileChildList } from './mobile-children';
import { softwareChildList } from './software-children';

const mobilePath = '/services/mobile-app-development';
const softwarePath = '/services/software-development';

export const childServicePages = [
    ...mobileChildList.map(page => ({
        ...page,
        parentName: 'Mobile App Development',
        parentPath: mobilePath,
        related: mobileChildList.filter(item => item.slug !== page.slug).map(item => ({
            label: item.name,
            href: `${mobilePath}/${item.slug}`,
        })),
    })),
    ...softwareChildList.map(page => ({
        ...page,
        parentName: 'Custom Software Development',
        parentPath: softwarePath,
        related: softwareChildList.filter(item => item.slug !== page.slug).map(item => ({
            label: item.name,
            href: `${softwarePath}/${item.slug}`,
        })),
    })),
];

export const getChildServicePage = (parent: string, child: string) =>
    childServicePages.find(page => page.parentPath === `/services/${parent}` && page.slug === child);
