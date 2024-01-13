import { Category, IOption, Task } from '../model'
import { useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import { editTaskAsync } from '../../store/tasksSlice'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect } from 'react';
import { API_URL } from '../../public/consts';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { Textarea } from '../../ui-kit/Textarea/Textarea';
import { Input } from '../../ui-kit/Input/Input';


interface EditTaskProps {
    task: Task
    onDone: () => void
}

export const EditTask: React.FC<EditTaskProps> = ({task, onDone}: EditTaskProps) => {
    
    const {register, handleSubmit, setValue, formState: {errors}, reset, control} = useForm<Task>(
        {defaultValues: {...task, categoryId: undefined}}
    );

    const {categories} = useAppSelector(state => state.categories);

    const dispatch = useAppDispatch();

    let categoryList = categories.map((elem: Category): IOption => ({value:elem.id, label: elem.name}));
    
    const editTask = (editedTask: Task) => {
        editedTask.categoryId ??= 0;
        dispatch(editTaskAsync(editedTask));
        closeForm();
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
        <ConfirmModal isOpened={true} title= "Редактирование задачи" submitText = "Сохранить" 
            cancelText = "Закрыть" onSubmit={handleSubmit(editTask)} onClose={closeForm}>
            <div className = "modal__content twoCols">
                <Input
                    label="Имя"
                    type="text"
                    isRequired={true}
                    placeholder='Введите имя задачи'
                    errorMessage={errors.name?.message}
                    {...register("name", {required: `Поле должно быть обязательным`, 
                                            maxLength: {value: 255, message: "Имя не должно содержать более 255 символов"}})}/>
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
                <Textarea
                    placeholder="Введите описание задачи"
                    label="Описание"
                    isRequired={false}
                    errorMessage={errors.description?.message}
                    {...register("description", {
                        maxLength: {value:1536, message: "Описание не должно содержать более 1536 символов"}})} />
            </div>
        </ConfirmModal>
        )
}