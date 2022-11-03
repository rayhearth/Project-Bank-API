import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dataServices } from '@/_services/Datamanager';

import Account from '@/components/UI/Account';
import { updateData, cancel } from '@/feature/user.slice';


const Profile = () => {

    const dispatch = useDispatch()
    //on stocke ds une variable profileData l'ensemble de notre store
    const profileData = useSelector((state) => state.auth)

    const [edit, setEdit] = useState({
        firstName: '',
        lastName: ''
    })

    const onChange = (e) => {
        setEdit({
            ...edit,
            [e.target.name]: e.target.value
        })
    }

    const { isLoading, data, error } = useQuery('user', () => dataServices.userProfile())
    const user = data || {}
    console.log(user);

    useEffect(() => {
        if (isLoading) {
            dataServices.updateUserData(edit)
                .then(() => {
                    dispatch(updateData({
                        firstName: edit.firstName,
                        lastName: edit.lastName,
                    }))
                })
        }
    }, [])


    if (isLoading) {
        return <div>Loading ...</div>
    }

    if (error) {
        return <div className='network-error'>{error.message}</div>
    }


    const handleEdit = (e) => {
        e.preventDefault()
        dataServices.updateUserData(edit)
            .then(() => {
                dispatch(updateData({
                    firstName: edit.firstName,
                    lastName: edit.lastName,
                }))
            })
    }

    const userDelete = () => {
        dataServices.updateUserData(edit)
            .then(() => {
                dispatch(cancel({
                    firstName: '',
                    lastName: '',
                }))
            })
    }


    return (
        <div className='profile'>

            <div className="header">
                <h1>Welcome back</h1>
                <form className='userForm'>
                    <div className="inputWrapper">
                        <label htmlFor="firstName"></label>
                        <input type="text" id="firstName" name='firstName' value={edit.firstName} placeholder={edit.firstName} onChange={onChange} required />
                        <label htmlFor="lastName"></label>
                        <input type="text" id="lastName" name="lastName" value={edit.lastName} placeholder={edit.lastName} onChange={onChange} required />
                    </div>

                    <div className="userButtons">
                        <button className="btn" onClick={handleEdit} type="submit" >Save</button>
                        <button className="btn" onClick={userDelete} type="submit" >Cancel</button>
                    </div>
                </form>
            </div>
            <div className="accountUser">
                <h2 className="sr-only">Accounts</h2>
                <Account />
            </div>
        </div>
    );
};

export default Profile;