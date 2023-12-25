"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { MdLanguage } from "react-icons/md"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { footerLinks } from "@/constant";


const FooterColumnMiddle = ({ title, links }: any) => (
    <div className="mx-auto">
        <h3 className="font-semibold m-1 text-white">{title}</h3>
        <ul className="footer_ul m-1">
            {links.map((link: any) => <Link href="/" key={link} className='text-[13px]
            text-light-white mb-1 relative block pt-5 hover:underline'>{link}</Link>)}
        </ul>
    </div>
);
const FooterColumnBottom = ({ title, links }: any) => (
    <div className=" align-top ">
        <h6 className='text-[11px] tracking-wide text-white '>{title}</h6>
        <ul className="footer_ul">
            {links.map((link: any) => <Link href="/" key={link} className='text-[11px] text-[#888]
             mb-1 relative block pt-0 max-w-[105px] hover:underline'>{link}</Link>)}
        </ul>
    </div>
);

const Footer = () => {

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <footer>
                <div className="footer_back" onClick={ScrollToTop}>
                    <a >Back to top</a>
                </div>
                <div className="footer_middle ">
                    <FooterColumnMiddle title={footerLinks[0].title} links={footerLinks[0].links} />
                    <FooterColumnMiddle title={footerLinks[1].title} links={footerLinks[1].links} />
                    <FooterColumnMiddle title={footerLinks[2].title} links={footerLinks[2].links} />
                    <FooterColumnMiddle title={footerLinks[3].title} links={footerLinks[3].links} />
                </div>
                <div className='footer_middle border-t-[0.5px] border-light-grey' >
                    <ul className='flex gap-24 ' >
                        <li className='p-2 cursor-pointer'>
                            <Link href='/'>
                                <Image
                                    alt='logo'
                                    width={76}
                                    height={24}
                                    style={{ width: 88, height: "auto" }}
                                    src='/logo.png'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                            </Link>
                        </li>
                        <li className='footer_logo align-middle '>
                            <i className='text-[18px]'><MdLanguage /></i>
                            English
                            <span className='block pl-5' >
                                <i className='text-[8px]' ><FaCaretUp color='#888' /></i>
                                <i className='text-[8px]' ><FaCaretDown color='#888' /></i>
                            </span>
                        </li>
                        <li className='footer_logo leading-8 '>
                            <Image alt='logo' width={18} height={12}
                            style={{ width: 23, height: "auto" }}
                             src='https://sp-bootstrap.global.ssl.fastly.net/8.0.0/images/flags/us.svg' />
                            United States
                        </li>
                    </ul>
                </div>
                <div className="footer_bottom ">
                    <div className="flex-1 flex flex-col gap-1 ">
                        <FooterColumnBottom title={footerLinks[4].title} links={footerLinks[4].links} />
                        <FooterColumnBottom title={footerLinks[5].title} links={footerLinks[5].links} />
                        <FooterColumnBottom title={footerLinks[6].title} links={footerLinks[6].links} />
                        <FooterColumnBottom title={footerLinks[7].title} links={footerLinks[7].links} />
                        <FooterColumnBottom title={footerLinks[8].title} links={footerLinks[8].links} />
                        <FooterColumnBottom title={footerLinks[9].title} links={footerLinks[9].links} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 ">
                        <FooterColumnBottom title={footerLinks[10].title} links={footerLinks[10].links} />
                        <FooterColumnBottom title={footerLinks[11].title} links={footerLinks[11].links} />
                        <FooterColumnBottom title={footerLinks[12].title} links={footerLinks[12].links} />
                        <FooterColumnBottom title={footerLinks[13].title} links={footerLinks[13].links} />
                        <FooterColumnBottom title={footerLinks[14].title} links={footerLinks[14].links} />
                        <FooterColumnBottom title={footerLinks[15].title} links={footerLinks[15].links} />

                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <FooterColumnBottom title={footerLinks[16].title} links={footerLinks[16].links} />
                        <FooterColumnBottom title={footerLinks[17].title} links={footerLinks[17].links} />
                        <FooterColumnBottom title={footerLinks[18].title} links={footerLinks[18].links} />
                        <FooterColumnBottom title={footerLinks[19].title} links={footerLinks[19].links} />
                        <FooterColumnBottom title={footerLinks[20].title} links={footerLinks[20].links} />
                        <FooterColumnBottom title={footerLinks[21].title} links={footerLinks[21].links} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <FooterColumnBottom title={footerLinks[22].title} links={footerLinks[22].links} />
                        <FooterColumnBottom title={footerLinks[23].title} links={footerLinks[23].links} />
                        <FooterColumnBottom title={footerLinks[24].title} links={footerLinks[24].links} />
                        <FooterColumnBottom title={footerLinks[25].title} links={footerLinks[25].links} />
                        <FooterColumnBottom title={footerLinks[26].title} links={footerLinks[26].links} />
                        <FooterColumnBottom title={footerLinks[27].title} links={footerLinks[27].links} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <FooterColumnBottom title={footerLinks[28].title} links={footerLinks[28].links} />
                        <FooterColumnBottom title={footerLinks[29].title} links={footerLinks[29].links} />
                        <FooterColumnBottom title={footerLinks[30].title} links={footerLinks[30].links} />
                        <FooterColumnBottom title={footerLinks[31].title} links={footerLinks[31].links} />
                        <FooterColumnBottom title={footerLinks[32].title} links={footerLinks[32].links} />
                        <FooterColumnBottom title={footerLinks[33].title} links={footerLinks[33].links} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <FooterColumnBottom title={footerLinks[34].title} links={footerLinks[34].links} />
                        <FooterColumnBottom title={footerLinks[35].title} links={footerLinks[35].links} />
                        <FooterColumnBottom title={footerLinks[36].title} links={footerLinks[36].links} />
                        <FooterColumnBottom title={footerLinks[37].title} links={footerLinks[37].links} />
                        <FooterColumnBottom title={footerLinks[38].title} links={footerLinks[38].links} />
                        <FooterColumnBottom title={footerLinks[39].title} links={footerLinks[39].links} />
                    </div>
                    <div className='footer_copyright text-white pt-8 mx-auto'>
                        <div className="flex gap-10 mx-auto justify-center">
                            <p className='text-[11px] relative hover:underline cursor-pointer'>Conditions of Use</p>
                            <p className='text-[11px] relative hover:underline cursor-pointer'>Privacy Notice</p>
                            <p className='text-[11px] relative hover:underline cursor-pointer'>Interest-Based Ads</p>
                        </div>
                        <p className='text-center'> &copy; 1996-2023, Amazon.com, Inc. or its affiliates</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
