import { Category } from './category.model';

export interface CategoryLvl1 {
    id : string;
    title: string;
    content : string;
    imagePath : string,
    parentCategory :Category
}