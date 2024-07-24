import styled from 'styled-components';
import Card from '../core/card/CardStyle';

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Category = styled.span`
  background-color: #2196F3;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const CategoryView = () => {
    const categories = ['Salary', 'Rent', 'Groceries', 'Utilities', 'Entertainment'];

    return (
        <Card bgColor="#FFC107">
            <h2>Categories</h2>
            <CategoryList>
                {categories.map((category, index) => (
                    <Category key={index}>{category}</Category>
                ))}
            </CategoryList>
        </Card>
    );
};

export default CategoryView;