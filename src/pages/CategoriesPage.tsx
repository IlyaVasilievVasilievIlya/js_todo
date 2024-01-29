import { HeaderElement } from '../components/HeaderElement';
import { CategoryList } from '../components/Categories/CategoryList';
import { CreateCategory } from '../components/Categories/CreateCategory';

export function CategoriesPage() {

  return (
    <>
       <HeaderElement>
          <CreateCategory/>
       </HeaderElement>
       <CategoryList/>
    </>
  );
}