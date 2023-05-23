import React from 'react'
import { useEffect, useState } from 'react'
const UnCompleted = () => {
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
                    <h4>UnCompleted Tasks</h4>
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
                            Data.filter((item) => item.completed == false).map((items,index) => {
                                return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{items.title}</td>
                                            <td className={items.completed === false ? 'text-danger  font-weight-bold' : ' font-weight-bold text-success'}>{items.Completed ? "" : " UnCompleted"}</td>
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

export default UnCompleted