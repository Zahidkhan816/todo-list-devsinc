import React, { useEffect, useState } from 'react'

const Completed = () => {
    const [Data, SetData] = useState([])

    useEffect(() => {
        GetData()
    }, [])
    const GetData = () => {
        const localData = localStorage.getItem('List')
        const newlocalData = JSON.parse(localData)
        SetData(newlocalData)
    }
    return (
        <>
            <div className="table-container">
                <div style={{ textAlign: "center" }}>
                    <h4>Completed Tasks</h4>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Data.filter((item) => item.completed == true).map((items , index)=> {
                                return (
                                        <tr key={index}>
                                            <td> {index+1}</td>
                                            <td>{items.title}</td>
                                            <td className={items.completed === true ? 'text-success  font-weight-bold' : 'text-danger'}>{items.Completed ? "" : "Completed"}</td>
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

export default Completed