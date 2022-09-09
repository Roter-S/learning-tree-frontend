import Modal from 'react-bootstrap/Modal';

export default function ModalForm(
    {
        show,
        onHide,
        heading,
        component
    }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="bg-dark">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {heading}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {component}
                </Modal.Body>
            </div>
        </Modal>
    );
}