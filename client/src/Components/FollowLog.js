import React, { useEffect, useState } from "react"
import authFetch from "../utils/authFetch";
import Button from '@material-ui/core/Button';



const FollowLog = (props) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('credentials'))
        console.log(data)
        authFetch(`/follow/${data._id}`, null, props, 'get')
            .then(res => {
                // if (res.userId !== null) {
                console.log(res)
                // setUserId(res)
                // }
            });
    });
    const postFollowReq = (props) => {
        console.log(props)
        authFetch(`/follow/${props._id}`, null, props, 'post')
            .then(res => {
                // if (res.userId !== null) {
                console.log(res)
                // setUserId(res)
                // }
            });
    }

    return (
        <>
            <div>
                my follow
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button onClick={event => postFollowReq('5dcd7777914e2f258ab66277')} variant="contained"  >
                    User A
                </Button>-----------
                <Button variant="contained" color="primary" >
                    User B
                </Button>-----------
                <Button variant="contained" color="secondary">
                    User C
                </Button>
            </div>

        </>
    )
}
export default FollowLog