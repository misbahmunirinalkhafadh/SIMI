import React from 'react';
import TabDeployed from './TabDeployed';
import TabPending from './TabPending';

export const Tabs = ({ color }) => {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none"
                        role="tablist"
                    >
                        <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white dark:bg-gray-800")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Pending Deploy
                            </a>
                        </li>
                        <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white dark:bg-gray-800")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Asset Deployed
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words ">
                        <div className="flex-auto pt-5">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <TabPending />
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <TabDeployed />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};