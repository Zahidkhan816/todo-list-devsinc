import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Completed from './Completed'
const TodoList = () => {
    // main
    const [data, setData] = useState([])
    // appending new data
    const [newData, setNewData] = useState(
        {
            id: "",
            title: ""
            // completed: "false"
        }
    )
    // localstorage
    useEffect(() => {
        getLocALsTORAGE()
    }, [])

    // data get local storage sy

    function getLocALsTORAGE() {
        const localData = localStorage.getItem('List')
        const ParsedLocalData = JSON.parse(localData)
        if (ParsedLocalData) {
            setData(ParsedLocalData)
            console.log("data", ParsedLocalData)
            console.log("2nd")
        }
        // api wala data call kr raa usko local storage mai save krwa ra hai
        else {
            axios.get("https://jsonplaceholder.typicode.com/todos")
                .then(resp => {
                    setData(resp.data)
                    console.log("first")
                })
                .catch(error => {
                    console.log(error, "error")
                })
            console.log("get data chala")
        }
    }
    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(data))
    }, [data])

    const addData = async () => {
        if (newData.title == "") {
            alert("some fields are emoty")
        }
        else {

            setData([...data, newData])
            setNewData({ id: "", title: "" })
        }
    }

    const deleteitem = (id, i) => {
        console.log(id)
        const updateItems = data.filter((item, index) => {
            console.log(item.id)
            return index !== i
        })
        setData(updateItems)
    }

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
    return (
        <>
            <div className="form-container">
                <div className="row">
                    <div className="col-lg-12">
                        <input type="text" value={newData.title} placeholder='title' onChange={(e) => setNewData({ ...newData, id: Number(data.length + 2), title: e.target.value })} />
                    </div>
                </div> <br />
                <div className="row">
                    <div className="col-lg-12">
                        <button className='btn' onClick={addData}>Submit</button>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ textAlign: "center" }}>
                    <h3>Todo list</h3>
                </div>
                <table>
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th>Sr</th>
                            <th>Task</th>
                            <th>Current Status </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((items, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{items.title}</td>
                                        <td className={items.completed === true ? 'text-success' : 'text-danger'}>{items.completed === true ? "Completed" : "Non Completed"}</td>
                                        <td>
                                            <button onClick={() => deleteitem(items.id, index)}>delete Item</button>
                                            <button >Edit Item</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
               
            </div>
        </>
    )
}

export default TodoList