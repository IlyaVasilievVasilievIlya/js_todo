import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { addTaskAsync } from '../../store/Tasks/tasksActions';
import { Button } from '../../ui-kit/Button/Button';
import { Input } from '../../ui-kit/Input/Input';
import { ModalActions } from '../../ui-kit/Modal/ModalActions/ModalActions';
import { ModalContainer } from '../../ui-kit/Modal/ModalContainer/ModalContainer';
import { ModalHeader } from '../../ui-kit/Modal/ModalHeader/ModalHeader';
import { OverlayingModal } from '../../ui-kit/Modal/OverlayingModal/OverlayingModal';
import { Textarea } from '../../ui-kit/Textarea/Textarea';
import { IOption, Task } from '../model';


export const CreateTask: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<Task>();
    const { categories } = useAppSelector(state => state.categories);

    const [modal, setModal] = useState(false);

    const dispatch = useAppDispatch();

    let categoryList = categories.map((category): IOption => ({ value: category.id, label: category.name }));

    const createTask = (newTask: Task) => {
        newTask.categoryId ??= 0;
        dispatch(addTaskAsync(newTask));
        closeForm();
    }

    const closeForm = () => {
        setModal(false);
        reset();
    }

    const getValue = (categoryId: number) =>
        categoryId ? categoryList.find(category => category.value === categoryId) : 0;

    return (
        <>
            <Button className='actionBtn' type="button" onClick={() => setModal(true)}>
                Добавить задачу
            </Button>
            <OverlayingModal isOpened={modal} onClose={closeForm}>
                <ModalContainer>
                    <ModalHeader title="Создание задачи" onClose={closeForm} />
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
                            })}
                        />
                        <div>
                            <label className="label" >
                                Категория
                            </label>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        classNamePrefix='custom-select'
                                        placeholder='Выберите категорию'
                                        className="select"
                                        options={categoryList}
                                        value={getValue(value)}
                                        onChange={(newValue) => onChange((newValue as IOption)?.value)}
                                        isClearable={true}
                                        isSearchable={false} />)} />
                        </div>
                        <Textarea
                            placeholder="Введите описание задачи"
                            label="Описание"
                            required={false}
                            errorMessage={errors.description?.message}
                            {...register("description", {
                                maxLength: { value: 1536, message: "Описание не должно содержать более 1536 символов" }
                            })}
                        />
                    </div>
                    <ModalActions>
                        <Button type="submit" className="primaryBtn" onClick={handleSubmit(createTask)}>Создать</Button>
                        <Button type="button" className="secondaryBtn" onClick={closeForm}>Закрыть</Button>
                    </ModalActions>
                </ModalContainer>
            </OverlayingModal >
        </>
    )
}