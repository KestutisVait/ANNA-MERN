import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import AdminForm from './AdminForm';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    .list-header {
        margin: 20px 0 0 0;
    }
`;
const AdminListItem = styled.div`
    display: flex;
    // position: relative;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #c6cabd;
    padding: 10px;
    transition: 0.2s;
    p {
        margin: 0;
        padding: 0;
    }
    &:hover {
        background-color: #c6cabd;
    }
`;
const Icon = styled.i`
    cursor: pointer;
    position: relative;
    color: ${props => props.$delete ? 'red' : 'var(--dark)'};
    margin: 0 9px;
    transition: 0.2s;
    &:hover {
        color: var(--on-hover);
        &::after {
            content: "${props => props.$delete ? 'Delete' : props.$add ? 'Add' : 'Edit'}";
            display: block;
            position: absolute;
            bottom: -38px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--light);
            font-style: normal;
            font-size: 0.8rem;
            background-color: var(--dark);
            padding: 3px 8px;
            white-space: nowrap; /* Prevent the text from wrapping */
            z-index: 1; /* Ensure the tooltip is above other elements */
        }
    }
`;
const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0;    
`;


const Admins = () => {
    
    const [admins, setAdmins] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [adminToDelete, setAdminToDelete] = useState(null)
    const [adminToEdit, setAdminToEdit] = useState(null)
    
    const getAdmins = async () => {
        const items = await Axios.get('http://localhost:4000/api/admin/all')
        setAdmins(items.data)
    }
    useEffect(() => {
        getAdmins()
    }, [])

    const handleClickEdit = (event) => {
        const index = event.target.closest('.parent').getAttribute('data-index');
        const name = event.target.closest('.parent').textContent;
        setShowEditForm(true)
        setActiveIndex(index);
        setAdminToEdit(name)
    }

    const handleDelete = async (event) => {
        const username = event.target.closest('.parent').textContent;
        setAdminToDelete(username)
        setShowModal(true)
    };

    const handleDeleteConfirm = async () => {
        try {
                await Axios.delete(`http://localhost:4000/api/admin/delete`,{data: {name: adminToDelete}})
                getAdmins()
                setShowModal(false)
            } catch (error) {
                console.log(error);
            }
    }
        
    return (
        <Wrapper>
            <h5>Wellcome to Admin Dashbord. Here you can manage your page.</h5>
            <p className='list-header'>Administratoriai:</p>
            {admins.length > 0 ? admins.map((admin, index) => 
                <AdminListItem  className='parent' key={index} data-index={index}>
                    {admin.name}
                    <div style={{display: "flex"}}>
                        {admin.name !== 'Tower' && <Icon className="bi bi-pencil-fill" $edit onClick={handleClickEdit}></Icon>}
                        {admin.name !== 'Tower' && <Icon className="bi bi-trash3-fill" $delete onClick={handleDelete}></Icon>}
                    </div>
                </AdminListItem>
                ) : <p>No admins</p>
            }
            <AdminListItem>
                <p>Pridėti naują administratorių<Icon className="bi bi-plus-circle-fill" $add onClick={() => setShowAddForm(true)}></Icon></p>
            </AdminListItem>
            {showAddForm && <AdminForm type={'add'} setShowAddForm={setShowAddForm} onSubmit={getAdmins}/>}
            {showEditForm && <AdminForm type={'edit'} admin={adminToEdit} setShowEditForm={setShowEditForm} onSubmit={getAdmins}/>}
            {showModal && 
            <ModalWrapper>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Are you sure you want to remove {adminToDelete} from admins?</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>}
        </Wrapper>
    )
}

export default Admins
