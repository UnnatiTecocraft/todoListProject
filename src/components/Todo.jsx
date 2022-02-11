import React, { useState } from "react";
import todo from "../images/todoLogo.png";

const Todo = () => {

    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [editIndex, setEditIndex] = useState(null);

    const addItem = () => {
        if (!input) {
            alert("Fill data...");
        } else if (input && !toggle){
            setList(
                list.map((ele) => {
                    if (ele.id == editIndex){
                        return {...list, name: input};
                    }
                    return ele;
                })
            );
            setToggle(true);
            setInput(''); 
            setEditIndex(null);
        } else {
            const allItems = { id: new Date().getTime().toString(), name: input};
            setList([...list, allItems]);
            setInput('');
        }
    };

    const editItem = (index) => {
        const editedData = list.find((ele) => {
            return ele.id === index;
        });
        setToggle(false);
        setInput(editedData.name); 
        setEditIndex(index);  
    }

    const deleteItem = (index) => {
        const deletedData = list.filter((value) => {
            return index !== value.id;
        });
        setList(deletedData);
    };

    const deleteAll = () => {
        setList([]);
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todo} alt="Image not found" />
                        <figcaption>Add your list here 📋</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍️   Add Items...' value={input} onChange={(e) => setInput(e.target.value)}/>
                        {
                            toggle ?  <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> : 
                                    <i className='fa fa-edit add-btn' title='Add Item' onClick={addItem}></i>                       
                        }
                    </div>
                    <div className='showItems'>
                        {
                            list.map((val) => {
                                return (
                                    <div className='eachItem' key={val.id}>
                                        <h3>{val.name}</h3>
                                        <div className='todo-btn'>
                                            <i className='far fa-edit add-btn' title='Edit Item' onClick={() => editItem(val.id)}></i>
                                            <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(val.id)}></i>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={deleteAll}><span>Check List</span></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo;