import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { editTaskAsync } from '../../store/Tasks/tasksActions';
import { Button } from '../../ui-kit/Button/Button';
import { Input } from '../../ui-kit/Input/Input';
import { ModalActions } from '../../ui-kit/Modal/ModalActions/ModalActions';
import { ModalContainer } from '../../ui-kit/Modal/ModalContainer/ModalContainer';
import { ModalHeader } from '../../ui-kit/Modal/ModalHeader/ModalHeader';
import { OverlayingModal } from '../../ui-kit/Modal/OverlayingModal/OverlayingModal';
import { Textarea } from '../../ui-kit/Textarea/Textarea';
import { Category, IOption, Task } from '../model';
import { Select } from '../../ui-kit/Select/Select';
import { unwrapResult } from '@reduxjs/toolkit';
import { Loader } from '../../ui-kit/Loader/Loader';


interface EditTaskProps {
    task: Task
    onDone: () => void
}

export const EditTask: React.FC<EditTaskProps> = ({ task, onDone }: EditTaskProps) => {

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<Task>(
        { defaultValues: task }
    );

    const { categories } = useAppSelector(state => state.categories);

    const dispatch = useAppDispatch();

    const [error, setError] = useState<string | undefined>(undefined);

    const [loading, setLoading] = useState(false);

    let categoryList = categories.map((elem: Category): IOption => ({ value: elem.id, label: elem.name }));

    const editTask = (editedTask: Task) => {
        editedTask.categoryId ??= 0;
        setLoading(true);
        dispatch(editTaskAsync(editedTask))
        .then(unwrapResult)
        .then(_ => closeForm(), 
        rejected => { setLoading(false); setError(rejected);});
    }

    const closeForm = () => {
        setLoading(false);
        setError(undefined);
        reset();
        onDone();
    }

    return (
        <OverlayingModal isOpened={true} onClose={closeForm}>
            <ModalContainer>
                <ModalHeader title="Редактирование задачи" onClose={closeForm} />
                <div className="modal__content twoCols">
                    <Input
                        label="Имя"
                        type="text"
                        required={true}
                        placeholder='Введите имя задачи'
                        errorMessage={errors.name?.message}
                        {...register("name", {
                            required: `Поле должно быть обязательным`,
                            maxLength: { value: 255, message: "Имя не должно содержать более 255 символов" }
                        })} />
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder='Выберите категорию'
                                options={categoryList}
                                label="Категория"
                                value={value ?? 0}
                                required={false}
                                clearable={true}
                                onChange={onChange} />)} />
                    <Textarea
                        placeholder="Введите описание задачи"
                        label="Описание"
                        required={false}
                        errorMessage={errors.description?.message}
                        {...register("description", {
                            maxLength: { value: 1536, message: "Описание не должно содержать более 1536 символов" }
                        })} />
                </div>
                <ModalActions errorMessage={error}>
                    <Button type="submit" className="primaryBtn" onClick={handleSubmit(editTask)}>{loading? <Loader className='buttonLoading'/> : `Сохранить`}</Button>
                    <Button type="button" className="secondaryBtn" onClick={closeForm}>Закрыть</Button>
                </ModalActions>
            </ModalContainer>
        </OverlayingModal>
    )
}