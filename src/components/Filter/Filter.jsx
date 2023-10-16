import { Div, Label, Input } from './Filter.styled';

// import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'redux/filter/selectors';
import { changeFilter } from 'redux/filter/filterSlice';

// const filterInputId = nanoid();

// Компонент фільтрації контактів
export const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();

  // Обробник зміни значення фільтра
  const onChange = event => {
    const normalizedValue = event.target.value.toLowerCase();

    dispatch(changeFilter(normalizedValue));
  };

  return (
    <Div>
      <Label>
        Find contacts by name
        <Input
          type="text"
          value={value}
          onChange={onChange}
          // id={filterInputId}
        />
      </Label>
    </Div>
  );
};
