import { useCategories } from '../../hooks/categories'
import { Category, IOption, Task } from '../model'
import { useState } from 'react'
import { Modal } from '../Modal';
import { useAppDispatch} from '../../hooks/storeHook';
import { addTask} from '../../store/tasksSlice'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { API_URL } from '../../consts';


export const CreateTask: React.FC = () => {
    
    const {register, handleSubmit, formState: {errors}, reset, control} = useForm<Task>();
    const {categories} = useCategories();
    
    const [modal, setModal] = useState(false);

    const dispatch = useAppDispatch();
    
    let categoryList = categories.map((category): IOption =>  ({value: category.id,  label: category.name}));

    const handleCreate = async (newTask: Task) => {

        console.log(newTask);
        const response = await fetch(`${API_URL}/AddTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newTask)
        });
        
        if (response.ok){
            let responseData = await response.json();
            dispatch(addTask(responseData));
        }

        closeForm();
    }

    const submitFormHandler: SubmitHandler<Task> = (newTask, event) => {

        console.log(categoryList);
        event?.preventDefault();
        newTask.categoryId ??= 0;
        handleCreate(newTask);
    }

    const closeForm = () => {
        setModal(false);
        reset();
    }

    const getValue = (categoryId: number) => 
        categoryId ? categoryList.find(category => category.value === categoryId) : 0;

return (
    <>
        <button  className="header__action-btn" onClick={() => setModal(true)}>
            Добавить задачу
        </button>
        { modal && 
            <Modal title= "Создание задачи" submitText = "Создать" 
                cancelText = "Закрыть" onSubmit={handleSubmit(submitFormHandler)} onCancel={closeForm}>
                <div className = "modal__content__twoCols">
                    <div> 
                        <label className="label__required">
                            Имя<span>*</span>
                        </label>
                        <input {...register("name", {required: `Поле должно быть обязательным`, 
                                                     maxLength: {value: 255, message: "Имя не должно содержать более 255 символов"}})} type="text"
                            placeholder="Введите имя задачи" className={`input ${errors.name?.message ? ' error__field' : ''}`} > 
                        </input>
                        <span className="modal__content__errorMsg">{errors.name?.message}</span>
                    </div>
                    <div>
                        <label className="label" >
                            Категория
                        </label>
                        <Controller
                            control = {control}
                            name="categoryId"
                            render= {({ field: {onChange, value}}) => (
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder='Выберите категорию'
                                    className="select"
                                    options={categoryList}
                                    value={getValue(value)}
                                    onChange = {(newValue) => onChange((newValue as IOption)?.value)}
                                    isClearable={true}
                                    isSearchable={false}/>)}/>
                    </div>
                    <div>
                        <label className="label">
                            Описание
                        </label>
                        <textarea {...register("description", {
                            maxLength: {value:1536, message: "Описание не должно содержать более 1536 символов"}})} 
                            placeholder="Введите описание задачи" className={`textarea ${errors.description?.message ? ' error__field' : ''}`}/>
                        <span className={`modal__content__errorMsg`}>
                            {errors.description?.message}
                        </span>    
                    </div>
                </div>
            </Modal>
        }
    </>
    )
}