import {useState} from 'react';

import '../styles.css';
import { Category } from '../model';
import { useCategories } from '../../hooks/categories';
import { SingleCategory } from './SingleCategory';
import { ListElement } from '../ListElement';
import { deleteCategory} from '../../store/categoriesSlice'
import { ErrorMessage } from '../ErrorMessage';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { EditCategory } from './EditCategory';
import { Loader } from '../../ui-kit/Loader/Loader';
import { useAppDispatch } from '../../hooks/storeHook';
import { API_URL } from '../../consts';

export const CategoryList: React.FC = () => {

    const { categories, error, loading } = useCategories();
    const [category, setCategory] = useState<Category>({id: 0, name: '', description: ''});

    const dispatch = useAppDispatch();

    const [isOnEdit, setIsOnEdit] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);

    const submitDeleteHandler = async () => {

      const response = await fetch(`${API_URL}/RemoveCategory/${category.id}`);

      if (response.ok)
          dispatch(deleteCategory(category.id));
  
      setDeleteModal(false);
    }

    function openDeleteModal(id:number) {
      let selectedCategory = categories.find(el => el.id == id);

      if (selectedCategory){
        setCategory(selectedCategory);
        setDeleteModal(true);
      }
    }
  
    function openEditModal(id:number) {
      let selectedCategory = categories.find(category => category.id == id);

      if (selectedCategory){
        setCategory(selectedCategory);
        setIsOnEdit(true);
      }
    }

    let categoryList = categories.map(category => 
      <ListElement handleEdit={openEditModal} handleDelete={openDeleteModal} key={category.id} id={category.id}> 
        <SingleCategory category = {category} key={category.id} />
      </ListElement>);
    
    return (
      <>
        {error && <ErrorMessage error={error}/>}
        
        <div className="list">{categoryList}</div>

        {loading && <Loader/>}

        <ConfirmModal 
          isOpened={deleteModal} 
          title = "Удаление категории" 
          submitText = "Да"
          cancelText = "Нет" 
          onSubmit={() => submitDeleteHandler()} 
          onClose={() => setDeleteModal(false)}>
            <span>Вы уверены, что хотите удалить категорию "{category.name}"?</span>
        </ConfirmModal>

        {isOnEdit && <EditCategory 
          category= {category} onDone={() => setIsOnEdit(false)} />}
      </>
    );
}