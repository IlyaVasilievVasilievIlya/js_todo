import { Category } from '../model'
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { useAppDispatch } from '../../hooks/storeHook';
import { editCategory } from '../../store/categoriesSlice'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { API_URL } from '../../consts';
import { Input } from '../../ui-kit/Input/Input';
import { Textarea } from '../../ui-kit/Textarea/Textarea';


interface EditCategoryProps {
    category: Category
    onDone: () => void
}

export const EditCategory: React.FC<EditCategoryProps> = ({ category, onDone }: EditCategoryProps) => {

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<Category>({
        defaultValues: category
    });

    const dispatch = useAppDispatch();

    const handleEdit = async (editedCategory: Category) => {

        const response = await fetch(`${API_URL}/UpdateCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(editedCategory)
        });

        if (response.ok)
            dispatch(editCategory(editedCategory));

        closeForm();
    }

    const submitFormHandler: SubmitHandler<Category> = (editedCategory, event) => {
        event?.preventDefault();
        handleEdit(editedCategory);
    }

    const closeForm = () => {
        reset();
        onDone();
    }


    return (
        <ConfirmModal isOpened={true} title="Редактирование категории" submitText="Сохранить"
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
    )
}