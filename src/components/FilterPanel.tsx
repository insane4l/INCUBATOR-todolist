import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeTodolistFilterAC } from '../bll/todoListsReducer';

const FilterPanel: React.FC<FilterPanelPropsType> = ({todoListId, filters, currentFilter}) => {
    
    const dispatch = useDispatch();

    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter) )
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
            <ButtonGroup variant="outlined" color="success" aria-label="outlined button group">

                {filters.map(el => (
                    <Button key={el.id}
                            variant={el.value === currentFilter ? "contained" : "outlined"} 
                            value={el.value}
                            onClick={() => changeTodoListFilter(todoListId, el.value)} >

                        {el.title}
                        
                    </Button>
                    
                ))}

            </ButtonGroup>
        </Box>
    )
}

export default FilterPanel;

type FilterPanelPropsType = {
    todoListId: string
    filters: DefaultFilterTypes
    currentFilter: FilterValuesType
}

