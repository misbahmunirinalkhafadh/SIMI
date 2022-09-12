import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select } from '@windmill/react-ui'
import { MailIcon } from '../../assets/icons'

function ModalFormUser({ closeModal, isModalOpen }) {
    
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Form Data User</ModalHeader>
                <ModalBody>
                    <Label>
                        <span>Name<small className='text-red-600'>*</small></span>
                        <Input className="mt-1" placeholder="Type here..." />
                    </Label>
                    <Label className="mt-3">
                        <span>Job Title<small className='text-red-600'>*</small></span>
                        <Input className="mt-1" placeholder="Type here..." />
                    </Label>
                    <Label className="mt-3">
                        <span>Email Address<small className='text-red-600'>*</small></span>
                        {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                        <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                            <input
                                className="block w-full pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                placeholder="Type here..."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                                <MailIcon className="w-5 h-5" aria-hidden="true" />
                            </div>
                        </div>
                    </Label>
                    <Label className="mt-3">
                        <span>Department<small className='text-red-600'>*</small></span>
                        <Input className="mt-1" placeholder="Type here..." />
                    </Label>
                    <Label className="mt-3">
                        <span>Status<small className='text-red-600'>*</small></span>
                        <Select className="mt-1">
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                            <option>Option 5</option>
                        </Select>
                    </Label>
                </ModalBody>
                <ModalFooter>
                    {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
                    <div className="hidden sm:block">
                        <Button layout="outline" onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>
                    <div className="hidden sm:block">
                        <Button>Save</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large">
                            Save
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalFormUser