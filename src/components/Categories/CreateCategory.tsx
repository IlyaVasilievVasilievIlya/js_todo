import { Category } from '../model'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/storeHook';
import { addCategory } from '../../store/categoriesSlice'
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_URL } from '../../consts';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { Input } from '../../ui-kit/Input/Input';
import { Textarea } from '../../ui-kit/Textarea/Textarea';
import { Button } from '../../ui-kit/Button/Button';


export const CreateCategory: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Category>();

    const [modal, setModal] = useState(false);

    const dispatch = useAppDispatch();

    const handleCreate = async (newCategory: Category) => {

        const response = await fetch(`${API_URL}/AddCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newCategory)
        });

        if (response.ok) {
            let responseData = await response.json();
            dispatch(addCategory(responseData));
        }

        closeForm();
    }

    const submitFormHandler: SubmitHandler<Category> = (newCategory, event) => {
        event?.preventDefault();
        handleCreate(newCategory);
    }

    const closeForm = () => {
        setModal(false);
        reset();
    }

    return (
        <>
            <Button className="actionBtn" type="button" onClick={() => setModal(true)}>
                Добавить категорию
            </Button>
            <ConfirmModal isOpened={modal} title="Создание категории" submitText="Создать"
                cancelText="Закрыть" onSubmit={handleSubmit(submitFormHandler)} onClose={closeForm}>
                <div className="modal__content oneCol">
                    <Input
                        placeholder="Введите имя категории"
                        label="Имя"
                        type="text"
                        isRequired={true}
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
                        isRequired={false}
                        errorMessage={errors.description?.message}
                        {...register("description", {
                            required: false,
                            maxLength: {
                                value: 512,
                                message: "Описание не должно содержать более 512 символов"
                            }
                        })} />
                </div>
            </ConfirmModal>
        </>
    )
}