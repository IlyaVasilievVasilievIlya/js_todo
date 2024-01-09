import {useState} from 'react';

import '../styles.css';
import { Category } from '../model';
import { useCategories } from '../../hooks/categories';
import { SingleCategory } from './SingleCategory';
import { ListElement } from '../ListElement';
import { deleteCategory} from '../../store/categoriesSlice'
import { ErrorMessage } from '../ErrorMessage';
import { Modal } from '../Modal';
import { EditCategory } from './EditCategory';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../hooks/storeHook';

export const CategoryList: React.FC = () => {

    const { categories, error, loading } = useCategories();
    const [category, setCategory] = useState<Category>({id: 0, name: '', description: ''});

    const dispatch = useAppDispatch();

    const [isOnEdit, setIsOnEdit] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);

    const submitDeleteHandler = async (event: React.FormEvent) => {
      event?.preventDefault();

      const response = await fetch(`http://localhost:8089/api/ToDoList/RemoveCategory/${category.id}`);

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

    let categoryList = categories.map((category, index) => 
      <ListElement handleEdit={openEditModal} handleDelete={openDeleteModal} key={index} id={category.id}> 
        <SingleCategory category = {category} key={index} />
      </ListElement>);
    
    return (
      <>
        {error? <ErrorMessage error={error}/> : <div className="list">{categoryList}</div>}

        {loading && <Loader/>}

        {deleteModal && category && <Modal title = "Удаление категории" submitText = "Да"
          cancelText = "Нет" onSubmit={submitDeleteHandler} onCancel={() => setDeleteModal(false)}>
          <span>Вы уверены, что хотите удалить категорию "{category.name}"?</span>
          </Modal>}

        {isOnEdit && category && <EditCategory 
          category= {category} onDone={() => setIsOnEdit(false)} />}
      </>
    );
}