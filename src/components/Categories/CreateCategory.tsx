import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/storeHook';
import { addCategoryAsync } from '../../store/Categories/categoriesActions';
import { Button } from '../../ui-kit/Button/Button';
import { Input } from '../../ui-kit/Input/Input';
import { Loader } from '../../ui-kit/Loader/Loader';
import { ModalActions } from '../../ui-kit/Modal/ModalActions/ModalActions';
import { ModalContainer } from '../../ui-kit/Modal/ModalContainer/ModalContainer';
import { ModalHeader } from '../../ui-kit/Modal/ModalHeader/ModalHeader';
import { OverlayingModal } from '../../ui-kit/Modal/OverlayingModal/OverlayingModal';
import { Textarea } from '../../ui-kit/Textarea/Textarea';
import { Category } from '../model';

export const CreateCategory: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Category>();

    const [modal, setModal] = useState(false);

    const [error, setError] = useState<string | undefined>(undefined);

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();


    const createCategory = (newCategory: Category) => {
        setLoading(true);
        dispatch(addCategoryAsync(newCategory))
        .then(unwrapResult)
        .then(_ => closeForm(), 
        rejected => { setLoading(false); setError(rejected);});
    }
    
    const closeForm = () => {
        setLoading(false);
        setError(undefined);
        setModal(false);
        reset();
    }

    console.log('&&');
    return (
        <>
            <Button className="actionBtn" type="button" onClick={() => setModal(true)}>
                Добавить категорию
            </Button>
            <OverlayingModal isOpened={modal} onClose={closeForm}>
                <ModalContainer>
                    <ModalHeader title="Создание категории" onClose={closeForm}/>
                    <div className="modal__content oneCol">
                        <Input
                            placeholder="Введите имя категории"
                            label="Имя"
                            type="text"
                            required={true}
                            errorMessage={errors.name?.message}
                            {...register("name", {
                                required: 'Поле обязательно для ввода',
                                maxLength: {
                                    value: 255,
                                    message: "Имя не должно содержать более 255 символов"
                                }
                            })} />
                        <Textarea
                            placeholder="Введите описание категории"
                            label="Описание"
                            required={false}
                            errorMessage={errors.description?.message}
                            {...register("description", {
                                required: false,
                                maxLength: {
                                    value: 512,
                                    message: "Описание не должно содержать более 512 символов"
                                }
                            })} />
                    </div>
                    <ModalActions errorMessage={error}>
                        <Button type="submit" className="primaryBtn" onClick={handleSubmit(createCategory)}>{loading? <Loader className='buttonLoading'/> : `Создать`}</Button>
                        <Button type="button" className="secondaryBtn" onClick={closeForm}>Закрыть</Button>
                    </ModalActions>     
                </ModalContainer>
            </OverlayingModal>
        </>
    )
}