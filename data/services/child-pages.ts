import { mobileChildList } from './mobile-children';
import { softwareChildList } from './software-children';
import { webChildList } from './web-children';
import { aiChildList, cloudChildList } from './ai-cloud-children';
import { staffChildList, blockchainChildList } from './staff-blockchain-pages';
import { digitalMarketingChildList } from './digital-marketing-pages';

const mobilePath = '/services/mobile-app-development';
const softwarePath = '/services/software-development';
const webPath = '/services/web-development';
const aiPath = '/services/ai-development';
const cloudPath = '/services/cloud-consulting';
const staffPath = '/services/staff-augmentation';
const blockchainPath = '/services/blockchain-development';
const digitalMarketingPath = '/services/digital-marketing';

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
    ...webChildList.map(page => ({
        ...page,
        parentName: 'Web Development',
        parentPath: webPath,
        related: webChildList.filter(item => item.slug !== page.slug).map(item => ({
            label: item.name,
            href: `${webPath}/${item.slug}`,
        })),
    })),
    ...aiChildList.map(page => ({
        ...page, parentName: 'AI Development', parentPath: aiPath,
        related: aiChildList.filter(item => item.slug !== page.slug).map(item => ({ label: item.name, href: `${aiPath}/${item.slug}` })),
    })),
    ...cloudChildList.map(page => ({
        ...page, parentName: 'Cloud Consulting', parentPath: cloudPath,
        related: cloudChildList.filter(item => item.slug !== page.slug).map(item => ({ label: item.name, href: `${cloudPath}/${item.slug}` })),
    })),
    ...staffChildList.map(page => ({
        ...page, parentName: 'Staff Augmentation', parentPath: staffPath,
        related: staffChildList.filter(item => item.slug !== page.slug).map(item => ({ label: item.name, href: `${staffPath}/${item.slug}` })),
    })),
    ...blockchainChildList.map(page => ({
        ...page, parentName: 'Blockchain Development', parentPath: blockchainPath,
        related: blockchainChildList.filter(item => item.slug !== page.slug).map(item => ({ label: item.name, href: `${blockchainPath}/${item.slug}` })),
    })),
    ...digitalMarketingChildList.map(page => ({
        ...page, parentName: 'Digital Marketing Services', parentPath: digitalMarketingPath,
        related: digitalMarketingChildList.filter(item => item.slug !== page.slug).map(item => ({ label: item.name, href: `${digitalMarketingPath}/${item.slug}` })),
    })),
];

export const getChildServicePage = (parent: string, child: string) =>
    childServicePages.find(page => page.parentPath === `/services/${parent}` && page.slug === child);
