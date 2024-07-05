// UserProfilePage.jsx
import { useEffect, useState } from "react";
import {Button, Input, Spacer} from "@nextui-org/react";
import "../styles/UserProfilePage.css";

function UserProfilePage() {
    const [user, setUser] = useState({ username: "", email: "" });
    const [newUsername, setNewUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user/profile', {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('User profile data is null');
                }
                setUser(data);
                setNewUsername(data.username);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/update-user/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    username: newUsername,
                    currentPassword,
                    newPassword,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Update response:', data);
                throw new Error(data.message || 'Failed to update profile');
            }
            setUser(data);
            alert('Profile updated successfully');
            setEditUsername(false);
            setEditPassword(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleCancelEdit = () => {
        setEditUsername(false);
        setEditPassword(false);
    };

    return (
        <div className="profilePage">
            <h1 className="fontProfil">Profile</h1>
            <Spacer y={4}/>
            <div>
                <Input
                    label="Email"
                    value={user.email || ""}
                    readOnly
                    fullWidth
                />
                {editUsername ? (
                    <div className="editSection flex-container">
                        <Input
                            label="Username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            fullWidth
                        />
                        <Input
                            type="password"
                            label="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                        />
                        <div className="buttonGroup">
                            <Button onClick={handleUpdateProfile} color="primary" className="profilButton">
                                Update Username
                            </Button>
                            <Button onClick={handleCancelEdit} color="secondary" className="profilButton">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="displaySection">
                        <p>Username: {user.username || "N/A"}</p>
                        <Spacer x={5}/>
                        <Button onClick={() => setEditUsername(true)} color="primary" className="profilButton">
                            Edit Username
                        </Button>
                    </div>
                )}
                {editPassword ? (
                    <div className="editSection flex-container">
                        <Input
                            type="password"
                            label="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                        />
                        <Input
                            type="password"
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                        />
                        <div className="buttonGroup">
                            <Button onClick={handleUpdateProfile}  className="profilButton">
                                Update Password
                            </Button>
                            <Button onClick={handleCancelEdit}  className="profilButton">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="displaySection">
                        <p>Password: *******</p>
                        <Button onClick={() => setEditPassword(true)} className="profilButton">
                            Edit Password
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfilePage;
