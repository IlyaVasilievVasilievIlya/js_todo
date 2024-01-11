import { useCategories } from '../../hooks/categories'
import { Category, IOption, Task } from '../model'
import { Modal } from '../Modal';
import { useAppDispatch} from '../../hooks/storeHook';
import { editTask} from '../../store/tasksSlice'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect } from 'react';
import { API_URL } from '../../consts';


interface EditTaskProps {
    task: Task
    onDone: () => void
}

export const EditTask: React.FC<EditTaskProps> = ({task, onDone}: EditTaskProps) => {
    
    const {register, handleSubmit, setValue, formState: {errors}, reset, control} = useForm<Task>(
        {defaultValues: {...task, categoryId: undefined}}
    );

    const {categories} = useCategories();

    const dispatch = useAppDispatch();

    let categoryList = categories.map((elem: Category): IOption => ({value:elem.id, label: elem.name}));
    
    const handleEdit = async (editedTask: Task) => {
        console.log(editedTask);
        const response = await fetch(`${API_URL}/UpdateTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(editedTask)
        });
        
        if (response.ok)
            dispatch(editTask(editedTask));
     
        closeForm();
    }

    const submitFormHandler: SubmitHandler<Task> = (editedTask, event) => {

        console.log(categoryList);
        event?.preventDefault();
        editedTask.categoryId ??= 0;
        handleEdit(editedTask);
    }

    const closeForm = () => {
        reset();
        onDone();
    }

    useEffect(() => {
        setValue('categoryId', task.categoryId);
      }, []);

    const getValue = (categoryId: number) => 
        categoryId ? categoryList.find(category => category.value === categoryId) : null

    return (
        <Modal title= "Редактирование задачи" submitText = "Сохранить" 
            cancelText = "Закрыть" onSubmit={handleSubmit(submitFormHandler)} onCancel={closeForm}>
            <div className = "modal__content__twoCols">
                <div>
                    <label className="label__required">
                        Имя<span>*</span>
                    </label>
                    <input {...register("name", {required: "Поле должно быть обязательным",
                        maxLength: {value: 255, message: "Имя не должно содержать более 255 символов"}
                        })} 
                        type="text"
                        placeholder="Введите имя задачи" className={`input ${errors.name?.message ? 'error__field': ''}`}>
                    </input>
                    <span className="modal__content__errorMsg">{errors.name?.message}</span>
                </div>
                <div>
                    <label className="label">
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
                        className={`textarea ${errors.description?.message ? 'error__field': ''}`} placeholder="Введите описание задачи"/>
                    <span className="modal__content__errorMsg">{errors.description?.message}</span>                    
                </div>
            </div>
        </Modal>
        )
}