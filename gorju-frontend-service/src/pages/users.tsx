
import {
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminLayout } from '@layout'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import {
  Button, Card, Dropdown, Form, Toast, ToastContainer, Alert
} from 'react-bootstrap'

type User = { _id: string, name: string, email: string, cars_rented: number, date_created: string, last_login: string }

const UsersPage: NextPage = () => {
  const [users, setUsers] = React.useState<User[]>([])
  const [userServiceActive, setUserServiceActive] = React.useState<boolean>(false)

  type Toast = { title: string, body: string, type: string, visibility: boolean }

  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = (title: string, body: string, type: string) => {
    setToasts([...toasts, { title, body, type, visibility: true }])
  }

  const toggleToast = (index: number) => {
    const newToasts = [...toasts]
    newToasts[index].visibility = !newToasts[index].visibility
    setToasts(newToasts)
  }

  // Prepare health check
  useEffect(() => {
    axios.get('http://localhost:3001/api/')
      .then((res) => {
        res.data.success === true ? setUserServiceActive(true) : setUserServiceActive(false)
      })
  }, [userServiceActive])


  // Subscribe to user fetch endpoint
  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [users])


  // Utility function for deleting a user
  const deleteUser = (id: string) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then((response) => {
        addToast('Success', response.data, 'info')
      }).catch((error) => {
        addToast('Error', error.message, 'warning')
      })
  }

  // Utility function for updating a user
  const createUser = (event: any) => {

    // Prevent page refresh
    event.preventDefault()
    event.stopPropagation()

    // Get form data
    const form = event.currentTarget
    const email = form.formBasicEmail.value
    const name = form.formBasicName.value

    // Send request
    axios.post('http://localhost:3001/api/users', { name, email })
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          // Empty form
          form.formBasicEmail.value = ''
          form.formBasicName.value = ''
          // Notify User
          addToast('Success', response.data, 'info')
        }
      }).catch((error) => {
        addToast('Error', error.message, 'warning')
      })
  }

  return (
    <AdminLayout>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="relative"
      >
        <ToastContainer className="p-3" position={'bottom-start'}>
          {toasts.map((toast: Toast, i) => (
            <Toast
              bg={toast.type}
              onClose={() => toggleToast(i)}
              show={toast.visibility}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">{toast.title}</strong>
              </Toast.Header>
              <Toast.Body>{toast.body}</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      </div>
      <div className="row">
        <div className="col-md-12">

          <Alert variant="danger" show={!userServiceActive}>
            Could not estabilish connection with the user service. Please make sure that the user service is running.
          </Alert>

          <Card>
            <Card.Header>
              Create user
            </Card.Header>
            <Card.Body>
              <Form onSubmit={createUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control required type="email" placeholder="example@email.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control required type="name" placeholder="John Doe" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <br />
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
    </AdminLayout >
  )
}

export default UsersPage
