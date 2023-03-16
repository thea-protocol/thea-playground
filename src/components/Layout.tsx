import React from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { NavLink as RouterLink, Outlet } from "react-router-dom";
import {
  FiMenu,
} from 'react-icons/fi';
import { FaStore, FaCalculator, FaCubes, FaCube, FaInfoCircle, FaHome, FaStoreAlt, FaUserAlt, FaDesktop } from "react-icons/fa";


import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Connect from './Connect';
import Balances from './Balances';


interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FaHome, href: '/' },
  { name: 'Authentication', icon: FaUserAlt, href: '/auth' },
  { name: 'Calculators', icon: FaCalculator, href: '/calculators' },
  { name: 'Fungible', icon: FaCubes, href: '/fungible' },
  { name: 'NFT', icon: FaCube, href: '/nft' },
  { name: 'Carbon Info', icon: FaInfoCircle, href: '/info' },
  { name: 'Trading', icon: FaStoreAlt, href: '/trading' },
  { name: 'Marketplace', icon: FaStore, href: '/marketplace' },
  { name: 'Trade NBT', icon: FaDesktop, href: '/trade_nbt' },

  
];

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>

          <SidebarContent onClose={onClose}>
          </SidebarContent>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
      <Outlet />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Thea
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
      <Balances />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
  onClose: () => void;
}
const NavItem = ({ icon, onClose, href, children, ...rest }: NavItemProps) => {
  return (
    <Link as={RouterLink} to={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={onClose}>
      <Flex
        align="center"
        px="4"
        py="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="10"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ connect, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Thea
      </Text>
      <Connect />

  </Flex>
  );
};