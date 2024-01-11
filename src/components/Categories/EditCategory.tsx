import { Category } from '../model'
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { useAppDispatch} from '../../hooks/storeHook';
import { editCategory} from '../../store/categoriesSlice'
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_URL } from '../../consts';
import { Input } from '../../ui-kit/Input/Input';

interface EditCategoryProps {
    category: Category
    onDone: () => void
}

export const EditCategory: React.FC<EditCategoryProps> = ({category, onDone}: EditCategoryProps) => {
    
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Category>({
        defaultValues: category 
    });

    const dispatch = useAppDispatch();
    
    const handleEdit = async (editedCategory:Category) => {

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

    const submitFormHandler:SubmitHandler<Category> = (editedCategory, event) => {
        event?.preventDefault();
        handleEdit(editedCategory);
    }

    const closeForm = () => {
        reset();
        onDone();
    }

    return (
        <ConfirmModal isOpened = {true} title = "Редактирование категории" submitText = "Сохранить"
            cancelText = "Закрыть" onSubmit={handleSubmit(submitFormHandler)} 
            onClose={closeForm}>
            <div className = "modal__content__oneCol">
                <Input 
                    name="name"
                    placeholder="Введите имя категории" 
                    label="Имя" 
                    required={true} 
                    type="text" 
                    maxLength={255}
                    register={register}
                    errors={errors}/>
                <div>
                    <label className="label__required">
                        Имя<span>*</span>
                    </label>
                    <input {...register("name", {required: "Поле должно быть обязательным",
                        maxLength: {value: 255, message: "Имя не должно содержать более 255 символов"}})} 
                        type="text"
                        placeholder="Введите имя категории" className={`input ${errors.name?.message ? 'error__field': ''}`}>
                    </input>
                    <span className="modal__content__errorMsg">{errors.name?.message}</span>
                </div>
                <div>
                    <label className="label"> 
                        Описание
                    </label>
                    <textarea {...register("description", {
                        maxLength: {value:512, message: "Описание не должно содержать более 512 символов"}})} 
                        className={`textarea ${errors.description?.message ? 'error__field': ''}`} placeholder="Введите описание категории"/>
                    <span className="modal__content__errorMsg">{errors.description?.message}</span>                    
                </div>
            </div>
        </ConfirmModal>
        )
}