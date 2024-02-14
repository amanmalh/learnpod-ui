import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useAuth } from "../auth/Auth";

const FullWidthLink = styled(Link)`
  width: 100%;
`;

const Header = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const handleLogout = () => {
    signout();
    navigate("/login");
  };

  return (
    <>
      <Flex p="2">
        <Box p="4">
          <Text fontSize="xl">LEARN POD</Text>
        </Box>
        <Spacer />
        <Box p="4">
          <Menu>
            <MenuButton>
              <Image
                src="/images/photo-1534528741775-53994a69daeb.jpg"
                borderRadius="full"
                boxSize="50px"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <FullWidthLink to="/goals">My Goals</FullWidthLink>
              </MenuItem>
              <MenuItem>
                <FullWidthLink to="/groups">My Groups</FullWidthLink>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
