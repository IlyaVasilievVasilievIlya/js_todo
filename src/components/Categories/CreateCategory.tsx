import { Category} from '../model'
import { useState } from 'react'
import { Modal } from '../Modal';
import { useAppDispatch } from '../../hooks/storeHook';
import { addCategory} from '../../store/categoriesSlice'
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_URL } from '../../consts';


export const CreateCategory: React.FC = () => {
    
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Category>();
    
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
        
        if (response.ok){
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
        <button className="header__action-btn" onClick={() => setModal(true)}>
            Добавить категорию
        </button>
        { modal && 
            <Modal title= "Создание категории" submitText = "Создать"
                cancelText = "Закрыть" onSubmit={handleSubmit(submitFormHandler)} onCancel={closeForm}>
                <div className = "modal__content__oneCol">
                    <div>
                        <label className="label__required">
                            Имя<span>*</span>
                        </label>
                        <input {...register("name", {required: "Поле должно быть обязательным", 
                                                     maxLength: {value: 255, message: "Имя не должно содержать более 255 символов"}})} type="text" 
                            placeholder="Введите имя категории" className={`input ${errors.name?.message ? 'error__field': ''}`}>
                        </input>
                        <span className="modal__content__errorMsg">{errors.name?.message}</span>
                    </div>
                    <div>
                        <label className="label">
                            Описание
                        </label>
                        <textarea {...register("description" , {
                            maxLength: {value:512, message: "Описание не должно содержать более 512 символов"}})} 
                            className={`textarea ${errors.description?.message ? 'error__field': ''}`} placeholder="Введите описание категории"/>
                        <span className="modal__content__errorMsg">{errors.description?.message}</span>                    
                    </div>
                </div>
            </Modal>
        }
    </>
    )
}