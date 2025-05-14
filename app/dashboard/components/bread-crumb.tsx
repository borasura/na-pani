// /components/NextBreadcrumb.tsx
'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
// Link from next/link is not directly used in the revised JSX as BreadcrumbLink handles navigation.
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator, 
    BreadcrumbPage 
} from '@/components/ui/breadcrumb' // Assuming this path is correct for your project

type TBreadCrumbProps = {
    homeElement: ReactNode, // Example: <BreadcrumbLink href="/">Home</BreadcrumbLink>
    separator: ReactNode,   // Example: <SlashIcon /> or a custom separator component
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string, // Classes for the active BreadcrumbItem
    capitalizeLinks?: boolean
}

const NextBreadcrumb = ({
    homeElement, 
    separator, 
    containerClasses, 
    listClasses, 
    activeClasses,
    capitalizeLinks
}: TBreadCrumbProps) => {

    const currentPath = usePathname();
    // Split the path into segments and filter out empty strings (e.g., from leading/trailing slashes)
    const pathSegments = currentPath.split('/').filter(path => path);

    // Regular expression to identify UUIDs
    const uuidRegex = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;

    const generatedBreadcrumbItems: Array<{ name: string; href: string; isCurrentPage: boolean }> = [];

    // Only generate items if pathSegments exist (i.e., not the root path if homeElement handles it)
    if (pathSegments.length > 0) {
        for (let i = 0; i < pathSegments.length; i++) {
            const segment = pathSegments[i];

            // If the current segment is a UUID, skip creating a displayable breadcrumb item for it.
            // Its value will be included in the href of the preceding displayable item.
            if (uuidRegex.test(segment)) {
                continue; 
            }

            // Capitalize the display name if the prop is set
            const displayName = capitalizeLinks 
                ? segment.charAt(0).toUpperCase() + segment.slice(1) 
                : segment;

            // Construct the href for this displayable item.
            // It includes the path up to the current segment.
            let itemHref = `/${pathSegments.slice(0, i + 1).join('/')}`;
            
            // If the *next* segment in the original path is a UUID, 
            // append it to the current item's href.
            // This ensures "Project" links to "/.../project/uuid" 
            // and "Tasks" links to "/.../tasks/uuid".
            if (i + 1 < pathSegments.length && uuidRegex.test(pathSegments[i + 1])) {
                itemHref += `/${pathSegments[i + 1]}`;
            }
            
            // Determine if the current item represents the current page
            // An item is the current page if its constructed href matches the full currentPath
            // or if it's the last displayable segment and its href (which might include a UUID)
            // is a prefix of the currentPath (e.g. /dashboard/project/uuid for page /dashboard/project/uuid/tasks)
            // More accurately, the item is current if its href is the full currentPath.
            const isCurrentPage = itemHref === currentPath;


            generatedBreadcrumbItems.push({
                name: displayName,
                href: itemHref,
                isCurrentPage: isCurrentPage
            });
        }
    }

    // Define the separator element. Use the provided 'separator' prop if available,
    // otherwise default to the BreadcrumbSeparator component with original styling.
    const effectiveSeparator = separator ? <>{separator}</> : <BreadcrumbSeparator className="hidden md:block" />;

    // Helper function to build className string for BreadcrumbItems
    const getItemClasses = (isCurrent: boolean, baseClasses: string = "hidden md:block"): string => {
        const classes = [baseClasses];
        if (isCurrent && activeClasses) {
            classes.push(activeClasses);
        }
        return classes.join(' ');
    };

    return (
        <Breadcrumb className={containerClasses}>
            <BreadcrumbList className={listClasses}>
                {/* Render the home element if provided */}
                {homeElement && (
                    <BreadcrumbItem 
                        className={getItemClasses(currentPath === '/', "hidden md:block")}
                    >
                        {/* Assuming homeElement is a complete link like <BreadcrumbLink href="/">Home</BreadcrumbLink> */}
                        {homeElement}
                    </BreadcrumbItem>
                )}

                {/* Render separator if homeElement exists AND there are other breadcrumb items */}
                {homeElement && generatedBreadcrumbItems.length > 0 && (
                    effectiveSeparator
                )}

                {/* Map through the generated breadcrumb items */}
                {generatedBreadcrumbItems.map((item, idx) => (
                    <React.Fragment key={item.href}>
                        <BreadcrumbItem 
                            className={getItemClasses(item.isCurrentPage)}
                        >
                            {item.isCurrentPage ? (
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {/* Render separator if this is not the last item in the list */}
                        {idx < generatedBreadcrumbItems.length - 1 && (
                            effectiveSeparator
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default NextBreadcrumb;
