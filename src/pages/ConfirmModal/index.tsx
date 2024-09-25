import React from "react"
import Modal from "../../Common/Components/Modal";
import {ConfirmModalProps} from "../../Common/utils/common";


const ConfirmModal = ({
                          show,
                          onHide,
                          body,
                          onSubmit
} : ConfirmModalProps) => {

    return (
        <React.Fragment>
            <Modal
                show={show} onHide={onHide} id="extraSmallModal" modal-center="true"
                   className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                   dialogClassName="w-screen md:w-[20rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                              closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">Подтверждение</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    {body}
                    {/*<p className="text-slate-500 dark:text-zink-200">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic.</p>*/}
                </Modal.Body>
                <Modal.Footer
                    className="flex items-center space-x-2 justify-between p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
                    <button type="button"
                            onClick={onSubmit}
                            className="text-lime-600 w-full font-semibold bg-lime-100  btn hover:text-white hover:bg-lime-600 focus:text-white focus:bg-lime-600 focus:ring focus:ring-lime-100 active:text-white active:bg-lime-600 active:ring active:ring-lime-100 dark:ring-lime-400/10">
                        Да
                    </button>
                    <button type="button"
                            onClick={onHide}
                            className="text-pink-600 w-full font-semibold bg-pink-100  btn hover:text-white hover:bg-pink-600 focus:text-white focus:bg-pink-600 focus:ring focus:ring-pink-100 active:text-white active:bg-pink-600 active:ring active:ring-pink-100 dark:ring-pink-400/10">
                        Отмена
                    </button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default ConfirmModal;
