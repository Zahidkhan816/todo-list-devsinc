import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Completed from './Completed';

const NewtodoList = () => {
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: "",
        title: "",
        completed:false
    });
    useEffect(() => {
        getLocalStorage();
    }, []);

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

    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(data));
    }, [data]);

    const addData = () => {
        if (newData.title === "") {
            alert("some fields are empty");
        } else {
            const updatedData = [...data, newData];
            setData(updatedData);
            setNewData({ id: "", title: "" });
        }
    };

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
                return {...item, title:  newData.title   };
            }
            return item;
        });
        setData(updatedData);
        setEditItemId(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="form-container">
                <div className="row">
                    <div className="col-lg-12" style={{textAlign:"center"}}>
                        <input
                            type="text"
                            value={  isModalOpen === false ?newData.title:""}
                            placeholder='Enter Your Task'
                            onChange={(e) => setNewData({ ...newData, id: Number(data.length + 2), title: e.target.value })}
                        />

                    </div>
                </div>
                <br />
                {
                       isModalOpen === false &&
                <div className="row" style={{textAlign:"center"}}>
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
                                <td className={item.completed==true ? 'text-success font-weight-bold' : 'text-danger font-weight-bold'}>
                                    {item.completed==true ? "Completed" : "Non Completed"}
                                </td>
                                <td>
                                    {item.id === editItemId ? (
                                        <>
                                            <button onClick={updateItem}>Update</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => openEditModal(item.id)}>Edit Item</button>
                                            <button onClick={() => deleteItem(item.id)}>Delete Item</button>
                                        </>
                                    )}
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
