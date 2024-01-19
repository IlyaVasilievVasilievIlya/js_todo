import { Category } from '../model'
import { useAppDispatch } from '../../hooks/storeHook';
import { useForm } from 'react-hook-form';
import { Input } from '../../ui-kit/Input/Input';
import { Textarea } from '../../ui-kit/Textarea/Textarea';
import { editCategoryAsync } from '../../store/Categories/categoriesActions'
import { OverlayingModal } from '../../ui-kit/Modal/OverlayingModal/OverlayingModal';
import { ModalContainer } from '../../ui-kit/Modal/ModalContainer/ModalContainer';
import { ModalHeader } from '../../ui-kit/Modal/ModalHeader/ModalHeader';
import { ModalActions } from '../../ui-kit/Modal/ModalActions/ModalActions';
import { Button } from '../../ui-kit/Button/Button';


interface EditCategoryProps {
    category: Category
    onDone: () => void
}

export const EditCategory: React.FC<EditCategoryProps> = ({ category, onDone }: EditCategoryProps) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Category>({
        defaultValues: category
    });

    const dispatch = useAppDispatch();

    const editCategory = (editedCategory: Category) => {
        dispatch(editCategoryAsync(editedCategory));
        closeForm();
    }

    const closeForm = () => {
        reset();
        onDone();
    }

    return (
        <OverlayingModal isOpened={true} onClose={closeForm}>
            <ModalContainer>
                <ModalHeader title="Редактирование категории" onClose={closeForm} />
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
                <ModalActions>
                    <Button type="submit" className="primaryBtn" onClick={handleSubmit(editCategory)}>Сохранить</Button>
                    <Button type="button" className="secondaryBtn" onClick={closeForm}>Закрыть</Button>
                </ModalActions>
            </ModalContainer>
        </OverlayingModal>
    )
}