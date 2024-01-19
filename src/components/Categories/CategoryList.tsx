import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { deleteCategoryAsync, fetchCategoriesAsync } from '../../store/Categories/categoriesActions';
import { Loader } from '../../ui-kit/Loader/Loader';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { ErrorMessage } from '../ErrorMessage';
import { Category } from '../model';
import '../styles.css';
import { EditCategory } from './EditCategory';
import { SingleCategory } from './SingleCategory';

export const CategoryList: React.FC = () => {

  const {categories, error, loading} = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<Category>({ id: 0, name: '', description: '' });

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);


  const deleteCategory = () => {

    dispatch(deleteCategoryAsync(category.id));

    setIsOpenDeleteModal(false);
  }

  function openDeleteModal(id: number) {
    let selectedCategory = categories.find(el => el.id == id);

    if (selectedCategory) {
      setCategory(selectedCategory);
      setIsOpenDeleteModal(true);
    }
  }

  function openEditModal(id: number) {
    let selectedCategory = categories.find(category => category.id == id);

    if (selectedCategory) {
      setCategory(selectedCategory);
      setIsOpenEditModal(true);
    }
  }

  let categoryList = categories.map(category =>
      <SingleCategory category={category} key={category.id} handleEdit={openEditModal} handleDelete={openDeleteModal}/>);

  return (
    <>
      {error && <ErrorMessage error={error} />}

      {loading && <Loader />}

      {!loading && !error && <div className="list">{categoryList}</div>}

      <ConfirmModal
        isOpened={isOpenDeleteModal}
        title="Удаление категории"
        submitText="Да"
        cancelText="Нет"
        onSubmit={() => deleteCategory()}
        onClose={() => setIsOpenDeleteModal(false)}>
        <span>Вы уверены, что хотите удалить категорию "{category.name}"?</span>
      </ConfirmModal>

      {isOpenEditModal && <EditCategory
        category={category} onDone={() => setIsOpenEditModal(false)} />}
    </>
  );
}