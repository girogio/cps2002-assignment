import {
  faEllipsisVertical,
  faSync
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminLayout } from '@layout'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import {
  Button, Card, Dropdown, Form, Toast, ToastContainer, Alert, Modal, ModalBody
} from 'react-bootstrap'

type User = { _id: string, name: string, email: string, cars_rented: number, date_created: string, last_login: string }

const UsersPage: NextPage = () => {
  const [users, setUsers] = React.useState<User[]>([])
  const [userServiceActive, setUserServiceActive] = React.useState<boolean>(false)
  const [modalVisibile, setModalVisible] = React.useState<editModal>({ show: false, user_id: '' })

  type Toast = { title: string, body: string, type: string, visibility: boolean }
  type editModal = { show: boolean, user_id: string }

  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = (title: string, body: string, type: string) => {
    setToasts([...toasts, { title, body, type, visibility: true }])
  }

  const toggleToast = (index: number) => {
    const newToasts = [...toasts]
    newToasts[index].visibility = !newToasts[index].visibility
    setToasts(newToasts)
  }

  const updateUsers = () => {
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
    updateUsers()
  }, [])


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
          updateUsers()
          addToast('Success', response.data, 'info')
        }
      }).catch((error) => {
        addToast('Error', error.message, 'warning')
      })
  }

  const editUser = (event: any) => {

    // Prevent page refresh
    event.preventDefault()
    event.stopPropagation()

    // Get form data
    const form = event.currentTarget
    const email = form.formBasicEmail.value
    const name = form.formBasicName.value

    // Send request
    axios.patch('http://localhost:3001/api/users/' + modalVisibile.user_id, { name, email })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setModalVisible({ show: false, user_id: '' })
          addToast('Success', response.data, 'info')
          updateUsers()
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
        {/* modal with form */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalVisibile.show}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editUser}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="john@doe.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control required type="name" placeholder="John Doe" />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setModalVisible({ show: false, user_id: '' }) }}>Close</Button>
                <Button variant="primary" type="submit">Create</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* end modal with form */}

        <div className="col-md-12">

          <Alert variant="danger" show={!userServiceActive}>
            Could not estabilish connection with the user service. Please make sure that the user service is running.
          </Alert>

          <Card>
            <Card.Header>
              Create user
            </Card.Header>
            <Form onSubmit={createUser}>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control required type="email" placeholder="example@email.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control required type="name" placeholder="John Doe" />
                </Form.Group>
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Card.Footer>
            </Form>
          </Card>
          <br />
          <Card className="mb-4">
            <Card.Header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              User Database
              <Button variant="primary" style={{ justifySelf: 'flex-end' }} onClick={updateUsers}>
                <FontAwesomeIcon icon={faSync} />
              </Button>

            </Card.Header>
            <Card.Body >
              <div style={{ height: '30vh' }} className="table-responsive">
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
                              <Dropdown.Item
                                onClick={() => { setModalVisible({ show: true, user_id: user._id }) }}
                              >Edit</Dropdown.Item>
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
