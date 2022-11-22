import {
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminLayout } from '@layout'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { Card, Dropdown } from 'react-bootstrap'

type User = { _id: string, name: string, email: string, cars_rented: number, date_created: string, last_login: string }

const Home: NextPage = () => {
  const [users, setUsers] = React.useState<User[]>([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [users])

  const deleteUser = (id: string) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then((response) => {
        console.log(response)
      })
  }

  return (
    <AdminLayout>
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>
              User Database
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th>User</th>
                      <th>Email</th>
                      <th className="align-middle">Cars rented</th>
                      <th>Activity</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: User) => (
                      <tr className="align-middle">
                        <td>
                          <div>{user.name}</div>
                          <div className="small text-black-50">
                            ID:  {user._id}
                          </div>
                        </td>
                        <td>
                          {user.email}
                        </td>
                        <td className="align-middle">
                          {user.cars_rented || 0}
                        </td>
                        <td>
                          <div className="small text-black-50">Last login</div>
                          <div className="fw-semibold">{user.last_login}</div>
                        </td>
                        <td>
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              as="button"
                              bsPrefix="btn"
                              className="btn-link rounded-0 text-black-50 shadow-none p-0"
                              id="action-user1"
                            >
                              <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                              <Dropdown.Item >Edit</Dropdown.Item>
                              <Dropdown.Item
                                className="text-danger"
                                onClick={() => deleteUser(user._id)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Home
