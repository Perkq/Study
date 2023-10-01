import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';

const Footer: React.FC = () => (
  <div>
    <span>Отобразить: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      Все
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Активные
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Завершенные
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_NONE}>
      Ничего
    </FilterLink>
  </div>
);

export default Footer
