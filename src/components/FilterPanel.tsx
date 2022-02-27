import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';

const FilterPanel: React.FC<FilterPanelPropsType> = ({listId, filters, currentFilter, changeFilter}) => {
    return (
        <div>
            {filters.map(el => (
                <button key={el.id} 
                        value={el.value}
                        onClick={() => changeFilter(el.value, listId)}
                        className={el.value === currentFilter ? "filter_active" : ""} >
                    {el.title}
                </button>
            ))}


            {/* <button>All</button>
            <button>Active</button>
            <button>Completed</button> */}
        </div>
    )
}

export default FilterPanel;

type FilterPanelPropsType = {
    listId: string
    filters: DefaultFilterTypes
    currentFilter: FilterValuesType
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
}

