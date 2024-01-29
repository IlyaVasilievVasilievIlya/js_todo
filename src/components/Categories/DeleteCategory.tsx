import { useState } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/storeHook';
import { deleteCategoryAsync } from '../../store/Categories/categoriesActions';
import { Button } from '../../ui-kit/Button/Button';
import { Loader } from '../../ui-kit/Loader/Loader';
import { ModalActions } from '../../ui-kit/Modal/ModalActions/ModalActions';
import { ModalContainer } from '../../ui-kit/Modal/ModalContainer/ModalContainer';
import { ModalHeader } from '../../ui-kit/Modal/ModalHeader/ModalHeader';
import { OverlayingModal } from '../../ui-kit/Modal/OverlayingModal/OverlayingModal';
import { Category } from '../model';
import '../styles.css';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';

interface DeleteCategoryProps {
    category: Category
    onDone: () => void
}

export const DeleteCategory: React.FC<DeleteCategoryProps> = ({ category, onDone }: DeleteCategoryProps) => {

    const dispatch = useAppDispatch();

    const [error, setError] = useState<string | undefined>();

    const [loading, setLoading] = useState(false);

    const deleteCategory = () => {
        setLoading(true);
        dispatch(deleteCategoryAsync(category.id))
            .then(unwrapResult)
            .then(_ => closeDeleteForm(),
            rejected => { setLoading(false); setError(rejected);});
    }

    const closeDeleteForm = () => {
        setLoading(false);
        setError(undefined);
        onDone();
    }

    return (
        <ConfirmModal 
            isOpened={true} 
            onClose={closeDeleteForm} 
            title="Удаление категории" 
            onSubmit={deleteCategory} 
            error={error} 
            submitText={loading ? <Loader className='buttonLoading' /> : `Да`}
            cancelText='Нет'>
            <span className="modal__delete-message">Вы уверены, что хотите удалить категорию "{category.name}"?</span>
        </ConfirmModal>
    );
}