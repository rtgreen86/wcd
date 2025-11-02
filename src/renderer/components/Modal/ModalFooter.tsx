import {ModalTypes} from './ModalTypes';

export const ModalFooter = ({
  modalTypes,
  captionCancel = 'Cancel',
  captionOK = 'OK'
}: {
  modalTypes: ModalTypes,
  captionCancel?: string,
  captionOK?: string,
}) => (
  <div className="modal-footer">
    {modalTypes & ModalTypes.ButtonCancel ? <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">{captionCancel}</button> : null}
    {modalTypes & ModalTypes.ButtonOK ? <button type="submit" className='btn btn-primary'>{captionOK}</button>: null}
  </div>
);
