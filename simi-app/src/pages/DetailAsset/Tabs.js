import React from 'react'
import { ChipIcon, CodeIcon, FormsIcon, InformationIcon } from '../../assets/icons';
import TabDetail from './TabDetail';

export const Tabs = () => {
    const [openTab, setOpenTab] = React.useState(1);

    return (
        <>
            <div className="px-4 py-3 my-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="mr-2" role="presentation">
                            <a className={"inline-flex p-4 rounded-t-lg border-b-2 border-transparent " +
                                (openTab === 1
                                    ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 dark:border-purple-500"
                                    : "text-gray-500 border-b-2 border-transparent border-gray-100 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700")}
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                <InformationIcon className="w-5 h-5 mx-2" aria-hidden="true" />
                                Asset Detail
                            </a>

                        </li>
                        <li className="mr-2" role="presentation">
                            <a className={"inline-flex p-4 rounded-t-lg border-b-2 border-transparent " +
                                (openTab === 2
                                    ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 dark:border-purple-500"
                                    : "text-gray-500 border-b-2 border-transparent border-gray-100 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700")}
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <ChipIcon className="w-5 h-5 mx-2" aria-hidden="true" />
                                Hardware
                            </a>
                        </li>
                        <li className="mr-2" role="presentation">
                            <a className={"inline-flex p-4 rounded-t-lg border-b-2 border-transparent " +
                                (openTab === 3
                                    ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 dark:border-purple-500"
                                    : "text-gray-500 border-b-2 border-transparent border-gray-100 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700")}
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <CodeIcon className="w-5 h-5 mx-2" aria-hidden="true" />
                                Software
                            </a>
                        </li>
                        <li className="mr-2" role="presentation">
                            <a className={"inline-flex p-4 rounded-t-lg border-b-2 border-transparent " +
                                (openTab === 4
                                    ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 dark:border-purple-500"
                                    : "text-gray-500 border-b-2 border-transparent border-gray-100 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700")}
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link4"
                                role="tablist"
                            >
                                <FormsIcon className="w-5 h-5 mx-2" aria-hidden="true" />
                                History
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words ">
                    <div className="flex-auto pt-5">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <TabDetail />
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                Tab Hardware
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                Tab Software
                            </div>
                            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                                Tab History
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}