import React, { useEffect, useStatem, useContext } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import './index.css';
import { Descriptions } from 'antd'

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [leaderboardInfo, setLeaderboard] = useState(null);

    useEffect(() => {
        const fetchLeaderboardInfo = async () => {
            const res = await axios.get(
                `/api/userProfile`
            );
            setLeaderboard(
                res.data.data.map((contributer) => ({
                    ...contributer,
                    key: contributer.user_id,
                    id: contributer.user_id,
                    contributionPercentage: contributer.contributionPercentage,
                }))
            );
        };
        fetchLeaderboardInfo();
    }, []);

    const columns = [
        {
            title: "UserID",
            dataIndex: "id",
        },
        {
            title: "Contribution (%)",
            dataIndex: "contributionPercentage",
            sorter: (a, b) => a.contributionPercentage - b.contributionPercentage,
        },
    ];

    return (

        <Descriptions bordered>
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
            <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
            {/* <Descriptions.Item label="Sign Up Date" span={3}>{user.signupdate}</Descriptions.Item> */}
            <Descriptions.Item label="Leaderboard">
                <Table columns={columns} dataSource={leaderboardInfo} pagination={{ hideOnSinglePage: true }} />
            </Descriptions.Item>
        </Descriptions>
    );
}

export default Profile;