import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';

const FilterPanel: React.FC<FilterPanelPropsType> = ({filters, currentFilter, changeFilter}) => {
    return (
        <div>
            {filters.map(el => (
                <button key={el.id} 
                        value={el.value}
                        onClick={() => changeFilter(el.value)}
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
    filters: DefaultFilterTypes
    currentFilter: FilterValuesType
    changeFilter: (filter: FilterValuesType) => void
}

