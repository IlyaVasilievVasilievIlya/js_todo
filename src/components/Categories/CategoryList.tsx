import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { fetchCategoriesAsync } from '../../store/Categories/categoriesActions';
import { Loader } from '../../ui-kit/Loader/Loader';
import { ErrorMessage } from '../ErrorMessage';
import { Category } from '../model';
import '../styles.css';
import { EditCategory } from './EditCategory';
import { SingleCategory } from './SingleCategory';
import { DeleteCategory } from './DeleteCategory';

export const CategoryList: React.FC = () => {

  const {categories, fetchError, loading } = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<Category>({ id: 0, name: '', description: '' });

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  function openDeleteModal(id: number) {
    let selectedCategory = categories.find(el => el.id === id);

    if (selectedCategory) {
      setCategory(selectedCategory);
      setIsOpenDeleteModal(true);
    }
  }

  function openEditModal(id: number) {
    let selectedCategory = categories.find(category => category.id === id);

    if (selectedCategory) {
      setCategory(selectedCategory);
      setIsOpenEditModal(true);
    }
  }

  let categoryList = categories.map(category =>
      <SingleCategory category={category} key={category.id} handleEdit={openEditModal} handleDelete={openDeleteModal}/>);

  return (
    <>
      {!loading && fetchError && <ErrorMessage error={fetchError} />}

      {loading && <Loader />}

      {!loading && !fetchError && <div className="list">{categoryList}</div>}

      {isOpenDeleteModal && <DeleteCategory category={category} onDone={() => setIsOpenDeleteModal(false)}/>}

      {isOpenEditModal && <EditCategory
        category={category} onDone={() => setIsOpenEditModal(false)} />}
    </>
  );
}