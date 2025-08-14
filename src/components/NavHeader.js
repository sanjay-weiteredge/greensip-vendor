import { Box, Stack } from "@mui/material";
import { styled } from "@mui/system";
import Profile from "./Profile.js";
import CustomeButton from "./CustomeButton.js";
import Image from "./Image .js";
import { useState, useEffect } from "react";

import logoImage from "../assets/image/SpeakllerLogo.svg";
import profileimage from "../assets/image/Profile.png";
import notificationIcon from "../assets/image/Notification.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "./store/index.js";
import { getRestaurantProfile } from "../services/authApi.js";


const HeaderWrapper = styled(Stack)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  justify-content: space-between;
  background-color: #6AB320;
`;

const UserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledImage = styled("img")`
  height: 33px;
  width: 33px;
  cursor: pointer;
  padding-right: 10px;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const LogoImage = styled("img")`
  height: 50px;
  width: 150px;
  cursor: pointer;
`;

const ProfileImage = styled("img")`
  height: 35px;
  width: 35px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const NavHeader = () => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  const handleProfileClick = () => {
    console.log("Profile image clicked");
    navigate('/Profile');
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    (async () => {
      try {
        const profile = await getRestaurantProfile();
        if (profile?.success && profile?.restaurant) {
          setDetails(profile.restaurant);
        }
      } catch (error) {
        // ignore and keep userInfo null
      }
    })();
  }, []);

console.log("details", details);
  return (
    <HeaderWrapper direction="row">
      {/* <LogoImage src={logoImage} alt="Logo" onClick={()=>{navigate("/dashboard")}} /> */}
      <h1>{details?.name}</h1>
      <UserIconWrapper>
        {/* <StyledImage src={notificationIcon} alt="notification" /> */}
        <Profile />
        <ProfileImage src={userInfo && userInfo.photo ? userInfo.photo : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"} alt="Profile" onClick={handleProfileClick} />
      </UserIconWrapper>
    </HeaderWrapper>
  );
};

export default NavHeader;
