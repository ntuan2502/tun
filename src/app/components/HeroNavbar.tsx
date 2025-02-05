"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoSVG from "./svg/LogoSVG";

export function LogoComponent() {
  return (
    <Link href="/">
      <NavbarBrand>
        <LogoSVG />
        <p className="font-bold text-inherit">Tún</p>
      </NavbarBrand>
    </Link>
  );
}

export default function HeroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true); // Thêm state kiểm tra đang loading

  // Kiểm tra trạng thái đăng nhập và lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Nếu có thông tin người dùng, cập nhật trạng thái người dùng
      setIsLoggedIn(true);
    }
    setIsLoading(false); // Sau khi đã kiểm tra xong, cập nhật isLoading thành false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin đăng nhập khỏi localStorage
    setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập
    setUser(null); // Xóa thông tin người dùng khỏi trạng thái
  };

  const handleFakeLogin = () => {
    // Giả lập thông tin người dùng đăng nhập
    const fakeUser = {
      name: "Tún",
      email: "admin@tun.io.vn",
    };
    localStorage.setItem("user", JSON.stringify(fakeUser)); // Lưu thông tin người dùng vào localStorage
    setUser(fakeUser); // Cập nhật trạng thái người dùng
    setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true
  };

  // Chỉ render UI sau khi không còn loading
  if (isLoading) {
    return null; // Có thể trả về một loader hoặc null nếu bạn muốn ẩn giao diện trong lúc loading
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <LogoComponent />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <LogoComponent />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {isLoggedIn && user ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user.name} // Hiển thị tên người dùng từ localStorage
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  textValue="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>{" "}
                  {/* Hiển thị email người dùng */}
                </DropdownItem>
                <DropdownItem key="settings" textValue="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  textValue="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button as={Link} color="warning" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button onPress={handleFakeLogin}>Fake Login</Button>
            </NavbarItem>
          </>
        )}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" href="/">
            Home
          </Link>
        </NavbarMenuItem>
        {!isLoggedIn ? (
          <>
            <NavbarMenuItem>
              <Link className="w-full" href="#">
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full" href="#">
                Sign Up
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full" href="#" onClick={handleFakeLogin}>
                Fake Login
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          <NavbarMenuItem>
            <Link className="w-full text-red-500" href="#" onClick={handleLogout}>
              Logout
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
