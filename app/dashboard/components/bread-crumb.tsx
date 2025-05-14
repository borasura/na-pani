// /components/NextBreadcrumb.tsx
'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const NextBreadcrumb = ({homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    return (
        <div>
        {/* <div>
            <ul className={containerClasses}>
                <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
                {pathNames.length > 0 && separator}
            {
                pathNames.map( (link, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`
                    const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                    const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    )
                })
            }
            </ul>            
        </div> */}
        <div>
        <Breadcrumb>
            <BreadcrumbList>
                {/* <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem> */}
                {/* <BreadcrumbItem className="hidden md:block">
                </BreadcrumbItem> */}
                {/* {(pathNames.length > 0) ? <BreadcrumbSeparator className="hidden md:block" />: ''} */}
                {
                    pathNames.map( (link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`
                        const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link

                        if (paths === href){

                            return (
                            
                                <React.Fragment key={index}>
                                    {/* <li className={itemClasses} > */}
                                        {/* <Link href={href}>{itemLink}</Link> */}
                                        <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            {itemLink}
                                        </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    {/* </li> */}
                                    {(pathNames.length !== index + 1) ? <BreadcrumbSeparator className="hidden md:block" />: ''}
                                </React.Fragment>
                            )

                        }else{

                            return (
                            
                                <React.Fragment key={index}>
                                    {/* <li className={itemClasses} > */}
                                        {/* <Link href={href}>{itemLink}</Link> */}
                                        <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href={href}>
                                            {itemLink}
                                        </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    {/* </li> */}
                                    {(pathNames.length !== index + 1) ? <BreadcrumbSeparator className="hidden md:block" />: ''}
                                </React.Fragment>
                            )

                        }
                        
                    })
                }
                
            </BreadcrumbList>
        </Breadcrumb>
        </div>
        </div>
    )
}

export default NextBreadcrumb