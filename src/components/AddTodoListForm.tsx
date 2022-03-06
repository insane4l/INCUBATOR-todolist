import React from 'react';
import AddNewItemForm from './AddNewItemForm';

const AddTodoListForm: React.FC<AddTodoListFormPropsType> = ({addNewTodoList}) => {



    return (
        <div className="add_todolist_form_wrapper">
            <h2>Add New To-Do List</h2>
            <AddNewItemForm addItem={addNewTodoList}/>
        </div>
    )
}

export default AddTodoListForm;


type AddTodoListFormPropsType = {
    addNewTodoList: (title: string) => void
}