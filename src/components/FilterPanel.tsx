import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const FilterPanel: React.FC<FilterPanelPropsType> = ({listId, filters, currentFilter, changeFilter}) => {
    return (
        <ButtonGroup variant="outlined" color="success" aria-label="outlined button group" sx={{ mt: 3 }}>

            {filters.map(el => (
                <Button key={el.id}
                        variant={el.value === currentFilter ? "contained" : "outlined"} 
                        value={el.value}
                        onClick={() => changeFilter(el.value, listId)} >

                    {el.title}
                    
                </Button>
                
            ))}

        </ButtonGroup>
    )
}

export default FilterPanel;

type FilterPanelPropsType = {
    listId: string
    filters: DefaultFilterTypes
    currentFilter: FilterValuesType
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
}

