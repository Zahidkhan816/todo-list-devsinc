import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Completed from './Completed';

const NewtodoList = () => {
    // main state
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: "",
        title: "",
        completed: false
    });
    useEffect(() => {
        getLocalStorage();
    }, []);

    // get data from localStorage with if else states ....
    const getLocalStorage = () => {
        const localData = localStorage.getItem('List');
        const parsedLocalData = JSON.parse(localData);
        if (parsedLocalData) {
            setData(parsedLocalData);
        } else {
            axios.get("https://jsonplaceholder.typicode.com/todos")
                .then(resp => {
                    setData(resp.data);
                })
                .catch(error => {
                    console.log(error, "error");
                });
        }
    };
    // set data in localStorage where our  main state will be update...
    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(data));
    }, [data]);

    // adding data...
    const addData = () => {
        if (newData.title === "") {
            alert("some fields are empty");
        } else {
            const updatedData = [...data, newData];
            setData(updatedData);
            setNewData({ id: "", title: "" });
        }
    };
    // delete data from localStorage ....
    const deleteItem = (id) => {
        const updatedItems = data.filter(item => item.id !== id);
        setData(updatedItems);
    };
    // UPdation of daTA
    const [editItemId, setEditItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openEditModal = (id) => {
        const selectedItem = data.find(item => item.id === id);
        setEditItemId(id);
        setNewData({ id: selectedItem.id, title: selectedItem.title });
        setIsModalOpen(true);
    };
    const updateItem = () => {
        setNewData({ title: "" })
        const updatedData = data.map(item => {
            if (item.id === editItemId) {
                return { ...item, title: newData.title };
            }
            return item;
        });
        setData(updatedData);
        setEditItemId(null);
        setIsModalOpen(false);
    };

    // mark as completed or uncompleted
    const toggleCompletion = (id) => {
        const updatedData = data.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setData(updatedData);
    };
    return (
        <>
            <div className="form-container">
                <div className="row">
                    <div className="col-lg-12" style={{ textAlign: "center" }}>
                        <input
                            type="text"
                            value={isModalOpen === false ? newData.title : ""}
                            placeholder='Enter Your Task'
                            onChange={(e) => setNewData({ ...newData, id: Number(data.length + 2), title: e.target.value })}
                        />

                    </div>
                </div>
                <br />
                {
                    isModalOpen === false &&
                    <div className="row" style={{ textAlign: "center" }}>
                        <div className="col-lg-12">
                            <button className='btn' onClick={addData}>Submit</button>
                        </div>
                    </div>
                }
            </div>
            <div>
                <div style={{ textAlign: "center" }}>
                    <h3>Todo list</h3>
                </div>
                <table>
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th>Sr#</th>
                            <th>Task</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id === editItemId ? (
                                    <input
                                        type="text"
                                        value={newData.title}
                                        onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                                    />
                                ) : (
                                    item.title
                                )}</td>
                                <td className={item.completed == true ? 'text-success font-weight-bold' : 'text-danger font-weight-bold'}>
                                    {item.completed == true ? "Completed" : "Non Completed"}
                                </td>
                                <td>
                                    {item.id === editItemId ? (
                                        <>
                                            <button onClick={updateItem}>Update</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='editbtn' onClick={() => openEditModal(item.id)}><i className="fas fa-edit text-success"></i></button>
                                            <button className='deletebtn' onClick={() => deleteItem(item.id)}><i class="fa fa-trash text-danger" aria-hidden="true"></i></button>
                                        </>
                                    )}
                                    <button onClick={() => toggleCompletion(item.id)}>
                                        {item.completed ? "Mark Uncompleted" : "Mark Completed"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default NewtodoList;
