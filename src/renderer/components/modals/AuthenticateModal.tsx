import React from 'react';
import FormModal from './FormModal';

export default function AuthenticateModal({
  id
}: {
  id: string
}) {
  return (
    <FormModal id={id} title="Enter PIN code" okBtnCaption="Open">Hello World!</FormModal>
  );
}
