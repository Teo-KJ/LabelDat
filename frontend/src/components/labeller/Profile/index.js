import React, { useEffect, useState } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import './index.css';
import { Descriptions } from 'antd';

const Profile = (props) => {
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            const res = await axios.get(
                `/api/users/${props.match.params.id}`
            );

            setProfileInfo({
                name: res.data.data.name,
                username: res.data.data.username,
                userid: res.data.data.id,
                email: res.data.data.email,
                //signupdate: res.data.data.signupdate
            });
        };

        fetchProfileInfo();
    }, [props.match.params.id]);

    return (

        <Descriptions bordered>
            <Descriptions.Item label="Name">{profileInfo.name}</Descriptions.Item>
            <Descriptions.Item label="Username">{profileInfo.username}</Descriptions.Item>
            <Descriptions.Item label="User ID">{profileInfo.id}</Descriptions.Item>
            <Descriptions.Item label="Email">{profileInfo.email}</Descriptions.Item>
            <Descriptions.Item label="Sign Up Date" span={2}>{profileInfo.signupdate}</Descriptions.Item>
        </Descriptions>

      
      );
}

export default Profile;