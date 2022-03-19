import React from 'react';
import { DefaultFilterTypes, FilterValuesType } from '../App';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';

const FilterPanel: React.FC<FilterPanelPropsType> = ({listId, filters, currentFilter, changeFilter}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
            <ButtonGroup variant="outlined" color="success" aria-label="outlined button group">

                {filters.map(el => (
                    <Button key={el.id}
                            variant={el.value === currentFilter ? "contained" : "outlined"} 
                            value={el.value}
                            onClick={() => changeFilter(el.value, listId)} >

                        {el.title}
                        
                    </Button>
                    
                ))}

            </ButtonGroup>
        </Box>
    )
}

export default FilterPanel;

type FilterPanelPropsType = {
    listId: string
    filters: DefaultFilterTypes
    currentFilter: FilterValuesType
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
}

