import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeTodolistFilterAC } from '../../bll/todoListsReducer';
import { v1 } from 'uuid';



let defaultFilters = [
    {title:'All', value:'all', id: v1()}, 
    {title: 'Active', value:'active', id: v1()}, 
    {title: 'Completed', value:'completed', id: v1()}
] as DefaultFiltersType

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DefaultFiltersType = Array<{title: string, value: FilterValuesType, id: string}>


const FilterPanel: React.FC<FilterPanelPropsType> = React.memo( ({todoListId, currentFilter}) => {
    // console.log('FilterPanel rendered');
    const dispatch = useDispatch();

    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter) );
    }

    const mappedButtons = defaultFilters.map(el => (
        <Button key={el.id}
                variant={el.value === currentFilter ? "contained" : "outlined"} 
                value={el.value}
                onClick={() => changeTodoListFilter(todoListId, el.value)} >
            {el.title}
        </Button>
        
    ))

    
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
            <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
                {mappedButtons}
            </ButtonGroup>
        </Box>
    )
})

export default FilterPanel;

type FilterPanelPropsType = {
    todoListId: string
    currentFilter: FilterValuesType
}

