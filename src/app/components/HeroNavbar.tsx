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
import {
  Activity,
  ChevronDown,
  Flash,
  Lock,
  Scale,
  Server,
  TagUser,
} from "./svg/UISVG";

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

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

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
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-full"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              textValue="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              textValue="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="tinh_tien_dien"
              description="Công cụ tính hóa đơn tiền điện"
              startContent={icons.flash}
              as={Link}
              href="/tinh-tien-dien"
            >
              Tính tiền điện
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              textValue="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              textValue="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
        <NavbarMenuItem>
          <Link className="w-full" href="/tinh-tien-dien">
            Tính tiền điện
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
            <Link
              className="w-full text-red-500"
              href="#"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
